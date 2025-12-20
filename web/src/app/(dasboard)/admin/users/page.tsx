"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Mail,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "axios";

// Interface untuk data user
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "pengajar" | "mahasiswa";
  status: "active" | "inactive";
  enrolledClasses?: number;
  teachingClasses?: number;
  createdAt: string;
}

// API endpoint - sesuaikan dengan backend Anda
const api_users = "/api/users";

// Fetcher function untuk SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminUsersPage() {
  const router = useRouter();
  
  // State untuk search dan filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // SWR untuk data fetching
  const { data, error, isLoading, mutate } = useSWR(api_users, fetcher);

  // Function untuk delete user
  const deleteUser = async (id: string, name: string) => {
    try {
      const response = await axios.delete(`${api_users}/${id}`);

      if (response.data.success) {
        toast.success(`User ${name} berhasil dihapus`);
        mutate(); // Refresh data
      } else {
        toast.error(response.data.message || "Gagal menghapus user");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghapus user");
      console.error(err);
    }
  };

  // Function untuk export data
  const handleExport = async () => {
    try {
      toast.info("Mengekspor data...");
      const response = await axios.get(`${api_users}/export`, {
        responseType: "blob",
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `users_${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success("Data berhasil diekspor");
    } catch (err) {
      toast.error("Gagal mengekspor data");
      console.error(err);
    }
  };

  // Filter users
  const filteredUsers = data?.users
    ? data.users.filter((user: User) => {
        const matchSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = filterRole === "all" || user.role === filterRole;
        const matchStatus =
          filterStatus === "all" || user.status === filterStatus;
        return matchSearch && matchRole && matchStatus;
      })
    : [];

  // Helper functions untuk badge styling
  const getRoleBadge = (role: string) => {
    const badges = {
      admin: "bg-purple-100 text-purple-800",
      pengajar: "bg-blue-100 text-blue-800",
      mahasiswa: "bg-green-100 text-green-800",
    };
    return badges[role as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  // Statistics calculations
  const totalUsers = data?.users?.length || 0;
  const totalMahasiswa = data?.users?.filter((u: User) => u.role === "mahasiswa").length || 0;
  const totalPengajar = data?.users?.filter((u: User) => u.role === "pengajar").length || 0;
  const totalActive = data?.users?.filter((u: User) => u.status === "active").length || 0;

  return (
    <div className="space-y-6">
      <title>User Management - Admin UKMI</title>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage all users in the system</p>
        </div>
        <button
          onClick={() => router.push("/users/add")}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          Add New User
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} />
            Filters
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={20} />
            Export
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="pengajar">Pengajar</option>
                <option value="mahasiswa">Mahasiswa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Mahasiswa</p>
          <p className="text-2xl font-bold text-green-600">{totalMahasiswa}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pengajar</p>
          <p className="text-2xl font-bold text-blue-600">{totalPengajar}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{totalActive}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {error ? (
          <div className="p-6 text-center text-rose-700">
            Gagal mengambil data user. Silakan refresh halaman.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%]">User</TableHead>
                  <TableHead className="w-[20%]">Contact</TableHead>
                  <TableHead className="w-[10%] text-center">Role</TableHead>
                  <TableHead className="w-[10%] text-center">Status</TableHead>
                  <TableHead className="w-[15%]">Info</TableHead>
                  <TableHead className="w-[15%] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Mohon Tunggu...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Tidak ada data user ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user: User) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="text-sm">
                          <div className="flex items-center gap-2 text-gray-800">
                            <Mail size={14} className="text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Phone size={14} className="text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-gray-600">
                        {user.role === "mahasiswa" && user.enrolledClasses && (
                          <p>{user.enrolledClasses} classes enrolled</p>
                        )}
                        {user.role === "pengajar" && user.teachingClasses && (
                          <p>{user.teachingClasses} classes teaching</p>
                        )}
                        {user.role === "admin" && <p>Full access</p>}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        <div className="flex items-center justify-center gap-2">
                          {/* View Button */}
                          <button
                            onClick={() => router.push(`/users/view/${user.id}`)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => router.push(`/users/edit/${user.id}`)}
                            className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>

                          {/* Delete Button with Confirmation */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Konfirmasi Hapus User
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus user{" "}
                                  <strong>{user.name}</strong> ({user.email})?
                                  <br />
                                  <br />
                                  <span className="text-red-600 font-semibold">
                                    Tindakan ini tidak dapat dibatalkan!
                                  </span>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteUser(user.id, user.name)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination Info */}
        {!isLoading && !error && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {totalUsers} users
              {(searchTerm || filterRole !== "all" || filterStatus !== "all") &&
                " (filtered)"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}