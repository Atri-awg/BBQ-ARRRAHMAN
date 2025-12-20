import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Eye, Users, 
  Calendar, MapPin, Clock, BookOpen, TrendingUp
} from 'lucide-react';

// Sample data
const kelasData = [
  {
    id: '1',
    code: 'THS-001',
    name: 'Tahsin Dasar A',
    type: 'tahsin',
    level: 'pemula',
    pengajar: 'Ustadz Ali Rahman',
    pengajarId: '2',
    capacity: 20,
    enrolled: 18,
    schedule: 'Senin & Rabu, 16:00-17:30',
    location: 'Ruang A1',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    status: 'active'
  },
  {
    id: '2',
    code: 'TJW-002',
    name: 'Tajwid Menengah B',
    type: 'tajwid',
    level: 'menengah',
    pengajar: 'Ustadzah Fatimah',
    pengajarId: '3',
    capacity: 15,
    enrolled: 15,
    schedule: 'Selasa & Kamis, 15:00-16:30',
    location: 'Ruang B2',
    startDate: '2024-02-05',
    endDate: '2024-06-30',
    status: 'active'
  },
  {
    id: '3',
    code: 'THF-003',
    name: 'Tahfidz Juz 30',
    type: 'tahfidz',
    level: 'pemula',
    pengajar: 'Ustadz Ahmad',
    pengajarId: '4',
    capacity: 25,
    enrolled: 12,
    schedule: 'Sabtu, 08:00-10:00',
    location: 'Masjid Utama',
    startDate: '2024-02-10',
    endDate: '2024-12-31',
    status: 'active'
  },
  {
    id: '4',
    code: 'THS-004',
    name: 'Tahsin Lanjut C',
    type: 'tahsin',
    level: 'lanjut',
    pengajar: 'Ustadz Ali Rahman',
    pengajarId: '2',
    capacity: 20,
    enrolled: 8,
    schedule: 'Jumat, 16:00-17:30',
    location: 'Ruang C1',
    startDate: '2024-03-01',
    endDate: '2024-07-31',
    status: 'active'
  },
  {
    id: '5',
    code: 'TJW-005',
    name: 'Tajwid Dasar A',
    type: 'tajwid',
    level: 'pemula',
    pengajar: 'Ustadzah Aisyah',
    pengajarId: '5',
    capacity: 20,
    enrolled: 20,
    schedule: 'Senin & Rabu, 14:00-15:30',
    location: 'Ruang A2',
    startDate: '2024-01-15',
    endDate: '2024-05-31',
    status: 'completed'
  },
];

export default function AdminKelasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredKelas = kelasData.filter(kelas => {
    const matchSearch = kelas.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       kelas.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       kelas.pengajar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'all' || kelas.type === filterType;
    const matchLevel = filterLevel === 'all' || kelas.level === filterLevel;
    const matchStatus = filterStatus === 'all' || kelas.status === filterStatus;
    return matchSearch && matchType && matchLevel && matchStatus;
  });

  const getTypeBadge = (type) => {
    const badges = {
      tahsin: 'bg-blue-100 text-blue-800',
      tajwid: 'bg-purple-100 text-purple-800',
      tahfidz: 'bg-green-100 text-green-800'
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  const getLevelBadge = (level) => {
    const badges = {
      pemula: 'bg-yellow-100 text-yellow-800',
      menengah: 'bg-orange-100 text-orange-800',
      lanjut: 'bg-red-100 text-red-800'
    };
    return badges[level] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getCapacityColor = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelas Management</h1>
          <p className="text-gray-600">Manage all classes and halaqoh</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus size={20} />
          Create New Kelas
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Kelas</p>
              <p className="text-2xl font-bold text-gray-800">{kelasData.length}</p>
            </div>
            <BookOpen className="text-emerald-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Classes</p>
              <p className="text-2xl font-bold text-green-600">
                {kelasData.filter(k => k.status === 'active').length}
              </p>
            </div>
            <TrendingUp className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-600">
                {kelasData.reduce((sum, k) => sum + k.enrolled, 0)}
              </p>
            </div>
            <Users className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Capacity</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((kelasData.reduce((sum, k) => sum + (k.enrolled/k.capacity*100), 0) / kelasData.length))}%
              </p>
            </div>
            <Calendar className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, code, or pengajar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Types</option>
                <option value="tahsin">Tahsin</option>
                <option value="tajwid">Tajwid</option>
                <option value="tahfidz">Tahfidz</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Levels</option>
                <option value="pemula">Pemula</option>
                <option value="menengah">Menengah</option>
                <option value="lanjut">Lanjut</option>
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
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Kelas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKelas.map((kelas) => (
          <div key={kelas.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{kelas.name}</h3>
                  <p className="text-sm text-gray-500">{kelas.code}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(kelas.status)}`}>
                  {kelas.status}
                </span>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getTypeBadge(kelas.type)}`}>
                  {kelas.type}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getLevelBadge(kelas.level)}`}>
                  {kelas.level}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Users size={16} className="text-gray-400" />
                <span>Pengajar: <span className="font-medium">{kelas.pengajar}</span></span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>{kelas.schedule}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin size={16} className="text-gray-400" />
                <span>{kelas.location}</span>
              </div>

              {/* Capacity Bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Capacity</span>
                  <span className={`font-semibold ${getCapacityColor(kelas.enrolled, kelas.capacity)}`}>
                    {kelas.enrolled}/{kelas.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all"
                    style={{ width: `${(kelas.enrolled / kelas.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                {new Date(kelas.startDate).toLocaleDateString()} - {new Date(kelas.endDate).toLocaleDateString()}
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Eye size={16} />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm">
                <Edit size={16} />
                Edit
              </button>
              <button className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredKelas.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No classes found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}