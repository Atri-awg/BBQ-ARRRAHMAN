'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Mulai Perjalanan Belajar Anda
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Bergabung bersama santri lain dalam sistem pembelajaran Al-Quran yang
            terarah dan bermakna.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Daftar Gratis Sekarang
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
