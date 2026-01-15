'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  UserCircle,
  GraduationCap,
  ClipboardCheck,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout, hasRole } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logout berhasil');
    router.push('/login');
  };

  // Navigation items based on role
  const getNavItems = () => {
    if (hasRole('admin')) {
      return [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Kelas', href: '/admin/kelas', icon: BookOpen },
        { name: 'Enrollment', href: '/admin/enrollment', icon: GraduationCap },
        { name: 'Materi', href: '/admin/materi', icon: FileText },
        { name: 'Pengumuman', href: '/admin/pengumuman', icon: Bell },
        { name: 'Laporan', href: '/admin/laporan', icon: BarChart3 },
        { name: 'Pengaturan', href: '/admin/pengaturan', icon: Settings },
      ];
    } else if (hasRole('pengajar')) {
      return [
        { name: 'Dashboard', href: '/pengajar', icon: LayoutDashboard },
        { name: 'Kelas Saya', href: '/pengajar/kelas', icon: BookOpen },
        { name: 'Absensi', href: '/pengajar/absensi', icon: ClipboardCheck },
        { name: 'Penilaian', href: '/pengajar/penilaian', icon: Award },
        { name: 'Laporan', href: '/pengajar/laporan', icon: BarChart3 },
        { name: 'Profil', href: '/pengajar/profil', icon: UserCircle },
      ];
    } else {
      return [
        { name: 'Dashboard', href: '/mahasiswa', icon: LayoutDashboard },
        { name: 'Kelas Saya', href: '/mahasiswa/kelas', icon: BookOpen },
        { name: 'Jadwal', href: '/mahasiswa/jadwal', icon: Calendar },
        { name: 'Progress', href: '/mahasiswa/progress', icon: BarChart3 },
        { name: 'Penilaian', href: '/mahasiswa/penilaian', icon: Award },
        { name: 'Pencapaian', href: '/mahasiswa/pencapaian', icon: Award },
        { name: 'Profil', href: '/mahasiswa/profil', icon: UserCircle },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🕌</span>
            </div>
            <span className="font-bold text-lg">BBQ Ar-Rahman</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.roles[0]?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}