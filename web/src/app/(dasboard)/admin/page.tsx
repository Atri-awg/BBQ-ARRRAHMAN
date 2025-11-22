'use client';
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, 
  MoreVertical, UserPlus, Download, Mail, Phone 
} from 'lucide-react';

// Sample data - dalam implementasi nyata, fetch dari API
const usersData = [
  { 
    id: '1', 
    name: 'Ahmad Yani', 
    email: 'ahmad@ukmi.ac.id', 
    phone: '081234567890',
    role: 'mahasiswa', 
    status: 'active',
    enrolledClasses: 3,
    createdAt: '2024-01-15'
  },
  { 
    id: '2', 
    name: 'Ustadz Ali Rahman', 
    email: 'ali@ukmi.ac.id', 
    phone: '081234567891',
    role: 'pengajar', 
    status: 'active',
    teachingClasses: 5,
    createdAt: '2024-01-10'
  },
  { 
    id: '3', 
    name: 'Fatimah Azzahra', 
    email: 'fatimah@ukmi.ac.id', 
    phone: '081234567892',
    role: 'mahasiswa', 
    status: 'active',
    enrolledClasses: 2,
    createdAt: '2024-01-20'
  },
  { 
    id: '4', 
    name: 'Admin UKMI', 
    email: 'admin@ukmi.ac.id', 
    phone: '081234567893',
    role: 'admin', 
    status: 'active',
    createdAt: '2024-01-01'
  },
  { 
    id: '5', 
    name: 'Muhammad Rizki', 
    email: 'rizki@ukmi.ac.id', 
    phone: '081234567894',
    role: 'mahasiswa', 
    status: 'inactive',
    enrolledClasses: 1,
    createdAt: '2024-01-25'
  },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter users
  const filteredUsers = usersData.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    const matchStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-purple-100 text-purple-800',
      pengajar: 'bg-blue-100 text-blue-800',
      mahasiswa: 'bg-green-100 text-green-800'
    };
    return badges[role] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage all users in the system</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus size={20} />
          Add New User
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={20} />
            Export
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
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
          <p className="text-2xl font-bold text-gray-800">{usersData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Mahasiswa</p>
          <p className="text-2xl font-bold text-green-600">
            {usersData.filter(u => u.role === 'mahasiswa').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pengajar</p>
          <p className="text-2xl font-bold text-blue-600">
            {usersData.filter(u => u.role === 'pengajar').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-emerald-600">
            {usersData.filter(u => u.status === 'active').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.role === 'mahasiswa' && (
                      <p>{user.enrolledClasses} classes enrolled</p>
                    )}
                    {user.role === 'pengajar' && (
                      <p>{user.teachingClasses} classes teaching</p>
                    )}
                    {user.role === 'admin' && (
                      <p>Full access</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {usersData.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}