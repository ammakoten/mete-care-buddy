
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
import { User, Bell, Shield, Languages, HelpCircle, Save, Mail, Lock } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Pengaturan</h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola akun dan preferensi aplikasi Anda
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <nav className="space-y-1">
              <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col lg:flex-row gap-6">
                <TabsList className="lg:flex-col lg:h-auto lg:w-full bg-white border border-gray-200 p-1">
                  <TabsTrigger 
                    value="profile" 
                    className="w-full justify-start px-3 py-2 text-left data-[state=active]:bg-cashew-50 data-[state=active]:text-cashew-700 data-[state=active]:border-cashew-200"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Informasi Profil
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications"
                    className="w-full justify-start px-3 py-2 text-left data-[state=active]:bg-cashew-50 data-[state=active]:text-cashew-700 data-[state=active]:border-cashew-200"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifikasi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security"
                    className="w-full justify-start px-3 py-2 text-left data-[state=active]:bg-cashew-50 data-[state=active]:text-cashew-700 data-[state=active]:border-cashew-200"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Keamanan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="language"
                    className="w-full justify-start px-3 py-2 text-left data-[state=active]:bg-cashew-50 data-[state=active]:text-cashew-700 data-[state=active]:border-cashew-200"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    Bahasa
                  </TabsTrigger>
                  <TabsTrigger 
                    value="help"
                    className="w-full justify-start px-3 py-2 text-left data-[state=active]:bg-cashew-50 data-[state=active]:text-cashew-700 data-[state=active]:border-cashew-200"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Bantuan
                  </TabsTrigger>
                </TabsList>

                {/* Main Content */}
                <div className="lg:col-span-9 space-y-6">
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="mt-0">
                    <Card className="shadow-sm">
                      <CardHeader className="border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg font-medium text-gray-900">
                              Informasi Profil
                            </CardTitle>
                            <p className="mt-1 text-sm text-gray-500">
                              Perbarui informasi profil dan alamat email Anda
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 bg-gradient-to-br from-cashew-500 to-cashew-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-lg">
                                {name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <form onSubmit={handleProfileSave} className="space-y-6">
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nama Lengkap
                              </Label>
                              <div className="mt-1">
                                <Input 
                                  id="name" 
                                  value={name} 
                                  onChange={(e) => setName(e.target.value)} 
                                  className="shadow-sm"
                                  placeholder="Masukkan nama lengkap"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Alamat Email
                              </Label>
                              <div className="mt-1">
                                <Input 
                                  id="email" 
                                  type="email" 
                                  value={email} 
                                  onChange={(e) => setEmail(e.target.value)} 
                                  className="shadow-sm"
                                  placeholder="Masukkan alamat email"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700">
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
                    <Card className="shadow-sm">
                      <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-lg font-medium text-gray-900">
                          Pengaturan Notifikasi
                        </CardTitle>
                        <p className="mt-1 text-sm text-gray-500">
                          Kelola preferensi notifikasi Anda
                        </p>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="space-y-4">
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
                              <div key={item.key} className="flex items-center justify-between py-3">
                                <div className="flex items-start space-x-3">
                                  <item.icon className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <div>
                                    <Label className="text-sm font-medium text-gray-900">
                                      {item.title}
                                    </Label>
                                    <p className="text-sm text-gray-500">{item.description}</p>
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
                          </div>
                          <div className="flex justify-end pt-4 border-t border-gray-200">
                            <Button 
                              onClick={handleNotificationsUpdate} 
                              className="bg-cashew-600 hover:bg-cashew-700"
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
                    <Card className="shadow-sm">
                      <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-lg font-medium text-gray-900">
                          Keamanan Akun
                        </CardTitle>
                        <p className="mt-1 text-sm text-gray-500">
                          Kelola keamanan dan kata sandi akun Anda
                        </p>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <Lock className="h-5 w-5 text-gray-400 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">
                                  Ubah Kata Sandi
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  Untuk keamanan akun Anda, kami akan mengirimkan tautan reset kata sandi ke email terdaftar
                                </p>
                                <div className="mt-4">
                                  <Button 
                                    onClick={handlePasswordReset}
                                    variant="outline" 
                                    className="text-sm"
                                  >
                                    Kirim Tautan Reset
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-amber-800">Tips Keamanan</h4>
                            <ul className="mt-2 text-sm text-amber-700 space-y-1">
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
                  <TabsContent value="language" className="mt-0">
                    <LanguageSettings />
                  </TabsContent>

                  {/* Help Tab */}
                  <TabsContent value="help" className="mt-0">
                    <HelpSupport />
                  </TabsContent>
                </div>
              </Tabs>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Settings;
