
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { trees } from '@/data/mockData';
import { TrendingUp, BarChart3, PieChart, Activity, Sparkles, Target, Award, Clock } from 'lucide-react';

const ageData = [
  { age: '0-2 years', count: trees.filter(t => t.age >= 0 && t.age <= 2).length },
  { age: '3-5 years', count: trees.filter(t => t.age >= 3 && t.age <= 5).length },
  { age: '6-8 years', count: trees.filter(t => t.age >= 6 && t.age <= 8).length },
  { age: '9+ years', count: trees.filter(t => t.age >= 9).length },
];

const varietyData = Array.from(
  new Set(trees.map(t => t.variety))
).map(variety => ({
  variety,
  count: trees.filter(t => t.variety === variety).length
}));

const healthData = [
  { status: 'Healthy', count: trees.filter(t => t.health === 'healthy').length },
  { status: 'Needs Attention', count: trees.filter(t => t.health === 'needs-attention').length },
  { status: 'Critical', count: trees.filter(t => t.health === 'critical').length },
];

const Analytics = () => {
  return (
    <div className="min-h-screen space-y-8">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cashew-100/40 via-cashew-50/20 to-transparent rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-cashew-500 to-cashew-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cashew-800 to-cashew-600 bg-clip-text text-transparent mb-2">
                Analitik Kebun Premium
              </h1>
              <p className="text-xl text-cashew-600 font-medium">
                Dashboard komprehensif untuk manajemen perkebunan jambu mete
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-cashew-500" />
            <span className="text-cashew-600 font-medium">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <div className="ml-4 flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-medium text-sm">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -mr-10 -mt-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Produktivitas</p>
                <p className="text-3xl font-bold text-green-800">+12%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3" />
                  Naik dari bulan lalu
                </p>
              </div>
              <div className="p-3 bg-green-200/50 rounded-xl">
                <TrendingUp className="h-8 w-8 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -mr-10 -mt-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Hasil Panen</p>
                <p className="text-3xl font-bold text-blue-800">750 kg</p>
                <p className="text-xs text-blue-600 flex items-center gap-1 mt-2">
                  <Target className="h-3 w-3" />
                  Target tercapai 95%
                </p>
              </div>
              <div className="p-3 bg-blue-200/50 rounded-xl">
                <BarChart3 className="h-8 w-8 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -mr-10 -mt-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 mb-1">Efisiensi</p>
                <p className="text-3xl font-bold text-purple-800">89%</p>
                <p className="text-xs text-purple-600 flex items-center gap-1 mt-2">
                  <Award className="h-3 w-3" />
                  Kategori Excellent
                </p>
              </div>
              <div className="p-3 bg-purple-200/50 rounded-xl">
                <PieChart className="h-8 w-8 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-200/30 rounded-full -mr-10 -mt-10"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 mb-1">ROI</p>
                <p className="text-3xl font-bold text-amber-800">+18%</p>
                <p className="text-xs text-amber-600 flex items-center gap-1 mt-2">
                  <Sparkles className="h-3 w-3" />
                  Performa terbaik
                </p>
              </div>
              <div className="p-3 bg-amber-200/50 rounded-xl">
                <Activity className="h-8 w-8 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-cashew-25/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-bold text-cashew-800">
              <div className="w-1 h-6 bg-gradient-to-b from-cashew-500 to-cashew-600 rounded-full mr-3"></div>
              Distribusi Usia Pohon
            </CardTitle>
            <p className="text-sm text-cashew-600 ml-4">Klasifikasi berdasarkan kelompok usia</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a544" opacity={0.2} />
                  <XAxis dataKey="age" stroke="#57652f" fontSize={12} />
                  <YAxis stroke="#57652f" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #94a544',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="count" fill="url(#ageGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#94a544" />
                      <stop offset="100%" stopColor="#c7d589" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-25/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-bold text-cashew-800">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
              Distribusi Varietas
            </CardTitle>
            <p className="text-sm text-cashew-600 ml-4">Jenis varietas yang ditanam</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={varietyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#22c55e" opacity={0.2} />
                  <XAxis dataKey="variety" stroke="#15803d" fontSize={12} />
                  <YAxis stroke="#15803d" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #22c55e',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="count" fill="url(#varietyGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="varietyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#86efac" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-25/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-bold text-cashew-800">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
              Status Kesehatan
            </CardTitle>
            <p className="text-sm text-cashew-600 ml-4">Kondisi kesehatan pohon</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.2} />
                  <XAxis dataKey="status" stroke="#1e40af" fontSize={12} />
                  <YAxis stroke="#1e40af" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #3b82f6',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="count" fill="url(#healthGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#93c5fd" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Productivity Chart */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-amber-25/20 to-amber-50/30">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-cashew-800 mb-2 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full mr-4"></div>
                Metrik Produktivitas Tahunan
              </CardTitle>
              <p className="text-lg text-cashew-600 ml-6">Data produksi historis dan proyeksi masa depan</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-cashew-500">Target 2025</p>
                <p className="text-2xl font-bold text-amber-600">820 kg</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { year: '2022', actual: 520, projected: 0 },
                { year: '2023', actual: 680, projected: 0 },
                { year: '2024', actual: 750, projected: 0 },
                { year: '2025', actual: 300, projected: 820 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d97706" opacity={0.2} />
                <XAxis dataKey="year" stroke="#92400e" fontSize={14} fontWeight="600" />
                <YAxis stroke="#92400e" fontSize={14} fontWeight="600" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                    border: '2px solid #d97706',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }} 
                />
                <Bar dataKey="actual" fill="url(#actualGradient)" name="Hasil Aktual (kg)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="projected" fill="url(#projectedGradient)" name="Proyeksi Hasil (kg)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                  <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#fed7aa" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
              <p className="text-sm text-green-700 font-medium">Pertumbuhan YoY</p>
              <p className="text-2xl font-bold text-green-800">+10.3%</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
              <p className="text-sm text-blue-700 font-medium">Efisiensi Operasional</p>
              <p className="text-2xl font-bold text-blue-800">94.2%</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
              <p className="text-sm text-purple-700 font-medium">Kualitas Premium</p>
              <p className="text-2xl font-bold text-purple-800">87.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
