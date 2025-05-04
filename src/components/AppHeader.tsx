
import React, { useState } from 'react';
import { Bell, LogOut, Search, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    toast.success('Berhasil keluar dari akun');
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Mencari: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  const getUserInitials = () => {
    if (user?.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return user.name[0].toUpperCase();
    }
    
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    
    return 'U';
  };

  return (
    <header className="bg-white border-b border-cashew-100 px-6 py-3 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-cashew-500 to-cashew-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">PM</span>
          </div>
          <h1 className="text-xl font-bold text-cashew-800 hidden sm:block">Pemeliharaan Jambu Mete</h1>
        </div>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cashew-400 h-4 w-4" />
            <Input 
              placeholder="Cari pohon, tugas..." 
              className="pl-10 bg-cashew-50 border-cashew-100 focus-visible:ring-cashew-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-cashew-700 hover:bg-cashew-50 hover:text-cashew-800 relative" title="Notifikasi">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-cashew-700 hover:bg-cashew-50 hover:text-cashew-800" 
            title="Pengaturan" 
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-cashew-50 transition-colors">
              <div className="h-9 w-9 bg-gradient-to-br from-cashew-100 to-cashew-200 rounded-full flex items-center justify-center border border-cashew-200">
                <span className="font-medium text-sm text-cashew-800">{getUserInitials()}</span>
              </div>
              <span className="text-sm font-medium text-cashew-800 hidden sm:block">{user?.name || user?.email}</span>
              <ChevronDown className="h-4 w-4 text-cashew-600 hidden sm:block" />
            </button>
            
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
              <div className="px-4 py-3 text-sm text-cashew-700 border-b border-cashew-100">
                <div className="font-medium">{user?.name || 'Pengguna'}</div>
                <div className="text-cashew-500 truncate">{user?.email}</div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-cashew-700 hover:bg-cashew-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
