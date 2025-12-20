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
    <article className='min-h-screen flex items-center justify-center bg-slate-100 px-4'>
      <Card className='w-full max-w-md shadow-lg'>


        {/* Header */}
        <section className='px-6 pt-8 text-center'>
          <h2 className='text-2xl font-semibold text-slate-800'>
            Masuk
          </h2>
          <p className='text-sm text-muted-foreground'>
            Bimbingan Belajar Al - Qur&apos;an
          </p>
        </section>


        

      </Card>




    </article>
     
    </>
  );
}
