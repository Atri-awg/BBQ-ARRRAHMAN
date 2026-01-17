import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

// API client instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<any>) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle authentication errors
    if (status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      toast.error('Session expired. Please login again.');
    }

    // Handle forbidden errors
    if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    }

    // Handle not found errors
    if (status === 404) {
      toast.error(data?.message || 'Resource not found.');
    }

    // Handle server errors
    if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// API response type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

// Generic API methods
export const api = {
  // GET request
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data;
  },

  // POST request
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PATCH request
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },
};

// Specific API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  
  register: (data: any) =>
    api.post('/api/auth/register', data),
  
  logout: () =>
    api.post('/api/auth/logout'),
  
  me: () =>
    api.get('/api/auth/me'),
};

export const usersAPI = {
  getAll: (params?: any) =>
    api.get('/api/users', { params }),
  
  getById: (id: string) =>
    api.get(`/api/users/${id}`),
  
  create: (data: any) =>
    api.post('/api/users', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/users/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/users/${id}`),
};

export const classesAPI = {
  getAll: (params?: any) =>
    api.get('/api/kelas', { params }),
  
  getById: (id: string) =>
    api.get(`/api/kelas/${id}`),
  
  create: (data: any) =>
    api.post('/api/kelas', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/kelas/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/kelas/${id}`),
  
  getSchedules: (classId: string) =>
    api.get(`/api/kelas/${classId}/schedules`),
  
  getMaterials: (classId: string) =>
    api.get(`/api/kelas/${classId}/materials`),
};

export const enrollmentAPI = {
  getAll: (params?: any) =>
    api.get('/api/enrollment', { params }),
  
  getById: (id: string) =>
    api.get(`/api/enrollment/${id}`),
  
  create: (data: any) =>
    api.post('/api/enrollment', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/enrollment/${id}`, data),
  
  drop: (id: string) =>
    api.post(`/api/enrollment/${id}/drop`),
};

export const attendanceAPI = {
  getAll: (params?: any) =>
    api.get('/api/attendance', { params }),
  
  create: (data: any) =>
    api.post('/api/attendance', data),
  
  checkIn: (data: any) =>
    api.post('/api/attendance/check-in', data),
  
  generateQR: (scheduleId: string) =>
    api.get(`/api/attendance/qr-code/${scheduleId}`),
};

export const progressAPI = {
  getAll: (params?: any) =>
    api.get('/api/progress', { params }),
  
  getByEnrollment: (enrollmentId: string) =>
    api.get(`/api/progress/enrollment/${enrollmentId}`),
  
  create: (data: any) =>
    api.post('/api/progress', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/progress/${id}`, data),
};

export const assessmentAPI = {
  getAll: (params?: any) =>
    api.get('/api/assessment', { params }),
  
  getById: (id: string) =>
    api.get(`/api/assessment/${id}`),
  
  create: (data: any) =>
    api.post('/api/assessment', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/assessment/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/assessment/${id}`),
};

export const announcementAPI = {
  getAll: (params?: any) =>
    api.get('/api/announcement', { params }),
  
  getById: (id: string) =>
    api.get(`/api/announcement/${id}`),
  
  create: (data: any) =>
    api.post('/api/announcement', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/announcement/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/announcement/${id}`),
};

export const notificationAPI = {
  getAll: (params?: any) =>
    api.get('/api/notifications', { params }),
  
  markAsRead: (ids: string[]) =>
    api.post('/api/notifications/mark-read', { ids }),
};

export default apiClient;