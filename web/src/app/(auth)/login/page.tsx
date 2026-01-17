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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authAPI.login(formData.email, formData.password);
      if (response.success && response.data) {
        const { user, token } = response.data;
        login(user, token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login berhasil');

        const role = user.roles[0]?.name;
        router.push(
          role === 'admin'
            ? '/admin'
            : role === 'pengajar'
            ? '/pengajar'
            : '/mahasiswa'
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT - LOGIN */}
      <div className="flex items-center justify-center px-6">
        <Card className="w-full max-w-md border-none shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">
              Login
            </CardTitle>
            <CardDescription>
              Masuk ke sistem akademik BBQ Ar-Rahman
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-11"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-11"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses
                  </>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>

            
          </CardContent>
        </Card>
      </div>

      {/* RIGHT - BRANDING */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* abstract shapes */}
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20 blur-3xl" />
        <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 left-10 blur-2xl" />

        <div className="relative z-10 max-w-md text-center space-y-6 px-6">
          <h2 className="text-4xl font-bold tracking-tight">
            Welcome!
          </h2>
          <p className="text-white/80">
            Masuk dan mulai perjalanan belajar membaca Al-Qur’an
            bersama BBQ Ar-Rahman.
          </p>
          <Link href="/register">
            <Button variant="secondary" size="lg">
              Daftar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
