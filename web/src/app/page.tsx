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