
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Filter, Search as SearchIcon } from 'lucide-react';
import TreeOverview from '@/components/TreeOverview';

const Trees = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTree = () => {
    toast.info('Fitur tambah pohon akan segera tersedia');
  };

  const handleFilter = () => {
    toast.info('Fitur filter akan segera tersedia');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast.success(`Mencari pohon: ${searchQuery}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cashew-800 mb-2">Inventaris Pohon</h1>
          <p className="text-muted-foreground">Kelola dan pantau pohon jambu mete Anda</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Cari pohon..." 
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button onClick={handleFilter} variant="outline" className="flex items-center">
            <Filter className="mr-1 h-4 w-4" /> Filter
          </Button>
          <Button onClick={handleAddTree} className="bg-cashew-600 hover:bg-cashew-700">
            <Plus className="mr-1 h-4 w-4" /> Tambah Pohon
          </Button>
        </div>
      </div>
      
      <TreeOverview />
    </div>
  );
};

export default Trees;
