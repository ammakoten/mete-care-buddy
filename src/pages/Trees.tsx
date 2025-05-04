
import React from 'react';
import TreeOverview from '@/components/TreeOverview';

const Trees = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Tree Inventory</h1>
        <p className="text-muted-foreground">Manage and monitor your cashew trees</p>
      </div>
      
      <TreeOverview />
    </div>
  );
};

export default Trees;
