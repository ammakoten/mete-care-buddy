
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Bell, Shield, Settings as SettingsIcon } from 'lucide-react';
import LanguageSettings from '@/components/LanguageSettings';
import HelpSupport from '@/components/HelpSupport';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    maintenance: true,
    weather: false
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profil berhasil diperbarui');
  };

  const handleNotificationsUpdate = () => {
    toast.success('Pengaturan notifikasi berhasil diperbarui');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Tautan reset kata sandi telah dikirim ke email Anda');
  };

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'language', label: 'Bahasa', icon: LanguageSettings },
    { id: 'help', label: 'Bantuan', icon: HelpSupport }
  ];

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola akun dan preferensi Anda</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <Card className="shadow-sm border-cashew-200 overflow-hidden">
            <div className="bg-gradient-to-r from-cashew-500 to-cashew-600 h-24"></div>
            <div className="px-6 pb-6 relative">
              <div className="h-20 w-20 bg-white rounded-full border-4 border-white absolute -mt-10 flex items-center justify-center shadow-sm">
                <span className="text-cashew-700 font-bold text-2xl">{name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="ml-24 pt-3">
                <h2 className="text-xl font-bold text-cashew-800">{name || 'Pengguna'}</h2>
                <p className="text-cashew-600">{email}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Sidebar navigation */}
        <div className="md:col-span-1">
          <Card className="shadow-sm border-cashew-200 sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <SettingsIcon className="mr-2 h-5 w-5" />
                Menu Pengaturan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center px-6 py-3 text-left hover:bg-cashew-50 transition-colors border-l-4 ${
                        isActive 
                          ? 'border-cashew-500 bg-cashew-50 text-cashew-800 font-medium' 
                          : 'border-transparent text-cashew-700 hover:border-cashew-200'
                      }`}
                    >
                      <IconComponent className="mr-3 h-5 w-5 text-cashew-600" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main settings content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card id="profile" className="shadow-sm border-cashew-200">
            <CardHeader className="pb-3 border-b border-cashew-100">
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-cashew-600" />
                Profil Pengguna
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-cashew-700">Nama</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="border-cashew-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cashew-700">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="border-cashew-200"
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700">
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Notification Settings */}
          <Card id="notifications" className="shadow-sm border-cashew-200">
            <CardHeader className="pb-3 border-b border-cashew-100">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-cashew-600" />
                Pengaturan Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium text-cashew-800">
                      Notifikasi Email
                    </Label>
                    <p className="text-sm text-cashew-500">
                      Terima notifikasi melalui email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, email: checked});
                    }} 
                  />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="app-notifications" className="font-medium text-cashew-800">
                      Notifikasi Aplikasi
                    </Label>
                    <p className="text-sm text-cashew-500">
                      Terima notifikasi dalam aplikasi
                    </p>
                  </div>
                  <Switch 
                    id="app-notifications" 
                    checked={notifications.app} 
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, app: checked});
                    }} 
                  />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-alerts" className="font-medium text-cashew-800">
                      Pengingat Pemeliharaan
                    </Label>
                    <p className="text-sm text-cashew-500">
                      Notifikasi untuk tugas pemeliharaan yang akan datang
                    </p>
                  </div>
                  <Switch 
                    id="maintenance-alerts" 
                    checked={notifications.maintenance} 
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, maintenance: checked});
                    }} 
                  />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weather-alerts" className="font-medium text-cashew-800">
                      Peringatan Cuaca
                    </Label>
                    <p className="text-sm text-cashew-500">
                      Notifikasi untuk perubahan cuaca yang signifikan
                    </p>
                  </div>
                  <Switch 
                    id="weather-alerts" 
                    checked={notifications.weather} 
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, weather: checked});
                    }}
                  />
                </div>
              </div>
              <div>
                <Button 
                  onClick={handleNotificationsUpdate} 
                  className="bg-cashew-600 hover:bg-cashew-700"
                >
                  Simpan Pengaturan
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Security Settings */}
          <Card id="security" className="shadow-sm border-cashew-200">
            <CardHeader className="pb-3 border-b border-cashew-100">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-cashew-600" />
                Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-cashew-800">Ubah Kata Sandi</h3>
                  <p className="text-sm text-cashew-500">
                    Kami akan mengirimkan tautan reset kata sandi ke email Anda
                  </p>
                </div>
                <Button type="submit" variant="outline" className="border-cashew-300">
                  Kirim Tautan Reset Kata Sandi
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <LanguageSettings />

          {/* Help Support */}
          <HelpSupport />
        </div>
      </div>
    </div>
  );
};

export default Settings;
