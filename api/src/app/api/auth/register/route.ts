import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Data tidak lengkap' },
        { status: 400 }
      );
    }

    // Cek email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Cari role mahasiswa
    const roleMahasiswa = await prisma.role.findUnique({
      where: { name: 'mahasiswa' },
    });

    if (!roleMahasiswa) {
      return NextResponse.json(
        { success: false, message: 'Role mahasiswa tidak ditemukan' },
        { status: 500 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 CREATE USER + USERROLE (INI KUNCI)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userRoles: {
          create: {
            roleId: roleMahasiswa.id,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil',
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
