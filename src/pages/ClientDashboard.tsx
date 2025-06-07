
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { InsightsSummary } from '@/components/InsightsSummary';
import { TrendChart } from '@/components/TrendChart';
import { ActionItems } from '@/components/ActionItems';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

const ClientDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2025');

  const mockClientData = {
    name: "Acme Corporation",
    planType: "Self-Insured Plan",
    memberCount: 2450,
    period: selectedPeriod
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {mockClientData.name}</h1>
            <p className="text-muted-foreground">
              {mockClientData.planType} • {mockClientData.memberCount} members
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{selectedPeriod}</span>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <div className="flex items-center text-xs text-green-600">
                <span>↗ +2.3% from last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <div className="flex items-center text-xs text-red-600">
                <span>↘ -11% from last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Per Member</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$342</div>
              <div className="flex items-center text-xs text-yellow-600">
                <span>↗ +$23 from last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screening Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <div className="flex items-center text-xs text-green-600">
                <span>↗ +5.2% from last quarter</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="trends">Trends & Analytics</TabsTrigger>
            <TabsTrigger value="actions">Action Items</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4">
            <InsightsSummary />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <TrendChart />
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <ActionItems />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
