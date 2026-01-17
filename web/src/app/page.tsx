'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, user, hasRole } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (hasRole('admin')) router.push('/admin');
      else if (hasRole('pengajar')) router.push('/pengajar');
      else if (hasRole('mahasiswa')) router.push('/mahasiswa');
    }
  }, [isAuthenticated, user, hasRole, router]);

  const features = [
    {
      icon: BookOpen,
      title: 'Pembelajaran Terstruktur',
      description:
        'Metode Tahsin, Tajwid, dan Tahfidz yang sistematis dan terukur.',
    },
    {
      icon: Users,
      title: 'Pengajar Berkualitas',
      description:
        'Dibimbing oleh pengajar berpengalaman dan bersertifikasi.',
    },
    {
      icon: Award,
      title: 'Sistem Penilaian',
      description:
        'Evaluasi objektif untuk memantau capaian belajar santri.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description:
        'Pantau perkembangan belajar secara real-time dan transparan.',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" />

        <div className="relative container mx-auto px-6 text-center max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">
              <span className="text-5xl">🕌</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            BBQ Ar-Rahman
          </h1>

          <p className="text-xl text-white/90 mb-4">
            Sistem Akademik Bimbingan Baca Quran
          </p>

          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Platform pembelajaran Al-Quran modern untuk membentuk bacaan yang
            benar, terukur, dan berkelanjutan.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2 text-base">
                Masuk
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-base"
              >
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sistem pembelajaran yang dirancang serius, bukan sekadar formalitas.
            </p>
          </div>
          <CardTitle className="text-base">
            Membaca Al-Qur’an dengan Benar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mahasiswa mampu membaca Al-Qur’an sesuai kaidah makhraj dan tajwid dasar.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-base">
            Memahami Tajwid Dasar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mahasiswa memahami dan mampu menerapkan hukum tajwid dasar dalam bacaan.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-base">
            Peningkatan Kualitas Bacaan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Terjadi peningkatan kualitas bacaan Al-Qur’an secara bertahap dan terukur.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-base">
            Pembiasaan Membaca Al-Qur’an
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mahasiswa terbiasa membaca Al-Qur’an secara rutin dan berkelanjutan.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* Peran BBQ dalam Mata Kuliah PAI */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        Peran BBQ dalam Mata Kuliah PAI
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        Program BBQ Ar-Rahman memiliki peran penting dalam mendukung
        pelaksanaan mata kuliah Pendidikan Agama Islam sebagai bentuk
        pembinaan kemampuan baca Al-Qur’an mahasiswa.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">
            Pendamping Pembelajaran PAI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            BBQ berfungsi sebagai program pendamping yang membantu mahasiswa
            mencapai kompetensi baca Al-Qur’an yang ditetapkan dalam mata kuliah PAI.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">
            Syarat Akademik Kelulusan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Keikutsertaan dan kelulusan dalam program BBQ menjadi salah satu
            syarat akademik yang harus dipenuhi oleh mahasiswa.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">
            Terintegrasi dengan Sistem Akademik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Pelaksanaan BBQ terintegrasi dengan sistem akademik kampus dan
            dikelola secara terstruktur oleh UKMI Ar-Rahman.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* Pihak yang Terlibat Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        Pihak yang Terlibat dalam Program BBQ
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        Program BBQ Ar-Rahman melibatkan berbagai pihak yang bekerja sama
        untuk memastikan proses pembelajaran Al-Qur’an berjalan dengan baik
        dan terstruktur.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
      {/* Mahasiswa */}
      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mahasiswa berperan sebagai peserta program BBQ yang mengikuti
            proses bimbingan baca Al-Qur’an sebagai bagian dari kewajiban
            akademik mata kuliah PAI.
          </p>
        </CardContent>
      </Card>

      {/* Pengajar */}
      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tutor bertugas membimbing mahasiswa dalam membaca Al-Qur’an,
            memberikan evaluasi, serta menilai perkembangan bacaan secara
            bertahap.
          </p>
        </CardContent>
      </Card>

      {/* Admin */}
      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Admin bertanggung jawab mengelola data, penjadwalan, kelas,
            serta memastikan pelaksanaan program BBQ berjalan sesuai ketentuan.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* Dokumentasi Kegiatan Wajib BBQ */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        Dokumentasi Kegiatan Wajib BBQ
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        Program BBQ Ar-Rahman tidak hanya berfokus pada pembelajaran baca
        Al-Qur’an, tetapi juga dilengkapi dengan berbagai kegiatan pembinaan
        yang wajib diikuti oleh mahasiswa.
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
      {/* Opening BBQ */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="relative aspect-[4/3]">
          <Image
            src="/images/dokumentasi/opening-bbq.jpg"
            alt="Opening BBQ"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">Opening BBQ</h3>
          <p className="text-sm text-muted-foreground">
            Kegiatan pembukaan resmi program BBQ sebagai awal rangkaian
            bimbingan baca Al-Qur’an.
          </p>
        </div>
      </div>

      {/* Mabit & Jalasah Ruhiyah */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="relative aspect-[4/3]">
          <Image
            src="/images/dokumentasi/mabit-bbq.jpg"
            alt="Mabit & Jalasah Ruhiyah BBQ"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">
            Mabit & Jalasah Ruhiyah BBQ
          </h3>
          <p className="text-sm text-muted-foreground">
            Kegiatan pembinaan ruhiyah untuk meningkatkan keimanan,
            kebersamaan, dan karakter Islami mahasiswa.
          </p>
        </div>
      </div>

      {/* Self Development */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="relative aspect-[4/3]">
          <Image
            src="/images/dokumentasi/self-development.jpg"
            alt="Self Development BBQ"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">Self Development BBQ</h3>
          <p className="text-sm text-muted-foreground">
            Kegiatan pengembangan diri yang membekali mahasiswa dengan nilai
            kepemimpinan dan tanggung jawab.
          </p>
        </div>
      </div>

      {/* Kegiatan Pendukung */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center text-sm text-muted-foreground">
          <Image
            src="/images/dokumentasi/other.jpg"
            alt="Kegiatan Pendukung BBQ"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">
            Kegiatan Pendukung Lainnya
          </h3>
          <p className="text-sm text-muted-foreground">
            Berbagai kegiatan pendukung yang menunjang proses pembelajaran
            dan pembinaan mahasiswa selama program BBQ berlangsung. Contohnya Kajian Rutin
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


{/* FAQ Section */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        Pertanyaan yang Sering Diajukan
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        Berikut beberapa pertanyaan umum terkait program BBQ Ar-Rahman
        yang sering ditanyakan oleh mahasiswa.
      </p>
    </div>

    <div className="max-w-4xl mx-auto space-y-4">
      {[
        {
          q: "Apakah BBQ wajib diikuti oleh mahasiswa?",
          a: "Ya. Program BBQ merupakan bagian dari mata kuliah Pendidikan Agama Islam (PAI) dan wajib diikuti sebagai salah satu syarat akademik.",
        },
        {
          q: "Bagaimana jika saya belum lancar membaca Al-Qur’an?",
          a: "Tidak perlu khawatir. Program BBQ dirancang untuk membimbing mahasiswa dari berbagai tingkat kemampuan membaca.",
        },
        {
          q: "Apakah BBQ mempengaruhi nilai mata kuliah PAI?",
          a: "Ya. Keikutsertaan dan hasil evaluasi dalam program BBQ menjadi bagian dari penilaian mata kuliah PAI.",
        },
        {
          q: "Berapa lama program BBQ dilaksanakan?",
          a: "Durasi program BBQ menyesuaikan dengan ketentuan mata kuliah PAI dan jadwal yang telah ditetapkan oleh pengelola.",
        },
        {
          q: "Siapa yang membimbing selama program BBQ?",
          a: "Mahasiswa akan dibimbing oleh pengajar yang telah dibekali kompetensi dalam bimbingan baca Al-Qur’an.",
        },
      ].map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-base">
              {item.q}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {item.a}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>





{/* CTA Section */}
<section className="bg-gradient-to-br from-primary to-emerald-700 text-white py-24">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-6">
      Siap Mengikuti Program BBQ Ar-Rahman?
    </h2>

    <p className="text-lg max-w-3xl mx-auto mb-10 opacity-90">
      Program BBQ merupakan bagian dari mata kuliah Pendidikan Agama Islam
      yang dirancang untuk membantu mahasiswa meningkatkan kemampuan membaca
      Al-Qur’an secara terarah, terstruktur, dan berkelanjutan.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/register">
        <Button
          size="lg"
          variant="secondary"
          className="gap-2 px-8 py-6 text-base font-semibold"
        >
          Daftar Program BBQ
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>

      <Link href="/login">
        <Button
          size="lg"
          variant="outline"
          className="gap-2 px-8 py-6 text-base font-semibold text-white border-white hover:bg-white hover:text-primary"
        >
          Masuk ke Akun
        </Button>
      </Link>
    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="py-10 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 BBQ Ar-Rahman. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            “Sebaik-baik kalian adalah yang mempelajari Al-Quran dan
            mengajarkannya” — HR. Bukhari
          </p>
        </div>
      </footer>
    </div>
  );
}
