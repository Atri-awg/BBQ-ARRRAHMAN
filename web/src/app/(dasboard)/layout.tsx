'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, UserCheck, FileText, 
  Bell, Settings, LogOut, Menu, X, ChevronDown,
  GraduationCap, Calendar, BarChart3, MessageSquare
} from 'lucide-react';
import router from 'next/dist/shared/lib/router/router';
import Link from "next/link";
import AdminDashboardHome from './admin/page';

// Simulasi data user - dalam implementasi nyata, ambil dari context/store
const currentUser = {
  name: 'Admin User',
  email: 'admin@ukmi.ac.id',
  role: 'admin',
  avatar: null
};

// Navigation items untuk Admin
const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Kelas', href: '/admin/kelas', icon: BookOpen },
  { name: 'Enrollment', href: '/admin/enrollment', icon: UserCheck },
  { name: 'Materi', href: '/admin/materi', icon: FileText },
  { name: 'Pengumuman', href: '/admin/pengumuman', icon: MessageSquare },
  { 
    name: 'Laporan', 
    href: '/admin/laporan', 
    icon: BarChart3,
    submenu: [
      { name: 'Kehadiran', href: '/admin/laporan/kehadiran' },
      { name: 'Progress', href: '/admin/laporan/progress' },
      { name: 'Kelas', href: '/admin/laporan/kelas' },
    ]
  },
  { name: 'Pengaturan', href: '/admin/pengaturan', icon: Settings },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('/admin');
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleLogout = () => {
    // Implementasi logout
    console.log('Logout clicked');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sky-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-sky-800">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">BBQ Ar-Rahman</h1>
              <p className="text-xs text-sky-300">UKMI Management</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sky-800 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {adminNavigation.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  setActiveMenu(item.href);
                  if (item.submenu) toggleSubmenu(item.name);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-sky-800 transition-colors ${
                  activeMenu === item.href ? 'bg-sky-800 border-r-4 border-sky-400' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.name}</span>}
                </div>
                {sidebarOpen && item.submenu && (
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${expandedMenu === item.name ? 'rotate-180' : ''}`}
                  />
                )}
              </button>
              
              {/* Submenu */}
              {sidebarOpen && item.submenu && expandedMenu === item.name && (
                <div className="bg-sky-950">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => setActiveMenu(subItem.href)}
                      className={`w-full text-left px-12 py-2 hover:bg-sky-800 text-sm ${
                        activeMenu === subItem.href ? 'bg-sky-800' : ''
                      }`}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-sky-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-700 rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-sky-300">{currentUser.role}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button 
              onClick={handleLogout}
              className="mt-3 w-full flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
              <p className="text-sm text-gray-600">Sistem Bimbingan Baca Qur'an</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Quick Actions */}
              <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
                Quick Action
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children || <AdminDashboardHome />}
        </main>
      </div>
    </div>
  );
}
