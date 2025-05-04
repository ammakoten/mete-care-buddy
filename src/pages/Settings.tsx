
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
    // In a real app, you would send an API request to update the user's profile
    toast.success('Profil berhasil diperbarui');
  };

  const handleNotificationsUpdate = () => {
    // In a real app, you would send an API request to update notification settings
    toast.success('Pengaturan notifikasi berhasil diperbarui');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would trigger a password reset flow
    toast.success('Tautan reset kata sandi telah dikirim ke email Anda');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola akun dan preferensi Anda</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700">
                Simpan Perubahan
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Notifikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">
                  Notifikasi Email
                </Label>
                <p className="text-sm text-muted-foreground">
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
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="app-notifications" className="font-medium">
                  Notifikasi Aplikasi
                </Label>
                <p className="text-sm text-muted-foreground">
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
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-alerts" className="font-medium">
                  Pengingat Pemeliharaan
                </Label>
                <p className="text-sm text-muted-foreground">
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
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weather-alerts" className="font-medium">
                  Peringatan Cuaca
                </Label>
                <p className="text-sm text-muted-foreground">
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
            <Button 
              onClick={handleNotificationsUpdate} 
              className="mt-4 bg-cashew-600 hover:bg-cashew-700"
            >
              Simpan Pengaturan
            </Button>
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Keamanan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Ubah Kata Sandi</h3>
                <p className="text-sm text-muted-foreground">
                  Kami akan mengirimkan tautan reset kata sandi ke email Anda
                </p>
              </div>
              <Button type="submit" variant="outline">
                Kirim Tautan Reset Kata Sandi
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
