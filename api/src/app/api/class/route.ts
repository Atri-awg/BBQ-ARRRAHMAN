import { PrismaClient } from "@/generated/prisma"
import { NextRequest, NextResponse } from "next/server"

// buat variabel prisma (PrismaClient)
const prisma = new PrismaClient()

// buat service GET
export const GET = async () => {
    // buat variabel untuk menampilkan data kelas
    const kelas = await prisma.class.findMany({
        orderBy: {
            id: "asc"
        }
    })
    // tampilkan hasil data barang
    return NextResponse.json({
        kelas: kelas
    })
}


// buat service POST (simpan data)
export const POST = async (request: NextRequest) => {
    const data = await request.json()

    // cek apakah kode barang sudah ada / belum
    const check = await prisma.class.findFirst({
        where: {
            id: data.id
        },
        select: {
            id: true,            
        }
    })
    // jika data ditemukan
    if (check) {
        return NextResponse.json({
            message: "Data Barang Gagal Disimpan (Kode Sudah Dipakai !)",
            success: false
        })
    }
    // jika data tidak ditemukan

    // simpan data
    await prisma.class.create({
        data: {
            id: data.id,
            name: data.name,
            code: data.code,
            description: data.description,
            pengajarId: data.pengajarId,
            level: data.level,
            type: data.type,
            capacity: data.capacity,
            currentEnrollment: data.currentEnrollment,
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate,
        }
    })

    return NextResponse.json({
        message: "Data Barang Berhasil Disimpan",
        success: true
    })


}
