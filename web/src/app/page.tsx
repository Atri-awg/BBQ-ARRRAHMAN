import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-emerald-900 mb-4">
          BBQ Ar-Rahman
        </h1>
        <p className="text-xl text-emerald-700 mb-8">
          Sistem Bimbingan Baca Qur'an - UKMI
        </p>
        <div className="space-x-4">
          <Link 
            href="/login"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors inline-block"
          >
            Masuk
          </Link>
          <Link 
            href="/admin" 
            className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors inline-block"
          >
            Demo Admin
          </Link>
        </div>
      </div>
    </div>
  );
}