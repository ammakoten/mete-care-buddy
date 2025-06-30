
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Kebun Jambu Mete, Indonesia',
    temperature: 28,
    humidity: 72,
    windSpeed: 12,
    condition: 'Cerah Berawan',
    forecast: [
      { date: '2024-01-01', temp: 29, condition: 'Cerah', humidity: 68 },
      { date: '2024-01-02', temp: 27, condition: 'Hujan Ringan', humidity: 85 },
      { date: '2024-01-03', temp: 30, condition: 'Cerah', humidity: 65 },
      { date: '2024-01-04', temp: 28, condition: 'Berawan', humidity: 75 },
      { date: '2024-01-05', temp: 26, condition: 'Hujan', humidity: 90 }
    ]
  });

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
