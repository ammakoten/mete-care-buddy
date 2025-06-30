
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTreeContext } from './TreeContext';

export interface TaskData {
  id: string;
  title: string;
  description: string;
  treeId: string;
  taskType: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'harvesting';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdDate: string;
}

interface TaskContextType {
  tasks: TaskData[];
  addTask: (task: Omit<TaskData, 'id'>) => void;
  updateTask: (id: string, task: Partial<TaskData>) => void;
  deleteTask: (id: string) => void;
  getTasksByTreeId: (treeId: string) => TaskData[];
  generateTasksForTree: (treeId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const { trees } = useTreeContext();

  const addTask = (newTask: Omit<TaskData, 'id'>) => {
    const task: TaskData = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks(prev => [...prev, task]);
  };

  const updateTask = (id: string, updatedTask: Partial<TaskData>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTasksByTreeId = (treeId: string) => {
    return tasks.filter(task => task.treeId === treeId);
  };

  const generateTasksForTree = (treeId: string) => {
    const tree = trees.find(t => t.id === treeId);
    if (!tree) return;

    const today = new Date();
    const taskTypes = [
      {
        type: 'watering' as const,
        title: 'Penyiraman Rutin',
        description: `Penyiraman untuk ${tree.name}`,
        daysFromNow: 1,
        priority: 'high' as const
      },
      {
        type: 'fertilizing' as const,
        title: 'Pemupukan',
        description: `Pemupukan berkala untuk ${tree.name}`,
        daysFromNow: 7,
        priority: 'medium' as const
      },
      {
        type: 'pruning' as const,
        title: 'Pemangkasan',
        description: `Pemangkasan dahan untuk ${tree.name}`,
        daysFromNow: 30,
        priority: 'low' as const
      },
      {
        type: 'pest-control' as const,
        title: 'Kontrol Hama',
        description: `Pemeriksaan dan pengendalian hama untuk ${tree.name}`,
        daysFromNow: 14,
        priority: 'medium' as const
      }
    ];

    taskTypes.forEach(taskType => {
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + taskType.daysFromNow);

      addTask({
        title: taskType.title,
        description: taskType.description,
        treeId: treeId,
        taskType: taskType.type,
        priority: taskType.priority,
        status: 'pending',
        dueDate: dueDate.toISOString().split('T')[0],
        createdDate: today.toISOString().split('T')[0]
      });
    });
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask, 
      getTasksByTreeId,
      generateTasksForTree
    }}>
      {children}
    </TaskContext.Provider>
  );
};
