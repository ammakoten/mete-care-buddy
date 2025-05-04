
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { weatherForecast } from '@/data/mockData';
import { CloudSun, CloudRain, Sun, Cloud } from 'lucide-react';

const getWeatherIcon = (condition: string) => {
  switch(condition) {
    case 'sunny': return <Sun className="h-10 w-10 text-amber-400" />;
    case 'cloudy': return <Cloud className="h-10 w-10 text-gray-400" />;
    case 'rainy': return <CloudRain className="h-10 w-10 text-blue-400" />;
    case 'stormy': return <CloudRain className="h-10 w-10 text-gray-600" />;
    default: return <CloudSun className="h-10 w-10 text-amber-400" />;
  }
};

const WeatherWidget = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cashew-800">Weather Forecast</h2>
        <p className="text-muted-foreground">5-day weather forecast for your plantation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {weatherForecast.map((day, index) => (
          <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-lg">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-3xl font-bold mb-2">{day.temperature}°C</div>
              <div className="text-sm capitalize text-muted-foreground">{day.condition}</div>
              
              <div className="mt-4 pt-3 border-t flex justify-between text-sm text-muted-foreground">
                <div>
                  <div>Humidity</div>
                  <div className="font-medium text-foreground">{day.humidity}%</div>
                </div>
                <div>
                  <div>Rainfall</div>
                  <div className="font-medium text-foreground">{day.rainfall} mm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Watering Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Based on the forecast, the following watering schedule is recommended:</p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>May 5-6: Normal watering schedule (sunny days)</li>
                <li>May 7: Reduce watering by 25% (cloudy day)</li>
                <li>May 8-9: No additional watering needed (rainy days)</li>
              </ul>
              
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-800 mt-4">
                <p className="font-medium">Irrigation Note</p>
                <p className="text-sm mt-1">Adjust irrigation system to account for expected rainfall. Consider mulching around trees to retain moisture during the upcoming rainy period.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherWidget;
