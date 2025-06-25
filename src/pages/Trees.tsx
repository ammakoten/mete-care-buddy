
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Filter, Search as SearchIcon, TreeDeciduous, TrendingUp, AlertTriangle, CheckCircle, Grid3X3, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TreeOverview from '@/components/TreeOverview';
import { useNavigate } from 'react-router-dom';

const Trees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const handleAddTree = () => {
    navigate('/settings');
    toast.success('Mengarahkan ke pengaturan untuk menambah pohon baru');
  };

  const handleFilter = () => {
    navigate('/analytics');
    toast.success('Menampilkan filter lanjutan di halaman analitik');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast.success(`Mencari pohon: ${searchQuery}`);
    }
  };

  const handleStatClick = (statType: string, count: number) => {
    switch(statType) {
      case 'healthy':
        navigate('/analytics');
        toast.success(`Menampilkan ${count} pohon sehat`);
        break;
      case 'attention':
        navigate('/tasks');
        toast.success(`Menampilkan ${count} pohon yang perlu perhatian`);
        break;
      case 'critical':
        navigate('/weather');
        toast.success(`Menampilkan ${count} pohon dengan status kritis`);
        break;
      case 'growth':
        navigate('/analytics');
        toast.success('Menampilkan data pertumbuhan pohon');
        break;
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;
    toast.success(`Mengurutkan berdasarkan: ${sortType}`);
  };

  const handleFilterButtonClick = (filterType: string) => {
    switch(filterType) {
      case 'status':
        navigate('/tasks');
        toast.success('Filter berdasarkan status kesehatan');
        break;
      case 'location':
        navigate('/weather');
        toast.success('Filter berdasarkan lokasi');
        break;
      case 'variety':
        navigate('/analytics');
        toast.success('Filter berdasarkan varietas');
        break;
      case 'age':
        navigate('/analytics');
        toast.success('Filter berdasarkan umur pohon');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar - Shopee Style */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-800">Inventaris Pohon</h1>
              <span className="text-sm text-gray-500">47 pohon terdaftar</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <form onSubmit={handleSearch} className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Cari pohon berdasarkan nama, lokasi..." 
                  className="pl-10 w-80 border-gray-300 focus:border-cashew-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none border-l"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button onClick={handleFilter} variant="outline" className="border-gray-300">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              
              <Button onClick={handleAddTree} className="bg-cashew-600 hover:bg-cashew-700">
                <Plus className="mr-2 h-4 w-4" /> Tambah Pohon
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats Section - Shopee Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card 
            className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleStatClick('healthy', 42)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pohon Sehat</p>
                  <p className="text-3xl font-bold text-green-600">42</p>
                  <p className="text-xs text-green-500 mt-1">↗ +5 dari bulan lalu</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleStatClick('attention', 4)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Perlu Perhatian</p>
                  <p className="text-3xl font-bold text-amber-600">4</p>
                  <p className="text-xs text-amber-500 mt-1">→ Stabil</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleStatClick('critical', 1)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Status Kritis</p>
                  <p className="text-3xl font-bold text-red-600">1</p>
                  <p className="text-xs text-red-500 mt-1">⚠ Butuh tindakan</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleStatClick('growth', 0)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pertumbuhan</p>
                  <p className="text-3xl font-bold text-blue-600">+8%</p>
                  <p className="text-xs text-blue-500 mt-1">↗ Trend positif</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar - Shopee Style */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">Filter:</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleFilterButtonClick('status')}
                >
                  Semua Status
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleFilterButtonClick('location')}
                >
                  Lokasi
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleFilterButtonClick('variety')}
                >
                  Varietas
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleFilterButtonClick('age')}
                >
                  Umur Pohon
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Urutkan:</span>
              <select 
                className="border border-gray-300 rounded px-3 py-1 text-sm cursor-pointer hover:bg-gray-50"
                onChange={handleSortChange}
              >
                <option value="newest">Terbaru</option>
                <option value="name">Nama A-Z</option>
                <option value="health">Status Kesehatan</option>
                <option value="location">Lokasi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <TreeDeciduous className="mr-2 h-5 w-5 text-cashew-600" />
                Daftar Pohon Jambu Mete
              </h2>
              <span className="text-sm text-gray-500">Menampilkan 47 pohon</span>
            </div>
          </div>
          
          <div className="p-6">
            <TreeOverview viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trees;
