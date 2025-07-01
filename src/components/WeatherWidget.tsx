
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, CloudRain, Sun, Cloud } from 'lucide-react';
import { useWeatherContext } from '@/contexts/WeatherContext';

const getWeatherIcon = (condition: string) => {
  if (condition.includes('Cerah') && !condition.includes('Berawan')) {
    return <Sun className="h-10 w-10 text-amber-400" />;
  }
  if (condition.includes('Hujan')) {
    return <CloudRain className="h-10 w-10 text-blue-400" />;
  }
  if (condition.includes('Berawan')) {
    return <Cloud className="h-10 w-10 text-gray-400" />;
  }
  if (condition === 'Terik') {
    return <Sun className="h-10 w-10 text-orange-500" />;
  }
  return <CloudSun className="h-10 w-10 text-amber-400" />;
};

const WeatherWidget = () => {
  const { weatherData } = useWeatherContext();

  const getIrrigationRecommendation = () => {
    const recommendations = [];
    
    weatherData.forecast.forEach((day, index) => {
      const date = new Date(day.date);
      const dateStr = date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short' 
      });
      
      if (day.condition.includes('Hujan')) {
        recommendations.push(`${dateStr}: Tidak perlu penyiraman (hari hujan)`);
      } else if (day.condition.includes('Cerah') && day.temp > 30) {
        recommendations.push(`${dateStr}: Tingkatkan penyiraman 30% (cuaca panas)`);
      } else if (day.condition.includes('Berawan')) {
        recommendations.push(`${dateStr}: Kurangi penyiraman 20% (cuaca berawan)`);
      } else {
        recommendations.push(`${dateStr}: Penyiraman normal`);
      }
    });
    
    return recommendations;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cashew-800">Prakiraan Cuaca</h2>
        <p className="text-muted-foreground">Prakiraan cuaca 5 hari untuk kebun Anda</p>
        <p className="text-sm text-cashew-600 mt-1">
          Data diperbarui otomatis setiap hari
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {weatherData.forecast.map((day, index) => (
          <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-lg">
                {new Date(day.date).toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: 'numeric' })}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-3xl font-bold mb-2">{day.temp}°C</div>
              <div className="text-sm capitalize text-muted-foreground">{day.condition}</div>
              
              <div className="mt-4 pt-3 border-t flex justify-between text-sm text-muted-foreground">
                <div>
                  <div>Kelembaban</div>
                  <div className="font-medium text-foreground">{day.humidity}%</div>
                </div>
                <div>
                  <div>Prediksi</div>
                  <div className="font-medium text-foreground">
                    {day.condition.includes('Hujan') ? 'Hujan' : 'Kering'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Rekomendasi Penyiraman Otomatis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Berdasarkan prakiraan cuaca yang diperbarui otomatis:</p>
              
              <ul className="list-disc pl-5 space-y-2">
                {getIrrigationRecommendation().map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
              
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-800 mt-4">
                <p className="font-medium">Catatan Sistem Irigasi</p>
                <p className="text-sm mt-1">
                  Sistem akan menyesuaikan jadwal penyiraman secara otomatis berdasarkan prediksi cuaca. 
                  Cuaca diperbarui setiap hari untuk memberikan rekomendasi yang akurat.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherWidget;
