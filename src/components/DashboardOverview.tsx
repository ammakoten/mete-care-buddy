
import React from 'react';
import { TreeDeciduous, CalendarCheck, CloudSun } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { trees, maintenanceTasks } from '@/data/mockData';

const DashboardOverview = () => {
  const healthyTrees = trees.filter(tree => tree.health === 'healthy').length;
  const needsAttentionTrees = trees.filter(tree => tree.health === 'needs-attention').length;
  const criticalTrees = trees.filter(tree => tree.health === 'critical').length;
  
  const pendingTasks = maintenanceTasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = maintenanceTasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = maintenanceTasks.filter(task => task.status === 'completed').length;
  
  const totalTrees = trees.length;
  const totalTasks = maintenanceTasks.length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="animate-scale-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TreeDeciduous className="h-5 w-5 mr-2 text-cashew-600" />
            Kesehatan Pohon
          </CardTitle>
          <CardDescription>Status kesehatan pohon jambu mete Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Sehat</span>
                <span className="font-medium">{healthyTrees} pohon</span>
              </div>
              <Progress value={(healthyTrees / totalTrees) * 100} className="h-2 bg-gray-100" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Perlu Perhatian</span>
                <span className="font-medium">{needsAttentionTrees} pohon</span>
              </div>
              <Progress value={(needsAttentionTrees / totalTrees) * 100} className="h-2 bg-gray-100" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Kritis</span>
                <span className="font-medium">{criticalTrees} pohon</span>
              </div>
              <Progress value={(criticalTrees / totalTrees) * 100} className="h-2 bg-gray-100" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-scale-in [animation-delay:150ms]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CalendarCheck className="h-5 w-5 mr-2 text-cashew-600" />
            Tugas Pemeliharaan
          </CardTitle>
          <CardDescription>Status tugas pemeliharaan saat ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Tertunda</span>
                <span className="font-medium">{pendingTasks} tugas</span>
              </div>
              <Progress value={(pendingTasks / totalTasks) * 100} className="h-2 bg-gray-100" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Dalam Proses</span>
                <span className="font-medium">{inProgressTasks} tugas</span>
              </div>
              <Progress value={(inProgressTasks / totalTasks) * 100} className="h-2 bg-gray-100" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Selesai</span>
                <span className="font-medium">{completedTasks} tugas</span>
              </div>
              <Progress value={(completedTasks / totalTasks) * 100} className="h-2 bg-gray-100" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="animate-scale-in [animation-delay:300ms]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CloudSun className="h-5 w-5 mr-2 text-cashew-600" />
            Prakiraan Cuaca
          </CardTitle>
          <CardDescription>Prakiraan cuaca 5 hari</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {["cerah", "cerah", "berawan", "hujan", "hujan"].map((condition, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">{new Date(2025, 4, 5 + i).toLocaleDateString('id-ID', { weekday: 'short' })}</span>
                <div className="my-2">
                  {condition === 'cerah' && <div className="h-8 w-8 rounded-full bg-amber-400"></div>}
                  {condition === 'berawan' && <div className="h-8 w-8 rounded-full bg-gray-300"></div>}
                  {condition === 'hujan' && <div className="h-8 w-8 rounded-full bg-blue-300"></div>}
                  {condition === 'badai' && <div className="h-8 w-8 rounded-full bg-gray-500"></div>}
                </div>
                <span className="font-medium">{28 - i}°C</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
