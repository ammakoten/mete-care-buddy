
import React from 'react';
import MaintenanceTasks from '@/components/MaintenanceTasks';

const Tasks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Maintenance Tasks</h1>
        <p className="text-muted-foreground">Schedule and track maintenance tasks for your cashew trees</p>
      </div>
      
      <MaintenanceTasks />
    </div>
  );
};

export default Tasks;
