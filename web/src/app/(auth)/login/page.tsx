'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Masuk - Bimbingan Belajar Al - Qur\'an',
};

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
    {/* Content */}
    <section className='px-6 mt-6 space-y-6'>
      {/* alert */}
      <div className='flex items-center gap-2 rounded-lg
                         bg-emerald-50 border border-emerald-200
                         px-4 py-3 text-sm text-emerald-700'>
      <LogIn className='h-4 w-4'>
        Silahkan Login untuk masuk!
      </LogIn>
      
      <form className='space-y-4'>
        <section className='space-y-1'>
          <Label>Npm</Label>
          <div className='relative'> 
            <Input className='pl-10'></Input>
          </div>
          </section> 

          <section className='space-y-1'>
            <Label>Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-2.5 h-4 w-4'></Lock>
              <Input type='password' className='pl-10'></Input>
            </div>
          </section>

      </form>

      </div>
    </section>

        

      </Card>




    </article>
     
    </>
  );
}
