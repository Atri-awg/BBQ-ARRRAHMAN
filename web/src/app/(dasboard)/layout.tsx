"use client";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      <aside className="w-64 bg-emerald-900 text-white">Sidebar</aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header placeholder */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
