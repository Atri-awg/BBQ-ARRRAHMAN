'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Store in zustand
        login(user, token);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success('Login berhasil!');

        // Redirect based on role
        const primaryRole = user.roles[0]?.name;
        if (primaryRole === 'admin') {
          router.push('/admin');
        } else if (primaryRole === 'pengajar') {
          router.push('/pengajar');
        } else {
          router.push('/mahasiswa');
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-3xl">🕌</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">BBQ Ar-Rahman</CardTitle>
          <CardDescription>
            Sistem Akademik Bimbingan Baca Quran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Belum punya akun?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Demo Login:
              <br />
              Admin: admin@arrahman.ac.id / password123
              <br />
              Pengajar: ustadz.ahmad@arrahman.ac.id / password123
              <br />
              Mahasiswa: mahasiswa1@arrahman.ac.id / password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}