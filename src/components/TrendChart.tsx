
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const TrendChart = () => {
  const adherenceData = [
    { month: 'Jan', diabetes: 87, hypertension: 84, cholesterol: 83 },
    { month: 'Feb', diabetes: 85, hypertension: 85, cholesterol: 81 },
    { month: 'Mar', diabetes: 76, hypertension: 85, cholesterol: 72 },
  ];

  const costData = [
    { month: 'Jan', total: 285, diabetes: 95, pharmacy: 120, medical: 70 },
    { month: 'Feb', total: 298, diabetes: 102, pharmacy: 125, medical: 71 },
    { month: 'Mar', total: 342, diabetes: 123, pharmacy: 145, medical: 74 },
  ];

  const screeningData = [
    { category: 'Mammogram', q4: 85, q1: 89 },
    { category: 'Colorectal', q4: 77, q1: 82 },
    { category: 'Diabetic Eye', q4: 65, q1: 68 },
    { category: 'Wellness Visit', q4: 72, q1: 75 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Trends & Analytics</h2>
        <p className="text-muted-foreground">Historical performance and cost trends</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Medication Adherence Trends</CardTitle>
            <CardDescription>PDC rates over time by medication class</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={adherenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="diabetes" stroke="#8884d8" strokeWidth={2} name="Diabetes" />
                <Line type="monotone" dataKey="hypertension" stroke="#82ca9d" strokeWidth={2} name="Hypertension" />
                <Line type="monotone" dataKey="cholesterol" stroke="#ffc658" strokeWidth={2} name="Cholesterol" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Per Member Trends</CardTitle>
            <CardDescription>Monthly cost breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="diabetes" stackId="a" fill="#8884d8" name="Diabetes" />
                <Bar dataKey="pharmacy" stackId="a" fill="#82ca9d" name="Pharmacy" />
                <Bar dataKey="medical" stackId="a" fill="#ffc658" name="Medical" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screening Rate Comparison</CardTitle>
          <CardDescription>Q4 2024 vs Q1 2025 preventive screening rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={screeningData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="q4" fill="#8884d8" name="Q4 2024" />
              <Bar dataKey="q1" fill="#82ca9d" name="Q1 2025" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
