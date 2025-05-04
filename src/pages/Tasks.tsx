
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Filter, Calendar, Search as SearchIcon } from 'lucide-react';
import MaintenanceTasks from '@/components/MaintenanceTasks';

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    toast.info('Fitur tambah tugas akan segera tersedia');
  };

  const handleFilter = () => {
    toast.success(`Filter diterapkan: ${filter}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast.success(`Mencari tugas: ${searchQuery}`);
    }
  };

  const handleCalendarView = () => {
    toast.info('Fitur tampilan kalender akan segera tersedia');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cashew-800 mb-2">Tugas Pemeliharaan</h1>
          <p className="text-muted-foreground">Jadwalkan dan lacak tugas pemeliharaan untuk pohon jambu mete Anda</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Cari tugas..." 
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tugas</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="in-progress">Dalam Proses</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFilter} variant="outline">
              <Filter className="mr-1 h-4 w-4" /> Terapkan
            </Button>
          </div>
          
          <Button onClick={handleCalendarView} variant="outline">
            <Calendar className="mr-1 h-4 w-4" /> Kalender
          </Button>
          
          <Button onClick={handleAddTask} className="bg-cashew-600 hover:bg-cashew-700">
            <Plus className="mr-1 h-4 w-4" /> Tambah Tugas
          </Button>
        </div>
      </div>
      
      <MaintenanceTasks />
    </div>
  );
};

export default Tasks;
