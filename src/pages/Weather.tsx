
import React from 'react';
import WeatherWidget from '@/components/WeatherWidget';

const Weather = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Weather Forecast</h1>
        <p className="text-muted-foreground">5-day weather forecast for planning optimal maintenance</p>
      </div>
      
      <WeatherWidget />
    </div>
  );
};

export default Weather;
