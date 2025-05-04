
import React from 'react';
import DashboardOverview from '@/components/DashboardOverview';
import TreeOverview from '@/components/TreeOverview';
import MaintenanceTasks from '@/components/MaintenanceTasks';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Beranda</h1>
        <p className="text-muted-foreground">Ikhtisar pemeliharaan kebun jambu mete Anda</p>
      </div>
      
      <DashboardOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold text-cashew-800 mb-4">Pemeliharaan Terbaru</h2>
          <MaintenanceTasks />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-cashew-800 mb-4">Status Pohon</h2>
          <TreeOverview />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
