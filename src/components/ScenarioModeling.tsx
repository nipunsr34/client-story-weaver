import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, TrendingDown, DollarSign, Users, Heart } from 'lucide-react';

interface ScenarioResults {
  memberCost: { current: number; projected: number; change: number };
  adherence: { current: number; projected: number; change: number };
  satisfaction: { current: number; projected: number; change: number };
  organizationCost: { current: number; projected: number; change: number };
}

export const ScenarioModeling = () => {
  const [copayAmount, setCopayAmount] = useState([20]);
  const [deductible, setDeductible] = useState([1500]);
  const [preventiveCoverage, setPreventiveCoverage] = useState([90]);
  const [specialtyTierCost, setSpecialtyTierCost] = useState([150]);
  const [isModeling, setIsModeling] = useState(false);
  const [results, setResults] = useState<ScenarioResults | null>(null);

  const runScenario = () => {
    setIsModeling(true);
    
    // Simulate modeling calculation delay
    setTimeout(() => {
      // Mock calculation based on input changes
      const copayImpact = (copayAmount[0] - 20) * -0.5; // Higher copay = lower adherence
      const deductibleImpact = (deductible[0] - 1500) * -0.01; // Higher deductible = higher member cost
      const preventiveImpact = (preventiveCoverage[0] - 90) * 0.3; // Higher coverage = better satisfaction
      const specialtyImpact = (specialtyTierCost[0] - 150) * -0.2; // Higher specialty cost = lower adherence
      
      const newResults: ScenarioResults = {
        memberCost: {
          current: 342,
          projected: Math.max(200, 342 + deductibleImpact * 10 + copayImpact * 5),
          change: 0
        },
        adherence: {
          current: 76,
          projected: Math.min(95, Math.max(60, 76 + copayImpact + specialtyImpact)),
          change: 0
        },
        satisfaction: {
          current: 87,
          projected: Math.min(100, Math.max(70, 87 + preventiveImpact - Math.abs(copayImpact) * 0.5)),
          change: 0
        },
        organizationCost: {
          current: 4850000,
          projected: Math.max(4000000, 4850000 - preventiveImpact * 50000 + Math.abs(deductibleImpact) * 30000),
          change: 0
        }
      };

      // Calculate percentage changes
      newResults.memberCost.change = ((newResults.memberCost.projected - newResults.memberCost.current) / newResults.memberCost.current) * 100;
      newResults.adherence.change = newResults.adherence.projected - newResults.adherence.current;
      newResults.satisfaction.change = newResults.satisfaction.projected - newResults.satisfaction.current;
      newResults.organizationCost.change = ((newResults.organizationCost.projected - newResults.organizationCost.current) / newResults.organizationCost.current) * 100;

      setResults(newResults);
      setIsModeling(false);
    }, 2000);
  };

  const resetScenario = () => {
    setCopayAmount([20]);
    setDeductible([1500]);
    setPreventiveCoverage([90]);
    setSpecialtyTierCost([150]);
    setResults(null);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Benefit Design Scenario Modeling
          </CardTitle>
          <CardDescription>
            Simulate changes to your benefit design and see the projected impact on costs, adherence, and satisfaction
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="design" className="space-y-4">
            <TabsList>
              <TabsTrigger value="design">Benefit Design</TabsTrigger>
              <TabsTrigger value="results">Impact Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Generic Drug Copay: ${copayAmount[0]}</Label>
                    <Slider
                      value={copayAmount}
                      onValueChange={setCopayAmount}
                      max={50}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$5</span>
                      <span>$50</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Annual Deductible: ${deductible[0]}</Label>
                    <Slider
                      value={deductible}
                      onValueChange={setDeductible}
                      max={5000}
                      min={500}
                      step={250}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$500</span>
                      <span>$5,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preventive Care Coverage: {preventiveCoverage[0]}%</Label>
                    <Slider
                      value={preventiveCoverage}
                      onValueChange={setPreventiveCoverage}
                      max={100}
                      min={70}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>70%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Specialty Drug Tier Cost: ${specialtyTierCost[0]}</Label>
                    <Slider
                      value={specialtyTierCost}
                      onValueChange={setSpecialtyTierCost}
                      max={300}
                      min={75}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$75</span>
                      <span>$300</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-4">
                <Button onClick={runScenario} disabled={isModeling} className="flex-1">
                  {isModeling ? 'Running Scenario...' : 'Run Scenario Analysis'}
                </Button>
                <Button variant="outline" onClick={resetScenario}>
                  Reset to Current
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              {results ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Member Cost Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current PMPM:</span>
                        <span className="font-medium">${results.memberCost.current}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Projected PMPM:</span>
                        <span className="font-medium">${results.memberCost.projected.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Change:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(results.memberCost.change)}`}>
                          {getChangeIcon(results.memberCost.change)}
                          <span className="font-medium">{results.memberCost.change.toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Adherence Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current:</span>
                        <span className="font-medium">{results.adherence.current}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Projected:</span>
                        <span className="font-medium">{results.adherence.projected.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Change:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(results.adherence.change)}`}>
                          {getChangeIcon(results.adherence.change)}
                          <span className="font-medium">{results.adherence.change > 0 ? '+' : ''}{results.adherence.change.toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Member Satisfaction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current:</span>
                        <span className="font-medium">{results.satisfaction.current}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Projected:</span>
                        <span className="font-medium">{results.satisfaction.projected.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Change:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(results.satisfaction.change)}`}>
                          {getChangeIcon(results.satisfaction.change)}
                          <span className="font-medium">{results.satisfaction.change > 0 ? '+' : ''}{results.satisfaction.change.toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Organization Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Annual:</span>
                        <span className="font-medium">${(results.organizationCost.current / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Projected Annual:</span>
                        <span className="font-medium">${(results.organizationCost.projected / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Change:</span>
                        <div className={`flex items-center gap-1 ${getChangeColor(results.organizationCost.change)}`}>
                          {getChangeIcon(results.organizationCost.change)}
                          <span className="font-medium">{results.organizationCost.change.toFixed(1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Run a scenario analysis to see projected impacts</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};