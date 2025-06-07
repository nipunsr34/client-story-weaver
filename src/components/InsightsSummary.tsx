
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, TrendingUp, Info } from 'lucide-react';

export const InsightsSummary = () => {
  const insights = [
    {
      id: 1,
      title: "Statin Adherence Drop",
      category: "Medication Adherence",
      severity: "high",
      description: "Adherence fell from 87% to 76% among diabetic males 65+. 40% of these members did not refill after Jan formulary shift.",
      impact: "Cost increase of $45,000/month",
      membersFeedback: "12 calls flagged cost as concern; 6 raised confusion on prior auth",
      recommendation: "Targeted outreach + clarify formulary updates",
      icon: TrendingDown
    },
    {
      id: 2,
      title: "Colorectal Screening Success",
      category: "Preventive Care",
      severity: "positive",
      description: "Screening rate improved to 82%, up from 77% last quarter following new outreach program.",
      impact: "Potential cost avoidance of $120,000",
      membersFeedback: "Positive response to simplified scheduling process",
      recommendation: "Continue current outreach strategy",
      icon: TrendingUp
    },
    {
      id: 3,
      title: "GLP-1 Cost Trend",
      category: "High Cost Drugs",
      severity: "medium",
      description: "28% increase in GLP-1 utilization driving diabetes drug costs higher.",
      impact: "Additional $78,000 in quarterly spend",
      membersFeedback: "9 mentions of prior auth delays in member calls",
      recommendation: "Review prior authorization criteria and member education",
      icon: Info
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'positive': return 'default';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return AlertTriangle;
      case 'positive': return TrendingUp;
      default: return Info;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personalized Insights for Q1 2025</h2>
        <Button variant="outline" size="sm">
          Download Report
        </Button>
      </div>

      <div className="grid gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          const SeverityIcon = getSeverityIcon(insight.severity);
          
          return (
            <Card key={insight.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription>{insight.category}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(insight.severity) as any} className="flex items-center gap-1">
                    <SeverityIcon className="h-3 w-3" />
                    {insight.severity === 'positive' ? 'Success' : insight.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{insight.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Financial Impact</h4>
                    <p className="text-sm text-muted-foreground">{insight.impact}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Member Feedback</h4>
                    <p className="text-sm text-muted-foreground">{insight.membersFeedback}</p>
                  </div>
                </div>

                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Recommended Action</h4>
                  <p className="text-sm">{insight.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
