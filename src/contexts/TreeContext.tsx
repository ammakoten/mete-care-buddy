
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
  addTree: (tree: Omit<TreeData, 'id'>, generateTasks?: boolean) => void;
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
  const [trees, setTrees] = useState<TreeData[]>([]);

  const addTree = (newTree: Omit<TreeData, 'id'>, generateTasks: boolean = true) => {
    const tree: TreeData = {
      ...newTree,
      id: Date.now().toString(),
    };
    setTrees(prev => [...prev, tree]);
    
    // Trigger task generation event
    if (generateTasks) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('treeAdded', { detail: { treeId: tree.id } }));
      }, 100);
    }
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
    // Trigger task cleanup event
    window.dispatchEvent(new CustomEvent('treeDeleted', { detail: { treeId: id } }));
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
