import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function LoginPage() {

  return (
    <>
    {/* Header Halaman  */}
    <header className="min-h-screen flex items-center justify-center bg-slate-100">
    <Card className="w-full max-w-md shadow-lg">
      <div className='px-6 pt-8 text-center'>
        <h2 className='text-2xl font-semibold text-slate-800'>
          Masuk
        </h2>
        <p className='Text-sm text-muted-foreground'>
          Bimbingan Belajar Al - Qur'an&apos;an
        </p>

      </div>
      
       </Card>

      

    </header>
    
    </>

  );
}
