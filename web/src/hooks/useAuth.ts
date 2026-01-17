import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';

export function useAuth() {
  const router = useRouter();
  const { user, token, isAuthenticated, login, logout: logoutStore } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);

      if (response.success && response.data) {
        const { user, token } = response.data;
        
        login(user, token);
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

        return { success: true };
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login gagal');
      return { success: false, error };
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logoutStore();
      router.push('/login');
      toast.success('Logout berhasil');
    }
  };

  const checkAuth = () => {
    if (!isAuthenticated || !token) {
      router.push('/login');
      return false;
    }
    return true;
  };

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  };
}