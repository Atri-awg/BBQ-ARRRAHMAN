import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.classMaterial.deleteMany();
  await prisma.material.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.class.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Roles
  const roles = await Promise.all([
    prisma.role.create({
      data: {
        name: 'admin',
        description: 'Administrator dengan akses penuh',
        permissions: {
          canManageUsers: true,
          canManageClasses: true,
          canManageEnrollments: true,
          canViewReports: true,
        },
      },
    }),
    prisma.role.create({
      data: {
        name: 'pengajar',
        description: 'Pengajar/Ustadz',
        permissions: {
          canManageOwnClasses: true,
          canGradeStudents: true,
          canTakeAttendance: true,
          canViewStudentProgress: true,
        },
      },
    }),
    prisma.role.create({
      data: {
        name: 'mahasiswa',
        description: 'Mahasiswa/Santri',
        permissions: {
          canEnrollClasses: true,
          canViewOwnProgress: true,
          canCheckIn: true,
        },
      },
    }),
  ]);

  console.log('✅ Created roles');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@arrahman.ac.id',
      password: hashedPassword,
      name: 'Administrator',
      isActive: true,
      profile: {
        create: {
          phoneNumber: '081234567890',
          gender: 'Laki',
          bio: 'System Administrator',
        },
      },
      userRoles: {
        create: {
          roleId: roles.find(r => r.name === 'admin')!.id,
        },
      },
    },
  });

  // Create Pengajar Users
  const pengajar1 = await prisma.user.create({
    data: {
      email: 'ustadz.ahmad@arrahman.ac.id',
      password: hashedPassword,
      name: 'Ustadz Ahmad',
      isActive: true,
      profile: {
        create: {
          phoneNumber: '081234567891',
          gender: 'Laki',
          bio: 'Pengajar Tahsin & Tajwid',
        },
      },
      userRoles: {
        create: {
          roleId: roles.find(r => r.name === 'pengajar')!.id,
        },
      },
    },
  });

  const pengajar2 = await prisma.user.create({
    data: {
      email: 'ustadzah.fatimah@arrahman.ac.id',
      password: hashedPassword,
      name: 'Ustadzah Fatimah',
      isActive: true,
      profile: {
        create: {
          phoneNumber: '081234567892',
          gender: 'Perempuan',
          bio: 'Pengajar Tahfidz',
        },
      },
      userRoles: {
        create: {
          roleId: roles.find(r => r.name === 'pengajar')!.id,
        },
      },
    },
  });

  console.log('✅ Created users (admin & pengajar)');

  // Create Mahasiswa Users
  const mahasiswa = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `mahasiswa${i}@arrahman.ac.id`,
        password: hashedPassword,
        name: `Mahasiswa ${i}`,
        profile: {
          create: {
            phoneNumber: `08123456789${i}`,
            gender: i % 2 === 0 ? 'Laki' : 'Perempuan',
            address: `Alamat Mahasiswa ${i}`,
          },
        },
        userRoles: {
          create: {
            roleId: roles.find(r => r.name === 'mahasiswa')!.id,
          },
        },
      },
    });
    mahasiswa.push(user);
  }

  console.log('✅ Created 10 mahasiswa users');

  // Create Classes
  const class1 = await prisma.class.create({
    data: {
      name: 'Tahsin Pemula - Kelas A',
      code: 'TAHSIN-P-A',
      description: 'Kelas tahsin untuk pemula yang ingin memperbaiki bacaan Al-Quran',
      pengajarId: pengajar1.id,
      level: 'pemula',
      type: 'tahsin',
      capacity: 20,
      currentEnrollment: 0,
      status: 'active',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-06-30'),
    },
  });

  const class2 = await prisma.class.create({
    data: {
      name: 'Tajwid Menengah',
      code: 'TAJWID-M-A',
      description: 'Kelas tajwid tingkat menengah dengan pembahasan mendalam',
      pengajarId: pengajar1.id,
      level: 'menengah',
      type: 'tajwid',
      capacity: 15,
      currentEnrollment: 0,
      status: 'active',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-06-30'),
    },
  });

  const class3 = await prisma.class.create({
    data: {
      name: 'Tahfidz Juz 30',
      code: 'TAHFIDZ-P-30',
      description: 'Program tahfidz Juz 30 (Juz Amma)',
      pengajarId: pengajar2.id,
      level: 'pemula',
      type: 'tahfidz',
      capacity: 10,
      currentEnrollment: 0,
      status: 'active',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
    },
  });

  console.log('✅ Created classes');

  // Create Schedules
  await prisma.schedule.createMany({
    data: [
      {
        classId: class1.id,
        dayOfWeek: 'senin',
        startTime: '08:00',
        endTime: '10:00',
        location: 'Ruang A',
        roomNumber: '101',
        isRecurring: true,
      },
      {
        classId: class1.id,
        dayOfWeek: 'rabu',
        startTime: '08:00',
        endTime: '10:00',
        location: 'Ruang A',
        roomNumber: '101',
        isRecurring: true,
      },
      {
        classId: class2.id,
        dayOfWeek: 'selasa',
        startTime: '13:00',
        endTime: '15:00',
        location: 'Ruang B',
        roomNumber: '102',
        isRecurring: true,
      },
      {
        classId: class2.id,
        dayOfWeek: 'kamis',
        startTime: '13:00',
        endTime: '15:00',
        location: 'Ruang B',
        roomNumber: '102',
        isRecurring: true,
      },
      {
        classId: class3.id,
        dayOfWeek: 'sabtu',
        startTime: '09:00',
        endTime: '11:00',
        location: 'Ruang C',
        roomNumber: '103',
        isRecurring: true,
      },
    ],
  });

  console.log('✅ Created schedules');

  // Create Materials
  const materials = await Promise.all([
    prisma.material.create({
      data: {
        title: 'Pengenalan Huruf Hijaiyah',
        description: 'Materi dasar pengenalan huruf hijaiyah',
        category: 'tahsin',
        contentType: 'pdf',
        orderIndex: 1,
      },
    }),
    prisma.material.create({
      data: {
        title: 'Makharijul Huruf',
        description: 'Tempat keluar huruf dalam bacaan Al-Quran',
        category: 'tajwid',
        contentType: 'video',
        duration: 30,
        orderIndex: 2,
      },
    }),
    prisma.material.create({
      data: {
        title: 'Hukum Nun Sukun dan Tanwin',
        description: 'Pembahasan hukum nun sukun dan tanwin',
        category: 'tajwid',
        contentType: 'pdf',
        orderIndex: 3,
      },
    }),
  ]);

  // Link materials to classes
  await prisma.classMaterial.createMany({
    data: [
      { classId: class1.id, materialId: materials[0].id, orderIndex: 1 },
      { classId: class2.id, materialId: materials[1].id, orderIndex: 1 },
      { classId: class2.id, materialId: materials[2].id, orderIndex: 2 },
    ],
  });

  console.log('✅ Created materials');

  // Create Enrollments
  for (let i = 0; i < 5; i++) {
    await prisma.enrollment.create({
      data: {
        userId: mahasiswa[i].id,
        classId: class1.id,
        status: 'active',
      },
    });
  }

  for (let i = 5; i < 8; i++) {
    await prisma.enrollment.create({
      data: {
        userId: mahasiswa[i].id,
        classId: class2.id,
        status: 'active',
      },
    });
  }

  console.log('✅ Created enrollments');

  // Update class enrollment counts
  await prisma.class.update({
    where: { id: class1.id },
    data: { currentEnrollment: 5 },
  });

  await prisma.class.update({
    where: { id: class2.id },
    data: { currentEnrollment: 3 },
  });

  // Create Announcements
  await prisma.announcement.create({
    data: {
      createdBy: admin.id,
      title: 'Selamat Datang di BBQ Ar-Rahman',
      content: 'Selamat datang di sistem akademik Bimbingan Baca Quran UKMI Ar-Rahman. Semoga ilmu yang didapat bermanfaat.',
      targetAudience: 'all',
      isPinned: true,
    },
  });

  console.log('✅ Created announcements');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📧 Login credentials:');
  console.log('Admin: admin@arrahman.ac.id / password123');
  console.log('Pengajar: ustadz.ahmad@arrahman.ac.id / password123');
  console.log('Mahasiswa: mahasiswa1@arrahman.ac.id / password123');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });