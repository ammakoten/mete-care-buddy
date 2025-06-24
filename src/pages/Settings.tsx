
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Bell, Shield, Languages, HelpCircle } from 'lucide-react';
import LanguageSettings from '@/components/LanguageSettings';
import HelpSupport from '@/components/HelpSupport';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cashew-50 to-white p-4 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-cashew-800 mb-2">Pengaturan</h1>
          <p className="text-cashew-600 text-lg">Kelola akun dan preferensi Anda dengan mudah</p>
        </div>

        {/* User Profile Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-cashew-500 to-cashew-600 text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-cashew-700 font-bold text-3xl">{name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{name || 'Pengguna'}</h2>
                <p className="text-cashew-100 text-lg">{email}</p>
                <div className="mt-2 px-3 py-1 bg-white/20 rounded-full text-sm w-fit">
                  Akun Aktif
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border border-cashew-200 p-1">
            <TabsTrigger 
              value="profile" 
              className="flex items-center space-x-2 data-[state=active]:bg-cashew-500 data-[state=active]:text-white"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="flex items-center space-x-2 data-[state=active]:bg-cashew-500 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="flex items-center space-x-2 data-[state=active]:bg-cashew-500 data-[state=active]:text-white"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Keamanan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="language"
              className="flex items-center space-x-2 data-[state=active]:bg-cashew-500 data-[state=active]:text-white"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">Bahasa</span>
            </TabsTrigger>
            <TabsTrigger 
              value="help"
              className="flex items-center space-x-2 data-[state=active]:bg-cashew-500 data-[state=active]:text-white"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Bantuan</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg border-cashew-200">
              <CardHeader className="bg-gradient-to-r from-cashew-50 to-cashew-100 border-b border-cashew-200">
                <CardTitle className="flex items-center text-cashew-800">
                  <User className="mr-3 h-6 w-6 text-cashew-600" />
                  Informasi Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleProfileSave} className="space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-cashew-700 font-medium text-base">Nama Lengkap</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border-cashew-200 h-12 text-base"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-cashew-700 font-medium text-base">Alamat Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border-cashew-200 h-12 text-base"
                        placeholder="Masukkan alamat email"
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700 h-12 px-8 text-base">
                      Simpan Perubahan Profil
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="shadow-lg border-cashew-200">
              <CardHeader className="bg-gradient-to-r from-cashew-50 to-cashew-100 border-b border-cashew-200">
                <CardTitle className="flex items-center text-cashew-800">
                  <Bell className="mr-3 h-6 w-6 text-cashew-600" />
                  Pengaturan Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-cashew-50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium text-cashew-800 text-base">Notifikasi Email</Label>
                      <p className="text-sm text-cashew-600">Terima pemberitahuan penting melalui email</p>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-cashew-50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium text-cashew-800 text-base">Notifikasi Aplikasi</Label>
                      <p className="text-sm text-cashew-600">Terima notifikasi push dalam aplikasi</p>
                    </div>
                    <Switch 
                      checked={notifications.app} 
                      onCheckedChange={(checked) => setNotifications({...notifications, app: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-cashew-50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium text-cashew-800 text-base">Pengingat Pemeliharaan</Label>
                      <p className="text-sm text-cashew-600">Notifikasi untuk jadwal pemeliharaan pohon</p>
                    </div>
                    <Switch 
                      checked={notifications.maintenance} 
                      onCheckedChange={(checked) => setNotifications({...notifications, maintenance: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-cashew-50 rounded-lg">
                    <div className="space-y-1">
                      <Label className="font-medium text-cashew-800 text-base">Peringatan Cuaca</Label>
                      <p className="text-sm text-cashew-600">Notifikasi kondisi cuaca yang mempengaruhi tanaman</p>
                    </div>
                    <Switch 
                      checked={notifications.weather} 
                      onCheckedChange={(checked) => setNotifications({...notifications, weather: checked})}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleNotificationsUpdate} 
                    className="bg-cashew-600 hover:bg-cashew-700 h-12 px-8 text-base"
                  >
                    Simpan Pengaturan Notifikasi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="shadow-lg border-cashew-200">
              <CardHeader className="bg-gradient-to-r from-cashew-50 to-cashew-100 border-b border-cashew-200">
                <CardTitle className="flex items-center text-cashew-800">
                  <Shield className="mr-3 h-6 w-6 text-cashew-600" />
                  Pengaturan Keamanan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="bg-cashew-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-cashew-800 mb-3">Ubah Kata Sandi</h3>
                    <p className="text-cashew-600 mb-6">
                      Untuk keamanan akun Anda, kami akan mengirimkan tautan reset kata sandi ke email terdaftar
                    </p>
                    <form onSubmit={handlePasswordReset}>
                      <Button 
                        type="submit" 
                        variant="outline" 
                        className="border-cashew-300 hover:bg-cashew-50 h-12 px-8 text-base"
                      >
                        Kirim Tautan Reset Kata Sandi
                      </Button>
                    </form>
                  </div>
                  
                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">Tips Keamanan</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Gunakan kata sandi yang kuat dan unik</li>
                      <li>• Jangan berbagi informasi login dengan orang lain</li>
                      <li>• Selalu logout setelah menggunakan perangkat umum</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Tab */}
          <TabsContent value="language">
            <LanguageSettings />
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help">
            <HelpSupport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
