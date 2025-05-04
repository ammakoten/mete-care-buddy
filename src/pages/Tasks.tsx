
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Filter, Calendar, Search as SearchIcon, Bell, BellOff, MessageCircle } from 'lucide-react';
import MaintenanceTasks from '@/components/MaintenanceTasks';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  // Simulate receiving a notification after component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notificationsEnabled) {
        toast("Tugas Baru", {
          description: "Ada tugas pemeliharaan baru yang memerlukan perhatian Anda",
          icon: <Bell className="text-cashew-600 h-5 w-5" />,
          duration: 5000,
        });
        setHasNewNotifications(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [notificationsEnabled]);

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
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      toast.success("Notifikasi diaktifkan");
    } else {
      toast("Notifikasi dinonaktifkan", {
        icon: <BellOff className="h-4 w-4" />,
      });
    }
    setShowNotificationDialog(false);
  };
  
  const clearNotifications = () => {
    setHasNewNotifications(false);
    toast("Notifikasi dibersihkan", {
      description: "Semua notifikasi telah ditandai sebagai dibaca",
    });
    setShowNotificationDrawer(false);
  };
  
  const sendMessage = () => {
    toast({
      title: "Pesan Terkirim",
      description: "Pesan telah berhasil dikirim ke tim",
      icon: <MessageCircle className="h-4 w-4" />,
    });
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
          
          <Button 
            onClick={() => setShowNotificationDrawer(true)} 
            variant="outline"
            className="relative"
          >
            <Bell className="mr-1 h-4 w-4" /> Notifikasi
            {hasNewNotifications && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            )}
          </Button>
          
          <Button onClick={handleAddTask} className="bg-cashew-600 hover:bg-cashew-700">
            <Plus className="mr-1 h-4 w-4" /> Tambah Tugas
          </Button>
        </div>
      </div>
      
      {notificationsEnabled && (
        <Alert className="bg-cashew-50 border-cashew-200">
          <Bell className="h-4 w-4 text-cashew-600" />
          <AlertTitle>Notifikasi Aktif</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>Anda akan menerima notifikasi untuk semua pembaruan tugas.</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-cashew-200" 
              onClick={() => setShowNotificationDialog(true)}
            >
              Pengaturan
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <MaintenanceTasks />
      
      {/* Dialog for notification settings */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pengaturan Notifikasi</DialogTitle>
            <DialogDescription>
              Sesuaikan preferensi notifikasi Anda untuk aplikasi ini.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Aktifkan Notifikasi</Label>
                <p className="text-sm text-muted-foreground">Terima pemberitahuan tentang tugas dan pembaruan</p>
              </div>
              <Switch 
                id="notifications" 
                checked={notificationsEnabled} 
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>Batal</Button>
            <Button onClick={toggleNotifications}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Drawer for notifications list */}
      <Drawer open={showNotificationDrawer} onOpenChange={setShowNotificationDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Notifikasi</DrawerTitle>
            <DrawerDescription>Lihat semua notifikasi terbaru Anda.</DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 py-2">
            <div className="space-y-4">
              <div className="bg-cashew-50 p-3 rounded-lg border border-cashew-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <Bell className="h-5 w-5 text-cashew-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Tugas Baru Ditambahkan</h4>
                      <p className="text-sm text-muted-foreground">Ada tugas pemeliharaan baru yang memerlukan perhatian Anda</p>
                      <p className="text-xs text-muted-foreground mt-1">Baru saja</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 bg-cashew-600 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border border-cashew-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-cashew-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pengingat Tenggat Waktu</h4>
                      <p className="text-sm text-muted-foreground">Tugas "Pemupukan" akan berakhir dalam 2 hari</p>
                      <p className="text-xs text-muted-foreground mt-1">1 jam yang lalu</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border border-cashew-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="h-5 w-5 text-cashew-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Pesan Baru</h4>
                      <p className="text-sm text-muted-foreground">Admin mengirim pesan tentang pemeliharaan pohon</p>
                      <p className="text-xs text-muted-foreground mt-1">Kemarin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="flex-row justify-between">
            <Button variant="outline" onClick={sendMessage}>
              <MessageCircle className="h-4 w-4 mr-2" /> Kirim Pesan
            </Button>
            <Button onClick={clearNotifications}>
              Tandai Semua Dibaca
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Tutup</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Tasks;
