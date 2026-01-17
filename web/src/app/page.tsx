'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Logo } from "@/components/logo";


export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, user, hasRole } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard
      if (hasRole('admin')) {
        router.push('/admin');
      } else if (hasRole('pengajar')) {
        router.push('/pengajar');
      } else if (hasRole('mahasiswa')) {
        router.push('/mahasiswa');
      }
    }
  }, [isAuthenticated, user, hasRole, router]);

  const features = [
    {
      icon: BookOpen,
      title: 'Pembelajaran Terstruktur',
      description: 'Program pembelajaran Al-Quran yang terstruktur dengan metode Tahsin, Tajwid, dan Tahfidz',
    },
    {
      icon: Users,
      title: 'Pengajar Berkualitas',
      description: 'Dibimbing oleh pengajar yang berpengalaman dan kompeten di bidangnya',
    },
    {
      icon: Award,
      title: 'Sistem Penilaian',
      description: 'Sistem penilaian yang komprehensif untuk memantau progress belajar',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Pantau perkembangan belajar Anda secara real-time',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow">
    <Logo size={64} />
  </div>
</div>

            <h1 className="text-5xl font-bold mb-6">BBQ Ar-Rahman</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sistem Akademik Bimbingan Baca Quran UKMI Ar-Rahman
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Platform pembelajaran Al-Quran modern yang membantu Anda mempelajari dan menghafal Al-Quran dengan bimbingan pengajar berkualitas
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Masuk
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pengenalan BBQ Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Apa itu BBQ Ar-Rahman?</h2>
      <p className="text-muted-foreground max-w-3xl mx-auto">
        BBQ (Bimbingan Baca Qur&apos;an) Ar-Rahman adalah program bimbingan belajar
        Al-Qur&apos;an yang diselenggarakan oleh UKMI Ar-Rahman sebagai bagian dari
        <strong> mata kuliah Pendidikan Agama Islam (PAI)</strong>.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">Bagian dari SKS PAI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            BBQ merupakan salah satu syarat akademik dalam mata kuliah Pendidikan
            Agama Islam yang wajib diikuti oleh mahasiswa.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">Fokus Baca Al-Qur&apos;an</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Program ini berfokus pada peningkatan kemampuan membaca Al-Qur&apos;an,
            meliputi tahsin, tajwid, serta pembiasaan membaca dengan benar.
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-lg">Bimbingan Terarah</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mahasiswa dibimbing langsung oleh pengajar yang telah dibekali
            kompetensi untuk mendampingi proses belajar secara bertahap.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* Alur BBQ Section */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        Alur Mengikuti Program BBQ
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Program BBQ dirancang dengan alur yang jelas dan terstruktur
        untuk membantu mahasiswa menyelesaikan kewajiban akademik
        dalam mata kuliah Pendidikan Agama Islam.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-5 max-w-6xl mx-auto">
      {[
        {
          step: "01",
          title: "Daftar Akun",
          desc: "Mahasiswa melakukan pendaftaran akun pada sistem BBQ Ar-Rahman.",
        },
        {
          step: "02",
          title: "Penempatan Kelompok",
          desc: "Mahasiswa ditempatkan ke dalam Kelompok sesuai kemampuan membaca.",
        },
        {
          step: "03",
          title: "Proses Bimbingan",
          desc: "Bimbingan baca Al-Qur’an bersama Tutor secara bertahap.",
        },
        {
          step: "04",
          title: "Evaluasi",
          desc: "Pengajar melakukan penilaian berdasarkan perkembangan mahasiswa.",
        },
        {
          step: "05",
          title: "Lulus BBQ",
          desc: "Mahasiswa dinyatakan lulus sebagai syarat mata kuliah PAI.",
        },
      ].map((item) => (
        <Card key={item.step} className="text-center relative">
          <CardHeader>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {item.step}
            </div>
            <CardTitle className="text-base">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {item.desc}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* Target & Capaian Pembelajaran Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold mb-4">
        Target & Capaian Pembelajaran
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Melalui program BBQ Ar-Rahman, mahasiswa diharapkan mencapai
        kompetensi dasar dalam membaca Al-Qur’an sebagai bagian dari
        pembelajaran Pendidikan Agama Islam.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
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




      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mulai Perjalanan Belajar Anda</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Bergabunglah dengan ribuan santri lainnya dalam mempelajari Al-Quran dengan metode yang tepat
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Daftar Gratis Sekarang
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 BBQ Ar-Rahman. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            "Sebaik-baik kalian adalah yang mempelajari Al-Quran dan mengajarkannya" - HR. Bukhari
          </p>
        </div>
      </footer>
    </div>
  );
}