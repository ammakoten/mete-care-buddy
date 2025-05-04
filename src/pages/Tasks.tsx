
import React from 'react';
import MaintenanceTasks from '@/components/MaintenanceTasks';

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Tugas Pemeliharaan</h1>
        <p className="text-muted-foreground">Jadwalkan dan lacak tugas pemeliharaan untuk pohon jambu mete Anda</p>
      </div>
      
      <MaintenanceTasks />
    </div>
  );
};

export default Tasks;
