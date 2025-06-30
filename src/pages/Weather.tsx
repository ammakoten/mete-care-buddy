
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RefreshCw, Map, CloudSun, Droplets, Wind, Eye, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WeatherWidget from '@/components/WeatherWidget';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useWeatherContext } from '@/contexts/WeatherContext';
import { useTreeContext } from '@/contexts/TreeContext';

const Weather = () => {
  const [location, setLocation] = useState('');
  const { weatherData, updateWeather, getWeatherRecommendations } = useWeatherContext();
  const { trees } = useTreeContext();
  
  const recommendations = getWeatherRecommendations();

  const handleRefresh = () => {
    toast.success('Data cuaca diperbarui');
  };

  const handleChangeLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      updateWeather(location);
      toast.success(`Menampilkan prakiraan cuaca untuk: ${location}`);
    } else {
      toast.error('Masukkan nama lokasi');
    }
  };

  const handleViewMap = () => {
    toast.info('Fitur peta akan segera tersedia');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cashew-50 to-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-cashew-800 mb-2">Prakiraan Cuaca</h1>
              <p className="text-lg text-muted-foreground">
                Prakiraan cuaca 5 hari untuk perencanaan pemeliharaan optimal
              </p>
              <p className="text-sm text-cashew-600 mt-2">
                Lokasi: {weatherData.location} | {trees.length} pohon terpantau
              </p>
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
        </div>
      </div>

      {/* Weather Recommendations Alert */}
      {recommendations.length > 0 && (
        <Alert className="bg-amber-50 border-amber-200 mb-8">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Rekomendasi Berdasarkan Cuaca</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm">• {rec}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Current Weather Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <CloudSun className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suhu Saat Ini</p>
                <p className="text-2xl font-bold text-amber-600">{weatherData.temperature}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kelembaban</p>
                <p className="text-2xl font-bold text-blue-600">{weatherData.humidity}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Wind className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kecepatan Angin</p>
                <p className="text-2xl font-bold text-green-600">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cashew-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kondisi</p>
                <p className="text-lg font-bold text-purple-600">{weatherData.condition}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Weather Widget Section */}
      <div className="bg-white rounded-lg shadow-sm border border-cashew-100 p-6">
        <h2 className="text-2xl font-semibold text-cashew-800 mb-6 flex items-center">
          <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
          Prakiraan Cuaca 5 Hari
        </h2>
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Weather;
