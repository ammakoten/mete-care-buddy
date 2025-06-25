import React, { useState } from 'react';
import { Bell, LogOut, Search, Settings, ChevronDown } from 'lucide-react';
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
    // Mark notification as read
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notification.id 
          ? { ...notif, read: true }
          : notif
      )
    );
    
    // Update notification count
    const unreadCount = notifications.filter(n => !n.read && n.id !== notification.id).length;
    setNotificationCount(unreadCount);
    
    // Navigate to the target page
    navigate(notification.targetPage);
    
    // Show success toast with notification details
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-cashew-700 hover:bg-cashew-50 hover:text-cashew-800 relative" title="Notifikasi">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-500 flex items-center justify-center">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-cashew-800">
                      Notifikasi
                    </CardTitle>
                    {unreadNotifications.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-cashew-600 hover:text-cashew-800 text-sm"
                      >
                        Tandai Semua Dibaca
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-cashew-500">
                        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Tidak ada notifikasi</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-4 cursor-pointer transition-colors hover:bg-cashew-50 border-b border-cashew-50 last:border-b-0 ${
                              !notification.read ? 'bg-cashew-25 border-l-4 border-l-cashew-500' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 text-lg">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-sm font-medium truncate ${
                                    !notification.read ? 'text-cashew-900' : 'text-cashew-700'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="h-2 w-2 bg-cashew-500 rounded-full ml-2 flex-shrink-0"></div>
                                  )}
                                </div>
                                <p className={`text-sm mt-1 ${
                                  !notification.read ? 'text-cashew-700' : 'text-cashew-500'
                                }`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-cashew-400 mt-2">
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
