import { PrismaClient } from "@/generated/prisma"
import { NextRequest, NextResponse } from "next/server"

// buat variabel prisma (PrismaClient)
const prisma = new PrismaClient()

// buat service GET
export const GET = async () => {
    // buat variabel untuk menampilkan data kelas
    const user = await prisma.user.findMany({
        orderBy: {
            id: "asc"
        }
    })
    // tampilkan hasil data barang
    return NextResponse.json({
        user: user
    })
}


// buat service POST (simpan data)
// export const POST = async (request: NextRequest) => {
//     const data = await request.json()

//     // cek apakah kode barang sudah ada / belum
//     const check = await prisma.user.findFirst({
//         where: {
//             id: data.id
//         },
//         select: {
//             id: true,            
//         }
//     })
//     // jika data ditemukan
//     if (check) {
//         return NextResponse.json({
//             message: "Data Barang Gagal Disimpan (Kode Sudah Dipakai !)",
//             success: false
//         })
//     }
//     // jika data tidak ditemukan

//     // simpan data
//     await prisma.user.create({
//         data: {
//             id: data.id,
//             name: data.name,
//             email: data.email,
//             role: data.role,
//         }
//     })

//     return NextResponse.json({
//         message: "Data Barang Berhasil Disimpan",
//         success: true
//     })


// }


import crypto from "crypto";

// fungsi hashing TANPA dependency eksternal
function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // 1. Validasi input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password, dan name wajib diisi" },
        { status: 400 }
      );
    }

    // Cek email unik
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = hashPassword(password);

    // 4. Simpan user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        // isActive otomatis true
        // createdAt & updatedAt otomatis
      },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true,
      },
    });

    // 5. Response sukses
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}