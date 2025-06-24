
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { trees } from '@/data/mockData';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-cashew-50 to-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
          <div>
            <h1 className="text-4xl font-bold text-cashew-800 mb-2">Analitik Kebun</h1>
            <p className="text-lg text-muted-foreground">
              Statistik dan wawasan tentang perkebunan jambu mete Anda
            </p>
            <p className="text-sm text-cashew-600 mt-2">
              Data diperbarui: {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produktivitas</p>
                <p className="text-2xl font-bold text-green-600">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hasil Panen</p>
                <p className="text-2xl font-bold text-blue-600">750 kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Efisiensi</p>
                <p className="text-2xl font-bold text-purple-600">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Activity className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="text-2xl font-bold text-amber-600">+18%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-cashew-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-1 h-4 bg-cashew-600 rounded-full mr-2"></div>
              Distribusi Usia Pohon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#94a544" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-cashew-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-1 h-4 bg-green-600 rounded-full mr-2"></div>
              Distribusi Varietas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={varietyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="variety" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#c7d589" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-cashew-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-1 h-4 bg-blue-600 rounded-full mr-2"></div>
              Status Kesehatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#57652f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Productivity Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
        <h2 className="text-2xl font-semibold text-cashew-800 mb-6 flex items-center">
          <div className="w-1 h-6 bg-amber-600 rounded-full mr-3"></div>
          Metrik Produktivitas Tahunan
        </h2>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-muted-foreground">Data produksi historis dan proyeksi untuk musim saat ini</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { year: '2022', actual: 520, projected: 0 },
                  { year: '2023', actual: 680, projected: 0 },
                  { year: '2024', actual: 750, projected: 0 },
                  { year: '2025', actual: 300, projected: 820 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="actual" fill="#57652f" name="Hasil Aktual (kg)" />
                  <Bar dataKey="projected" fill="#c7d589" name="Proyeksi Hasil (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
