import React from 'react';
import { 
  Users, BookOpen, GraduationCap, TrendingUp, 
  Calendar, Clock, Award, AlertCircle,
  ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';

export default function AdminDashboardHome() {
  // Sample data - nanti diganti dengan fetch dari API
  const stats = [
    { 
      label: 'Total Users', 
      value: '1,234', 
      change: '+12%',
      trend: 'up',
      icon: Users, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Active Kelas', 
      value: '45', 
      change: '+8%',
      trend: 'up',
      icon: BookOpen, 
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Total Mahasiswa', 
      value: '856', 
      change: '+15%',
      trend: 'up',
      icon: GraduationCap, 
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Total Pengajar', 
      value: '32', 
      change: '-2%',
      trend: 'down',
      icon: Users, 
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: 'New enrollment', 
      user: 'Ahmad Yani', 
      class: 'Tahsin Dasar A',
      time: '5 menit yang lalu',
      type: 'enrollment'
    },
    { 
      id: 2, 
      action: 'Class created', 
      user: 'Admin', 
      class: 'Tajwid Menengah B',
      time: '15 menit yang lalu',
      type: 'class'
    },
    { 
      id: 3, 
      action: 'Assessment submitted', 
      user: 'Ustadz Ali', 
      class: 'Tahfidz Juz 30',
      time: '1 jam yang lalu',
      type: 'assessment'
    },
    { 
      id: 4, 
      action: 'User registered', 
      user: 'Fatimah Azzahra', 
      class: '-',
      time: '2 jam yang lalu',
      type: 'user'
    },
    { 
      id: 5, 
      action: 'Attendance recorded', 
      user: 'Muhammad Rizki', 
      class: 'Tahsin Dasar A',
      time: '3 jam yang lalu',
      type: 'attendance'
    },
  ];

  const upcomingSchedules = [
    {
      id: 1,
      class: 'Tahsin Dasar A',
      time: '16:00 - 17:30',
      day: 'Senin',
      location: 'Ruang A1',
      pengajar: 'Ustadz Ali'
    },
    {
      id: 2,
      class: 'Tajwid Menengah B',
      time: '15:00 - 16:30',
      day: 'Selasa',
      location: 'Ruang B2',
      pengajar: 'Ustadzah Fatimah'
    },
    {
      id: 3,
      class: 'Tahfidz Juz 30',
      time: '08:00 - 10:00',
      day: 'Sabtu',
      location: 'Masjid Utama',
      pengajar: 'Ustadz Ahmad'
    },
  ];

  const topClasses = [
    {
      id: 1,
      name: 'Tahsin Dasar A',
      enrolled: 18,
      capacity: 20,
      attendance: 95,
      pengajar: 'Ustadz Ali'
    },
    {
      id: 2,
      name: 'Tajwid Menengah B',
      enrolled: 15,
      capacity: 15,
      attendance: 88,
      pengajar: 'Ustadzah Fatimah'
    },
    {
      id: 3,
      name: 'Tahfidz Juz 30',
      enrolled: 12,
      capacity: 25,
      attendance: 92,
      pengajar: 'Ustadz Ahmad'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'enrollment': return '📝';
      case 'class': return '📚';
      case 'assessment': return '✅';
      case 'user': return '👤';
      case 'attendance': return '✓';
      default: return '•';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Selamat Datang, Admin! 👋
            </h1>
            <p className="text-emerald-50">
              Berikut adalah ringkasan aktivitas sistem BBQ Ar-Rahman hari ini
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span className="font-medium">
                  {new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Statistik Kehadiran Bulanan
            </h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Bulan Ini</option>
              <option>Bulan Lalu</option>
              <option>3 Bulan Terakhir</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="font-medium">Grafik Kehadiran</p>
              <p className="text-sm mt-1">Chart akan ditampilkan di sini</p>
            </div>
          </div>
        </div>

        {/* Upcoming Schedules */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Jadwal Terdekat</h3>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingSchedules.map((schedule) => (
              <div 
                key={schedule.id} 
                className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-1">{schedule.class}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Calendar size={12} />
                        {schedule.day}, {schedule.time}
                      </p>
                      <p className="text-xs text-gray-600">{schedule.location}</p>
                      <p className="text-xs text-emerald-700 font-medium">{schedule.pengajar}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            Lihat Semua Jadwal →
          </button>
        </div>
      </div>

      {/* Recent Activities & Top Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
              >
                <div className="text-2xl mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{activity.user}</span>
                    {activity.class !== '-' && (
                      <span className="text-gray-500"> • {activity.class}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Classes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Kelas Teratas</h3>
            <Award size={20} className="text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topClasses.map((kelas, index) => (
              <div 
                key={kelas.id} 
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{kelas.name}</p>
                      <p className="text-xs text-gray-500">{kelas.pengajar}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Enrollment</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: `${(kelas.enrolled / kelas.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {kelas.enrolled}/{kelas.capacity}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Kehadiran</p>
                    <p className={`text-lg font-bold ${getAttendanceColor(kelas.attendance)}`}>
                      {kelas.attendance}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
            <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <Users className="text-emerald-600" size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Add New User</h4>
              <p className="text-sm text-gray-600">Create pengajar or mahasiswa</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
            <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <BookOpen className="text-emerald-600" size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Create New Class</h4>
              <p className="text-sm text-gray-600">Setup halaqoh baru</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
            <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <BarChart3 className="text-emerald-600" size={24} />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Generate Report</h4>
              <p className="text-sm text-gray-600">Export data & analytics</p>
            </div>
          </button>
        </div>
      </div>

      {/* System Alerts (Optional) */}
      {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">System Notice</h4>
            <p className="text-sm text-yellow-700">
              Sistem maintenance dijadwalkan pada Minggu, 25 November 2024 pukul 02:00 - 04:00 WIB.
              Mohon selesaikan semua aktivitas penting sebelum waktu tersebut.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}