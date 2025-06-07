
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const PerformanceMetrics = () => {
  const metrics = [
    {
      category: "Medication Adherence",
      metrics: [
        { name: "Diabetes Medications (PDC)", current: 76, target: 80, benchmark: 82, trend: "down" },
        { name: "Hypertension Medications", current: 85, target: 80, benchmark: 83, trend: "stable" },
        { name: "Cholesterol Medications", current: 72, target: 80, benchmark: 78, trend: "down" }
      ]
    },
    {
      category: "Preventive Screenings",
      metrics: [
        { name: "Mammogram Screening", current: 89, target: 85, benchmark: 87, trend: "up" },
        { name: "Colorectal Cancer Screening", current: 82, target: 80, benchmark: 85, trend: "up" },
        { name: "Diabetic Eye Exam", current: 68, target: 75, benchmark: 73, trend: "stable" }
      ]
    },
    {
      category: "Cost Management",
      metrics: [
        { name: "Generic Utilization Rate", current: 84, target: 85, benchmark: 87, trend: "stable" },
        { name: "Prior Auth Compliance", current: 92, target: 90, benchmark: 89, trend: "up" },
        { name: "High Cost Claimants", current: 15, target: 12, benchmark: 14, trend: "up" }
      ]
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendSymbol = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getPerformanceStatus = (current: number, target: number) => {
    if (current >= target) return 'success';
    if (current >= target * 0.9) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Performance Metrics</h2>
        <p className="text-muted-foreground">Your plan's performance compared to targets and industry benchmarks</p>
      </div>

      {metrics.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
            <CardDescription>Key performance indicators for this category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {category.metrics.map((metric) => {
                const status = getPerformanceStatus(metric.current, metric.target);
                
                return (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                          {getTrendSymbol(metric.trend)} {metric.current}%
                        </span>
                        <Badge variant={status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}>
                          {status === 'success' ? 'On Target' : status === 'warning' ? 'Near Target' : 'Below Target'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress 
                        value={metric.current} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {metric.current}%</span>
                        <span>Target: {metric.target}%</span>
                        <span>Benchmark: {metric.benchmark}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
