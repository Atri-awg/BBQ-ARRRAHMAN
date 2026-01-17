import useSWR from 'swr';
import { enrollmentAPI } from '@/lib/api';
import { toast } from 'sonner';

export function useEnrollments(params?: any) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/api/enrollment', params],
    () => enrollmentAPI.getAll(params),
    {
      revalidateOnFocus: false,
    }
  );

  const createEnrollment = async (enrollmentData: any) => {
    try {
      const response = await enrollmentAPI.create(enrollmentData);
      if (response.success) {
        toast.success('Pendaftaran berhasil');
        mutate();
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal mendaftar kelas');
      return { success: false, error };
    }
  };

  const updateEnrollment = async (id: string, enrollmentData: any) => {
    try {
      const response = await enrollmentAPI.update(id, enrollmentData);
      if (response.success) {
        toast.success('Status enrollment berhasil diupdate');
        mutate();
        return { success: true, data: response.data };
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal mengupdate enrollment');
      return { success: false, error };
    }
  };

  const dropEnrollment = async (id: string) => {
    try {
      const response = await enrollmentAPI.drop(id);
      if (response.success) {
        toast.success('Berhasil keluar dari kelas');
        mutate();
        return { success: true };
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal keluar dari kelas');
      return { success: false, error };
    }
  };

  return {
    enrollments: data?.data?.enrollments || [],
    pagination: data?.data?.pagination,
    isLoading,
    error,
    mutate,
    createEnrollment,
    updateEnrollment,
    dropEnrollment,
  };
}