'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <>
      <header className="min-h-screen flex items-center justify-center bg-slate-100">
        <Card className="w-full max-w-md shadow-lg">

          {/* HEADER */}
          <div className="px-6 pt-8 text-center">
            <h2 className="text-2xl font-semibold">Masuk</h2>
            <p className="text-sm text-muted-foreground">
              Bimbingan Belajar Al-Qur&apos;an
            </p>
          </div>

          {/* MAIN */}
          <main className="px-6 mt-6 space-y-4">

            <div className="space-y-1">
              <Label>Email</Label>
              <Input placeholder="admin@bbq-arrahman.id" />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input type="password" />
            </div>

            <Button className="w-full bg-emerald-600">
              Masuk
            </Button>

          </main>

          {/* FOOTER */}
          <footer className="px-6 py-6 text-center">
            <Link href="/" className="text-sm text-emerald-600">
              Kembali ke Beranda
            </Link>
          </footer>

        </Card>
      </header>
    </>
  );
}
