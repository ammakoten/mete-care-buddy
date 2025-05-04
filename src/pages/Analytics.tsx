
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { trees } from '@/data/mockData';

const ageData = [
  { age: '0-2 years', count: trees.filter(t => t.age >= 0 && t.age <= 2).length },
  { age: '3-5 years', count: trees.filter(t => t.age >= 3 && t.age <= 5).length },
  { age: '6-8 years', count: trees.filter(t => t.age >= 6 && t.age <= 8).length },
  { age: '9+ years', count: trees.filter(t => t.age >= 9).length },
];

const varietyData = Array.from(
  new Set(trees.map(t => t.variety))
).map(variety => ({
  variety,
  count: trees.filter(t => t.variety === variety).length
}));

const healthData = [
  { status: 'Healthy', count: trees.filter(t => t.health === 'healthy').length },
  { status: 'Needs Attention', count: trees.filter(t => t.health === 'needs-attention').length },
  { status: 'Critical', count: trees.filter(t => t.health === 'critical').length },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cashew-800 mb-2">Analytics</h1>
        <p className="text-muted-foreground">Statistics and insights about your cashew plantation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tree Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#94a544" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tree Variety Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={varietyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="variety" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#c7d589" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tree Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#57652f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Annual Productivity Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Historical production data and projections for the current season</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { year: '2022', actual: 520, projected: 0 },
                { year: '2023', actual: 680, projected: 0 },
                { year: '2024', actual: 750, projected: 0 },
                { year: '2025', actual: 300, projected: 820 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="actual" fill="#57652f" name="Actual Yield (kg)" />
                <Bar dataKey="projected" fill="#c7d589" name="Projected Yield (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
