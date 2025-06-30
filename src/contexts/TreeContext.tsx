
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TreeData {
  id: string;
  name: string;
  age: number;
  health: 'healthy' | 'needs-attention' | 'critical';
  lastMaintenance: string;
  variety: string;
  location: string;
  notes?: string;
}

interface TreeContextType {
  trees: TreeData[];
  addTree: (tree: Omit<TreeData, 'id'>) => void;
  updateTree: (id: string, tree: Partial<TreeData>) => void;
  deleteTree: (id: string) => void;
  getTreeById: (id: string) => TreeData | undefined;
}

const TreeContext = createContext<TreeContextType | undefined>(undefined);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};

interface TreeProviderProps {
  children: ReactNode;
}

export const TreeProvider = ({ children }: TreeProviderProps) => {
  // Mulai dengan array kosong atau beberapa data contoh
  const [trees, setTrees] = useState<TreeData[]>([]);

  const addTree = (newTree: Omit<TreeData, 'id'>) => {
    const tree: TreeData = {
      ...newTree,
      id: Date.now().toString(), // Simple ID generation
    };
    setTrees(prev => [...prev, tree]);
  };

  const updateTree = (id: string, updatedTree: Partial<TreeData>) => {
    setTrees(prev => 
      prev.map(tree => 
        tree.id === id ? { ...tree, ...updatedTree } : tree
      )
    );
  };

  const deleteTree = (id: string) => {
    setTrees(prev => prev.filter(tree => tree.id !== id));
  };

  const getTreeById = (id: string) => {
    return trees.find(tree => tree.id === id);
  };

  return (
    <TreeContext.Provider value={{ 
      trees, 
      addTree, 
      updateTree, 
      deleteTree, 
      getTreeById 
    }}>
      {children}
    </TreeContext.Provider>
  );
};
