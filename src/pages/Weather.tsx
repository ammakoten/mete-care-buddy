
import React from 'react';
import WeatherWidget from '@/components/WeatherWidget';

const Weather = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Prakiraan Cuaca</h1>
        <p className="text-muted-foreground">Prakiraan cuaca 5 hari untuk perencanaan pemeliharaan optimal</p>
      </div>
      
      <WeatherWidget />
    </div>
  );
};

export default Weather;
