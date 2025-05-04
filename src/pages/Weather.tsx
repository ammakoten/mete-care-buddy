
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RefreshCw, Map } from 'lucide-react';
import WeatherWidget from '@/components/WeatherWidget';

const Weather = () => {
  const [location, setLocation] = useState('');

  const handleRefresh = () => {
    toast.success('Data cuaca diperbarui');
  };

  const handleChangeLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      toast.success(`Menampilkan prakiraan cuaca untuk: ${location}`);
    } else {
      toast.error('Masukkan nama lokasi');
    }
  };

  const handleViewMap = () => {
    toast.info('Fitur peta akan segera tersedia');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cashew-800 mb-2">Prakiraan Cuaca</h1>
          <p className="text-muted-foreground">Prakiraan cuaca 5 hari untuk perencanaan pemeliharaan optimal</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleChangeLocation} className="flex gap-2">
            <Input 
              placeholder="Ganti lokasi..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="bg-cashew-600 hover:bg-cashew-700">
              Tampilkan
            </Button>
          </form>
          <Button onClick={handleRefresh} variant="outline" className="flex items-center">
            <RefreshCw className="mr-1 h-4 w-4" /> Perbarui
          </Button>
          <Button onClick={handleViewMap} variant="outline" className="flex items-center">
            <Map className="mr-1 h-4 w-4" /> Lihat Peta
          </Button>
        </div>
      </div>
      
      <WeatherWidget />
    </div>
  );
};

export default Weather;
