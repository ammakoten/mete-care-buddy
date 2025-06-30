
import React, { createContext, useContext, ReactNode } from 'react';
import { useTreeContext } from './TreeContext';
import { useTaskContext } from './TaskContext';

interface AnalyticsData {
  totalTrees: number;
  healthyTrees: number;
  needsAttentionTrees: number;
  criticalTrees: number;
  completedTasks: number;
  pendingTasks: number;
  productivity: number;
  varietyDistribution: { variety: string; count: number }[];
  locationDistribution: { location: string; count: number }[];
  taskTypeDistribution: { type: string; count: number }[];
}

interface AnalyticsContextType {
  getAnalyticsData: () => AnalyticsData;
  getProductivityTrend: () => number;
  getHealthDistribution: () => { healthy: number; needsAttention: number; critical: number };
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within a AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const { trees } = useTreeContext();
  const { tasks } = useTaskContext();

  const getAnalyticsData = (): AnalyticsData => {
    const totalTrees = trees.length;
    const healthyTrees = trees.filter(tree => tree.health === 'healthy').length;
    const needsAttentionTrees = trees.filter(tree => tree.health === 'needs-attention').length;
    const criticalTrees = trees.filter(tree => tree.health === 'critical').length;
    
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    
    const productivity = totalTrees > 0 ? Math.round((healthyTrees / totalTrees) * 100) : 0;

    // Variety distribution
    const varietyMap = new Map<string, number>();
    trees.forEach(tree => {
      varietyMap.set(tree.variety, (varietyMap.get(tree.variety) || 0) + 1);
    });
    const varietyDistribution = Array.from(varietyMap.entries()).map(([variety, count]) => ({
      variety,
      count
    }));

    // Location distribution
    const locationMap = new Map<string, number>();
    trees.forEach(tree => {
      locationMap.set(tree.location, (locationMap.get(tree.location) || 0) + 1);
    });
    const locationDistribution = Array.from(locationMap.entries()).map(([location, count]) => ({
      location,
      count
    }));

    // Task type distribution
    const taskTypeMap = new Map<string, number>();
    tasks.forEach(task => {
      taskTypeMap.set(task.taskType, (taskTypeMap.get(task.taskType) || 0) + 1);
    });
    const taskTypeDistribution = Array.from(taskTypeMap.entries()).map(([type, count]) => ({
      type,
      count
    }));

    return {
      totalTrees,
      healthyTrees,
      needsAttentionTrees,
      criticalTrees,
      completedTasks,
      pendingTasks,
      productivity,
      varietyDistribution,
      locationDistribution,
      taskTypeDistribution
    };
  };

  const getProductivityTrend = () => {
    const data = getAnalyticsData();
    return data.productivity;
  };

  const getHealthDistribution = () => {
    const data = getAnalyticsData();
    return {
      healthy: data.healthyTrees,
      needsAttention: data.needsAttentionTrees,
      critical: data.criticalTrees
    };
  };

  return (
    <AnalyticsContext.Provider value={{ 
      getAnalyticsData, 
      getProductivityTrend, 
      getHealthDistribution
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
