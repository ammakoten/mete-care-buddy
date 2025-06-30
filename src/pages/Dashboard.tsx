
import React from 'react';
import DashboardOverview from '@/components/DashboardOverview';
import TreeOverview from '@/components/TreeOverview';
import MaintenanceTasks from '@/components/MaintenanceTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreeDeciduous, CalendarCheck, TrendingUp, Users } from 'lucide-react';
import { useTreeContext } from '@/contexts/TreeContext';
import { useTaskContext } from '@/contexts/TaskContext';
import { useAnalyticsContext } from '@/contexts/AnalyticsContext';

const Dashboard = () => {
  const { trees } = useTreeContext();
  const { tasks } = useTaskContext();
  const { getAnalyticsData } = useAnalyticsContext();
  
  const analyticsData = getAnalyticsData();
  const activeTasks = tasks.filter(task => task.status !== 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cashew-50 to-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-cashew-800 mb-2">
                Selamat Datang di Beranda
              </h1>
              <p className="text-lg text-muted-foreground">
                Ikhtisar pemeliharaan kebun jambu mete Anda
              </p>
              <p className="text-sm text-cashew-600 mt-2">
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cashew-800">{analyticsData.totalTrees}</div>
                <div className="text-sm text-muted-foreground">Total Pohon</div>
              </div>
              <div className="w-px h-12 bg-cashew-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analyticsData.productivity}%</div>
                <div className="text-sm text-muted-foreground">Kesehatan</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <TreeDeciduous className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pohon Sehat</p>
                <p className="text-2xl font-bold text-green-600">{analyticsData.healthyTrees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <CalendarCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tugas Aktif</p>
                <p className="text-2xl font-bold text-amber-600">{activeTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Produktivitas</p>
                <p className="text-2xl font-bold text-blue-600">+{analyticsData.productivity}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tugas</p>
                <p className="text-2xl font-bold text-purple-600">{tasks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Overview Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
          <h2 className="text-2xl font-semibold text-cashew-800 mb-6 flex items-center">
            <div className="w-1 h-6 bg-cashew-600 rounded-full mr-3"></div>
            Ringkasan Sistem
          </h2>
          <DashboardOverview />
        </div>
      </div>
      
      {/* Two Column Layout for Tasks and Trees */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Maintenance Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cashew-800 flex items-center">
              <div className="w-1 h-6 bg-amber-600 rounded-full mr-3"></div>
              Pemeliharaan Terbaru
            </h2>
            <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {activeTasks} Aktif
            </div>
          </div>
          <MaintenanceTasks />
        </div>
        
        {/* Tree Status Section */}
        <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-cashew-800 flex items-center">
              <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
              Status Pohon
            </h2>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {analyticsData.totalTrees} Total
            </div>
          </div>
          <TreeOverview />
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Data terakhir disinkronkan pada {new Date().toLocaleTimeString('id-ID')}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
