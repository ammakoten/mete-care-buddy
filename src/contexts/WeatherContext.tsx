
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  forecast: {
    date: string;
    temp: number;
    condition: string;
    humidity: number;
  }[];
}

interface WeatherContextType {
  weatherData: WeatherData;
  updateWeather: (location: string) => void;
  getWeatherRecommendations: () => string[];
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

// Fungsi untuk menghasilkan data cuaca berdasarkan tanggal
const generateWeatherForDate = (date: Date) => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Menggunakan seed berdasarkan hari dalam tahun untuk konsistensi
  const seed = dayOfYear * 123456789;
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Simulasi musim (Indonesia memiliki 2 musim utama)
  const isRainySeason = (dayOfYear >= 90 && dayOfYear <= 270); // April - September (musim hujan)
  
  const conditions = isRainySeason 
    ? ['Hujan Ringan', 'Berawan', 'Hujan', 'Cerah Berawan', 'Gerimis']
    : ['Cerah', 'Cerah Berawan', 'Berawan', 'Terik', 'Cerah'];
    
  const baseTemp = isRainySeason ? 26 : 30;
  const tempVariation = random(seed + 1) * 6 - 3; // -3 to +3 variasi
  const temperature = Math.round(baseTemp + tempVariation);
  
  const baseHumidity = isRainySeason ? 80 : 65;
  const humidityVariation = random(seed + 2) * 20 - 10; // -10 to +10 variasi
  const humidity = Math.max(50, Math.min(95, Math.round(baseHumidity + humidityVariation)));
  
  const windSpeed = Math.round(8 + random(seed + 3) * 12); // 8-20 km/h
  
  const conditionIndex = Math.floor(random(seed + 4) * conditions.length);
  const condition = conditions[conditionIndex];
  
  return { temperature, humidity, windSpeed, condition };
};

// Fungsi untuk menghasilkan forecast 5 hari
const generateForecast = (startDate: Date) => {
  const forecast = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const weather = generateWeatherForDate(date);
    forecast.push({
      date: date.toISOString().split('T')[0],
      temp: weather.temperature,
      condition: weather.condition,
      humidity: weather.humidity
    });
  }
  return forecast;
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Kebun Jambu Mete, Indonesia',
    temperature: 28,
    humidity: 72,
    windSpeed: 12,
    condition: 'Cerah Berawan',
    forecast: []
  });

  // Update cuaca setiap kali komponen di-mount dan setiap hari
  useEffect(() => {
    const updateDailyWeather = () => {
      const today = new Date();
      const todayWeather = generateWeatherForDate(today);
      const forecast = generateForecast(today);
      
      setWeatherData(prev => ({
        ...prev,
        temperature: todayWeather.temperature,
        humidity: todayWeather.humidity,
        windSpeed: todayWeather.windSpeed,
        condition: todayWeather.condition,
        forecast: forecast
      }));
    };

    // Update cuaca saat pertama kali load
    updateDailyWeather();

    // Set interval untuk update cuaca setiap menit (untuk testing)
    // Dalam produksi, ini bisa diubah ke setiap hari
    const interval = setInterval(() => {
      updateDailyWeather();
    }, 60000); // Update setiap menit untuk melihat perubahan

    return () => clearInterval(interval);
  }, []);

  const updateWeather = (location: string) => {
    setWeatherData(prev => ({
      ...prev,
      location: location
    }));
  };

  const getWeatherRecommendations = () => {
    const recommendations = [];
    
    if (weatherData.humidity > 80) {
      recommendations.push('Kelembaban tinggi - Perhatikan penyakit jamur pada pohon');
    }
    
    if (weatherData.temperature > 30) {
      recommendations.push('Suhu tinggi - Tambah frekuensi penyiraman');
    }
    
    if (weatherData.windSpeed > 15) {
      recommendations.push('Angin kencang - Periksa kestabilan pohon muda');
    }

    if (weatherData.condition.includes('Hujan')) {
      recommendations.push('Cuaca hujan - Kurangi penyiraman dan periksa drainase');
    }

    if (weatherData.condition === 'Terik') {
      recommendations.push('Cuaca terik - Lindungi pohon muda dari sinar matahari langsung');
    }
    
    return recommendations;
  };

  return (
    <WeatherContext.Provider value={{ 
      weatherData, 
      updateWeather, 
      getWeatherRecommendations
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
