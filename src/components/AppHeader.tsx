
import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AppHeader = () => {
  return (
    <header className="bg-background border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-cashew-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold">PM</span>
        </div>
        <h1 className="text-xl font-semibold text-cashew-800">Pemeliharaan Jambu Mete</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Cari pohon, tugas..." 
            className="pl-8 bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 bg-cashew-100 rounded-full flex items-center justify-center">
          <span className="font-medium text-sm text-cashew-800">AG</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
