"use client";

import React from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      
      <article className="w-full max-w-md">
        <Card className="shadow-lg">

{/* header */}
          <header className="px-6 pt-8 text-center">
            <h2 className="text-2xl font-semibold text-slate-800">
              Masuk
            </h2>
            <p className="text-sm text-muted-foreground">
              Bimbingan Belajar Al-Qur&apos;an
            </p>
          </header>

{/* content */}
          <section className="px-6 mt-6">
            <form className="space-y-4">

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@bbq-arrahman.id"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Masuk
              </Button>
            </form>
          </section>

{/* footer */}
          <footer className="px-6 py-6 text-center">
            <Link
              href="/"
              className="text-sm text-emerald-600 hover:underline"
            >
              Kembali ke Beranda
            </Link>

            <p className="text-xs text-muted-foreground mt-3">
              © {new Date().getFullYear()} BBQ Ar-Rahman
            </p>
          </footer>

        </Card>
      </article>

    </main>
  );
}
