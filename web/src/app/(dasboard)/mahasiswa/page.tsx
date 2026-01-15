'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Award, TrendingUp, Clock, MapPin } from 'lucide-react';
import useSWR from 'swr';
import { api } from '@/lib/api';
import { formatTime, getDayName } from '@/lib/utils';

export default function MahasiswaDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, hasRole } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !hasRole('mahasiswa')) {
      router.push('/login');
    }
  }, [isAuthenticated, hasRole, router]);

  // Fetch mahasiswa stats
  const { data: stats, isLoading } = useSWR('/api/mahasiswa/stats', () =>
    api.get('/api/mahasiswa/stats')
  );

  const statCards = [
    {
      title: 'Kelas Diikuti',
      value: stats?.data?.totalEnrollments || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Kehadiran',
      value: `${stats?.data?.attendanceRate || 0}%`,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Progress Belajar',
      value: `${stats?.data?.averageProgress || 0}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Pencapaian',
      value: stats?.data?.totalAchievements || 0,
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Mahasiswa</h1>
        <p className="text-muted-foreground mt-2">
          Assalamu'alaikum, {user?.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Kelas Aktif */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Kelas Saya</CardTitle>
            <Link href="/mahasiswa/kelas">
              <Button variant="ghost" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : stats?.data?.myClasses?.length > 0 ? (
                stats.data.myClasses.map((enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="flex items-start justify-between border-b pb-3 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{enrollment.class.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {enrollment.class.pengajar.name}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {enrollment.class.type}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {enrollment.class.level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    Anda belum terdaftar di kelas manapun
                  </p>
                  <Link href="/mahasiswa/kelas">
                    <Button size="sm">Daftar Kelas</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Jadwal Mendatang */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Jadwal Mendatang</CardTitle>
            <Link href="/mahasiswa/jadwal">
              <Button variant="ghost" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : stats?.data?.upcomingSchedules?.length > 0 ? (
                stats.data.upcomingSchedules.map((schedule: any) => (
                  <div
                    key={schedule.id}
                    className="flex items-start gap-3 border-b pb-3 last:border-0"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{schedule.class.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{getDayName(schedule.dayOfWeek)}, {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{schedule.location} {schedule.roomNumber}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Tidak ada jadwal mendatang
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {stats?.data?.recentAchievements?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pencapaian Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {stats.data.recentAchievements.map((achievement: any) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-4 border rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}