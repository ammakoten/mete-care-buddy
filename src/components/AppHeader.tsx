import React, { useState } from 'react';
import { Bell, LogOut, Search, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AppHeader = () => {
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
    <header className="bg-white/95 backdrop-blur-md border-b border-cashew-100/50 px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 bg-gradient-to-br from-cashew-400 via-cashew-500 to-cashew-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-cashew-200">
              <span className="text-white font-bold text-lg">PM</span>
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cashew-700 to-cashew-500 bg-clip-text text-transparent">
              Pemeliharaan Jambu Mete
            </h1>
            <p className="text-sm text-cashew-600 font-medium">Sistem Manajemen Kebun Modern</p>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cashew-400 h-5 w-5 group-focus-within:text-cashew-600 transition-colors" />
            <Input 
              placeholder="Cari pohon, tugas, atau laporan..." 
              className="pl-12 pr-4 py-3 bg-cashew-50/80 backdrop-blur-sm border-cashew-200 focus-visible:ring-2 focus-visible:ring-cashew-300 focus-visible:border-cashew-400 rounded-xl text-base placeholder:text-cashew-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cashew-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </form>
        
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-cashew-700 hover:bg-cashew-100 hover:text-cashew-800 h-12 w-12 rounded-xl transition-all duration-200 hover:shadow-md" 
                title="Notifikasi"
              >
                <Bell className="h-6 w-6" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center animate-pulse shadow-lg">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 border-0 shadow-2xl" align="end">
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md">
                <CardHeader className="pb-3 bg-gradient-to-r from-cashew-50 to-cashew-100/50 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-cashew-800 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-cashew-600" />
                      Notifikasi
                    </CardTitle>
                    {unreadNotifications.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-cashew-600 hover:text-cashew-800 text-sm hover:bg-cashew-100 rounded-lg"
                      >
                        Tandai Semua Dibaca
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-cashew-500">
                        <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">Tidak ada notifikasi</p>
                        <p className="text-sm text-cashew-400 mt-1">Semua pemberitahuan akan muncul di sini</p>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-5 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-cashew-50 hover:to-cashew-25 border-b border-cashew-50/50 last:border-b-0 group ${
                              !notification.read ? 'bg-gradient-to-r from-cashew-25 to-transparent border-l-4 border-l-cashew-500' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 text-2xl group-hover:scale-110 transition-transform">
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
                                    <div className="h-3 w-3 bg-gradient-to-r from-cashew-500 to-cashew-600 rounded-full ml-2 flex-shrink-0 animate-pulse shadow-sm"></div>
                                  )}
                                </div>
                                <p className={`text-sm mt-1 line-clamp-2 ${
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
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-cashew-700 hover:bg-cashew-100 hover:text-cashew-800 h-12 w-12 rounded-xl transition-all duration-200 hover:shadow-md" 
            title="Pengaturan" 
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-6 w-6" />
          </Button>
          
          <div className="relative group">
            <button className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-cashew-100 transition-all duration-200 hover:shadow-md">
              <div className="h-10 w-10 bg-gradient-to-br from-cashew-200 via-cashew-300 to-cashew-400 rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
                <span className="font-bold text-sm text-cashew-800">{getUserInitials()}</span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-cashew-800">{user?.name || 'Pengguna'}</div>
                <div className="text-xs text-cashew-500 truncate max-w-32">{user?.email}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-cashew-600 hidden sm:block group-hover:rotate-180 transition-transform duration-200" />
            </button>
            
            <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-2 z-20 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 border border-cashew-100">
              <div className="px-4 py-3 text-sm text-cashew-700 border-b border-cashew-100 bg-gradient-to-r from-cashew-50/50 to-transparent">
                <div className="font-semibold">{user?.name || 'Pengguna'}</div>
                <div className="text-cashew-500 truncate">{user?.email}</div>
              </div>
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
    </header>
  );
};

export default AppHeader;
