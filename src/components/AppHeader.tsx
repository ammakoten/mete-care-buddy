
import React from 'react';
import { Bell, LogOut, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Berhasil keluar dari akun');
    navigate('/login');
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
        <Button variant="ghost" size="icon" title="Notifikasi">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Pengaturan" onClick={() => navigate('/settings')}>
          <Settings className="h-5 w-5" />
        </Button>
        <div className="relative group">
          <div className="h-8 w-8 bg-cashew-100 rounded-full flex items-center justify-center cursor-pointer">
            <span className="font-medium text-sm text-cashew-800">{getUserInitials()}</span>
          </div>
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
            <div className="px-4 py-2 text-sm text-cashew-700 border-b">
              {user?.name || user?.email}
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
    </header>
  );
};

export default AppHeader;
