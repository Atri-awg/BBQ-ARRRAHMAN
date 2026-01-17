'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Calendar, TrendingUp } from 'lucide-react';
import useSWR from 'swr';
import { api } from '@/lib/api';

export default function PengajarDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, hasRole } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !hasRole('pengajar')) {
      router.push('/login');
    }
  }, [isAuthenticated, hasRole, router]);

  // Fetch pengajar stats
  const { data: stats, isLoading } = useSWR('/api/pengajar/stats', () =>
    api.get('/api/pengajar/stats')
  );

  const statCards = [
    {
      title: 'Total Kelas',
      value: stats?.data?.totalClasses || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Mahasiswa',
      value: stats?.data?.totalStudents || 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Jadwal Hari Ini',
      value: stats?.data?.todaySchedules || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Kehadiran Hari Ini',
      value: stats?.data?.todayAttendance || 0,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Pengajar</h1>
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
          <CardHeader>
            <CardTitle>Kelas Aktif Saya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : stats?.data?.myClasses?.length > 0 ? (
                stats.data.myClasses.map((classItem: any) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.currentEnrollment} mahasiswa • {classItem.type}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {classItem.level}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Belum ada kelas aktif
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Jadwal Hari Ini */}
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : stats?.data?.todayScheduleList?.length > 0 ? (
                stats.data.todayScheduleList.map((schedule: any) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{schedule.class.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {schedule.location}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tidak ada jadwal hari ini
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}