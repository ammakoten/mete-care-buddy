
import React, { useState } from 'react';
import { Bell, LogOut, Search, Settings, ChevronDown, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  sidebarCollapsed?: boolean;
  toggleSidebar?: () => void;
}

const AppHeader = ({ sidebarCollapsed, toggleSidebar }: AppHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Tugas Pemeliharaan Baru',
      message: 'Ada tugas pemupukan yang perlu diselesaikan hari ini',
      time: '5 menit lalu',
      read: false,
      type: 'task',
      targetPage: '/tasks'
    },
    {
      id: 2,
      title: 'Pohon Memerlukan Perhatian',
      message: 'Pohon #JM-001 menunjukkan gejala yang perlu diperiksa',
      time: '1 jam lalu',
      read: false,
      type: 'alert',
      targetPage: '/trees'
    },
    {
      id: 3,
      title: 'Laporan Mingguan Siap',
      message: 'Laporan pemeliharaan minggu ini telah tersedia',
      time: '2 jam lalu',
      read: true,
      type: 'report',
      targetPage: '/analytics'
    }
  ]);

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

  const handleNotificationClick = (notification: any) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notification.id 
          ? { ...notif, read: true }
          : notif
      )
    );
    
    const unreadCount = notifications.filter(n => !n.read && n.id !== notification.id).length;
    setNotificationCount(unreadCount);
    
    navigate(notification.targetPage);
    
    toast.success(`Membuka: ${notification.title}`, {
      description: notification.message,
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setNotificationCount(0);
    toast.success('Semua notifikasi telah dibaca');
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task': return '📝';
      case 'alert': return '⚠️';
      case 'report': return '📊';
      default: return '📢';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-cashew-100/50 px-3 sm:px-4 lg:px-6 py-3 lg:py-4 shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleSidebar}
            className="lg:hidden h-10 w-10 text-cashew-600 hover:bg-cashew-100 rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-cashew-400 via-cashew-500 to-cashew-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-cashew-200">
              <span className="text-white font-bold text-sm sm:text-lg">PM</span>
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cashew-700 to-cashew-500 bg-clip-text text-transparent">
              Pemeliharaan Jambu Mete
            </h1>
            <p className="text-xs sm:text-sm text-cashew-600 font-medium hidden lg:block">Sistem Manajemen Kebun Modern</p>
          </div>
        </div>
        
        {/* Center Section - Search (Hidden on mobile) */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md lg:max-w-xl mx-4 lg:mx-6 hidden sm:block">
          <div className="relative group">
            <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-cashew-400 h-4 w-4 lg:h-5 lg:w-5 group-focus-within:text-cashew-600 transition-colors" />
            <Input 
              placeholder="Cari pohon, tugas..." 
              className="pl-10 lg:pl-12 pr-4 py-2 lg:py-3 bg-cashew-50/80 backdrop-blur-sm border-cashew-200 focus-visible:ring-2 focus-visible:ring-cashew-300 focus-visible:border-cashew-400 rounded-xl text-sm lg:text-base placeholder:text-cashew-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* Right Section - Actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-cashew-700 hover:bg-cashew-100 hover:text-cashew-800 h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl transition-all duration-200 hover:shadow-md" 
                title="Notifikasi"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 lg:h-6 lg:w-6 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center animate-pulse shadow-lg">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-0 border-0 shadow-2xl" align="end">
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                <CardHeader className="pb-3 bg-gradient-to-r from-cashew-50 to-cashew-100/50 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base lg:text-lg font-semibold text-cashew-800 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-cashew-600" />
                      Notifikasi
                    </CardTitle>
                    {unreadNotifications.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-cashew-600 hover:text-cashew-800 text-xs lg:text-sm hover:bg-cashew-100 rounded-lg"
                      >
                        Tandai Semua Dibaca
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-80 lg:max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 lg:p-8 text-center text-cashew-500">
                        <Bell className="h-10 w-10 lg:h-12 lg:w-12 mx-auto mb-3 opacity-30" />
                        <p className="font-medium text-sm lg:text-base">Tidak ada notifikasi</p>
                        <p className="text-xs lg:text-sm text-cashew-400 mt-1">Semua pemberitahuan akan muncul di sini</p>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-4 lg:p-5 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-cashew-50 hover:to-cashew-25 border-b border-cashew-50/50 last:border-b-0 group ${
                              !notification.read ? 'bg-gradient-to-r from-cashew-25 to-transparent border-l-4 border-l-cashew-500' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3 lg:space-x-4">
                              <div className="flex-shrink-0 text-xl lg:text-2xl group-hover:scale-110 transition-transform">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-sm font-semibold truncate ${
                                    !notification.read ? 'text-cashew-900' : 'text-cashew-700'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="h-2 w-2 lg:h-3 lg:w-3 bg-gradient-to-r from-cashew-500 to-cashew-600 rounded-full ml-2 flex-shrink-0 animate-pulse shadow-sm"></div>
                                  )}
                                </div>
                                <p className={`text-xs lg:text-sm mt-1 line-clamp-2 ${
                                  !notification.read ? 'text-cashew-700' : 'text-cashew-500'
                                }`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-cashew-400 mt-2 font-medium">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          
          {/* Settings - Hidden on small mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex text-cashew-700 hover:bg-cashew-100 hover:text-cashew-800 h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-xl transition-all duration-200 hover:shadow-md" 
            title="Pengaturan" 
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </Button>
          
          {/* User Profile */}
          <div className="relative group">
            <button className="flex items-center gap-2 lg:gap-3 py-1 lg:py-2 px-2 lg:px-4 rounded-xl hover:bg-cashew-100 transition-all duration-200 hover:shadow-md">
              <div className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 bg-gradient-to-br from-cashew-200 via-cashew-300 to-cashew-400 rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
                <span className="font-bold text-xs sm:text-sm text-cashew-800">{getUserInitials()}</span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-cashew-800 truncate max-w-24 lg:max-w-32">{user?.name || 'Pengguna'}</div>
                <div className="text-xs text-cashew-500 truncate max-w-24 lg:max-w-32">{user?.email}</div>
              </div>
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4 text-cashew-600 hidden md:block group-hover:rotate-180 transition-transform duration-200" />
            </button>
            
            <div className="absolute right-0 mt-2 w-56 lg:w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-2 z-20 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 border border-cashew-100">
              <div className="px-4 py-3 text-sm text-cashew-700 border-b border-cashew-100 bg-gradient-to-r from-cashew-50/50 to-transparent">
                <div className="font-semibold truncate">{user?.name || 'Pengguna'}</div>
                <div className="text-cashew-500 truncate text-xs">{user?.email}</div>
              </div>
              <button 
                onClick={() => navigate('/settings')}
                className="flex items-center w-full px-4 py-3 text-sm text-left text-cashew-700 hover:bg-gradient-to-r hover:from-cashew-50 hover:to-cashew-25 hover:text-cashew-800 transition-all duration-200 group/item sm:hidden"
              >
                <Settings className="mr-3 h-4 w-4 group-hover/item:text-cashew-600" />
                Pengaturan
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm text-left text-cashew-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-25 hover:text-red-700 transition-all duration-200 group/item"
              >
                <LogOut className="mr-3 h-4 w-4 group-hover/item:text-red-600" />
                Keluar dari Akun
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <form onSubmit={handleSearch} className="mt-3 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cashew-400 h-4 w-4" />
          <Input 
            placeholder="Cari pohon, tugas, atau laporan..." 
            className="pl-10 pr-4 py-2 bg-cashew-50/80 backdrop-blur-sm border-cashew-200 focus-visible:ring-2 focus-visible:ring-cashew-300 focus-visible:border-cashew-400 rounded-xl text-sm placeholder:text-cashew-500 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
    </header>
  );
};

export default AppHeader;
