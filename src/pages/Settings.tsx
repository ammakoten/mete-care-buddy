
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Bell, Shield, Languages, HelpCircle, Save, Mail, Lock } from 'lucide-react';
import LanguageSettings from '@/components/LanguageSettings';
import HelpSupport from '@/components/HelpSupport';

const Settings = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    maintenance: true,
    weather: false
  });

  // Set active tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

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
    <div className="min-h-screen bg-gradient-to-br from-cashew-25 via-white to-cashew-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-cashew-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-cashew-800">Pengaturan</h1>
            <p className="mt-2 text-sm text-cashew-600">
              Kelola akun dan preferensi aplikasi Anda
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-72">
            <Card className="shadow-lg border-cashew-200 bg-white/90 backdrop-blur-sm sticky top-8">
              <CardHeader className="pb-4 border-b border-cashew-100">
                <h3 className="text-lg font-semibold text-cashew-800">Menu Pengaturan</h3>
              </CardHeader>
              <CardContent className="p-0">
                <TabsList className="flex flex-col h-auto w-full bg-transparent p-2 space-y-1">
                  <TabsTrigger 
                    value="profile" 
                    className="w-full justify-start px-4 py-3 text-left text-sm data-[state=active]:bg-cashew-100 data-[state=active]:text-cashew-800 data-[state=active]:border-cashew-300 rounded-lg border border-transparent hover:bg-cashew-50 transition-all"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Informasi Profil
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications"
                    className="w-full justify-start px-4 py-3 text-left text-sm data-[state=active]:bg-cashew-100 data-[state=active]:text-cashew-800 data-[state=active]:border-cashew-300 rounded-lg border border-transparent hover:bg-cashew-50 transition-all"
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    Notifikasi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security"
                    className="w-full justify-start px-4 py-3 text-left text-sm data-[state=active]:bg-cashew-100 data-[state=active]:text-cashew-800 data-[state=active]:border-cashew-300 rounded-lg border border-transparent hover:bg-cashew-50 transition-all"
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Keamanan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="language"
                    className="w-full justify-start px-4 py-3 text-left text-sm data-[state=active]:bg-cashew-100 data-[state=active]:text-cashew-800 data-[state=active]:border-cashew-300 rounded-lg border border-transparent hover:bg-cashew-50 transition-all"
                  >
                    <Languages className="h-4 w-4 mr-3" />
                    Bahasa
                  </TabsTrigger>
                  <Separator className="my-2" />
                  <TabsTrigger 
                    value="help"
                    className="w-full justify-start px-4 py-3 text-left text-sm data-[state=active]:bg-cashew-100 data-[state=active]:text-cashew-800 data-[state=active]:border-cashew-300 rounded-lg border border-transparent hover:bg-cashew-50 transition-all"
                  >
                    <HelpCircle className="h-4 w-4 mr-3" />
                    Bantuan & Dukungan
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-0">
              <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm">
                <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-cashew-500 to-cashew-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">
                        {name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-xl text-cashew-800">
                        Informasi Profil
                      </CardTitle>
                      <p className="text-sm text-cashew-600 mt-1">
                        Perbarui informasi profil dan alamat email Anda
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleProfileSave} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-cashew-700">
                          Nama Lengkap
                        </Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="border-cashew-200 focus:border-cashew-400 focus:ring-cashew-400"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-cashew-700">
                          Alamat Email
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="border-cashew-200 focus:border-cashew-400 focus:ring-cashew-400"
                          placeholder="Masukkan alamat email"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-cashew-100">
                      <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700 px-8 py-2 shadow-lg">
                        <Save className="h-4 w-4 mr-2" />
                        Simpan Perubahan
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-0">
              <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm">
                <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
                  <CardTitle className="text-xl text-cashew-800 flex items-center">
                    <Bell className="h-5 w-5 mr-3 text-cashew-600" />
                    Pengaturan Notifikasi
                  </CardTitle>
                  <p className="text-sm text-cashew-600 mt-1">
                    Kelola preferensi notifikasi Anda
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {[
                      {
                        key: 'email',
                        title: 'Notifikasi Email',
                        description: 'Terima pemberitahuan penting melalui email',
                        icon: Mail
                      },
                      {
                        key: 'app',
                        title: 'Notifikasi Aplikasi', 
                        description: 'Terima notifikasi push dalam aplikasi',
                        icon: Bell
                      },
                      {
                        key: 'maintenance',
                        title: 'Pengingat Pemeliharaan',
                        description: 'Notifikasi untuk jadwal pemeliharaan pohon',
                        icon: Bell
                      },
                      {
                        key: 'weather',
                        title: 'Peringatan Cuaca',
                        description: 'Notifikasi kondisi cuaca yang mempengaruhi tanaman',
                        icon: Bell
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-cashew-200 rounded-lg hover:bg-cashew-25 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-cashew-100 rounded-lg">
                            <item.icon className="h-5 w-5 text-cashew-600" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-cashew-800">
                              {item.title}
                            </Label>
                            <p className="text-sm text-cashew-600 mt-1">{item.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications[item.key as keyof typeof notifications]} 
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, [item.key]: checked})
                          } 
                        />
                      </div>
                    ))}
                    <div className="flex justify-end pt-4 border-t border-cashew-100">
                      <Button 
                        onClick={handleNotificationsUpdate} 
                        className="bg-cashew-600 hover:bg-cashew-700 px-8 py-2 shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Simpan Pengaturan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-0">
              <Card className="shadow-lg border-cashew-200 bg-white/95 backdrop-blur-sm">
                <CardHeader className="border-b border-cashew-100 bg-gradient-to-r from-cashew-50 to-white">
                  <CardTitle className="text-xl text-cashew-800 flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-cashew-600" />
                    Keamanan Akun
                  </CardTitle>
                  <p className="text-sm text-cashew-600 mt-1">
                    Kelola keamanan dan kata sandi akun Anda
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="border border-cashew-200 rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-cashew-100 rounded-lg">
                          <Lock className="h-6 w-6 text-cashew-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-cashew-800">
                            Ubah Kata Sandi
                          </h4>
                          <p className="text-sm text-cashew-600 mt-1">
                            Untuk keamanan akun Anda, kami akan mengirimkan tautan reset kata sandi ke email terdaftar
                          </p>
                          <div className="mt-4">
                            <Button 
                              onClick={handlePasswordReset}
                              variant="outline" 
                              className="border-cashew-300 hover:bg-cashew-50 text-cashew-700"
                            >
                              Kirim Tautan Reset
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
                      <h4 className="text-lg font-medium text-amber-800 mb-3">Tips Keamanan</h4>
                      <ul className="text-sm text-amber-700 space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Gunakan kata sandi yang kuat dan unik
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Jangan berbagi informasi login dengan orang lain
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Selalu logout setelah menggunakan perangkat umum
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Language Tab */}
            <TabsContent value="language" className="mt-0">
              <LanguageSettings />
            </TabsContent>

            {/* Help Tab */}
            <TabsContent value="help" className="mt-0">
              <HelpSupport />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
