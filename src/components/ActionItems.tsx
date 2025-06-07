
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';

export const ActionItems = () => {
  const actionItems = [
    {
      id: 1,
      title: "Statin Adherence Intervention",
      description: "Launch targeted outreach to 150 members who stopped statin therapy after formulary change",
      priority: "High",
      timeline: "2 weeks",
      impact: "Cost savings: $45,000/month",
      status: "pending",
      category: "Medication Management",
      icon: Users
    },
    {
      id: 2,
      title: "Prior Authorization Education",
      description: "Create member education materials about new prior auth requirements for GLP-1 medications",
      priority: "Medium",
      timeline: "1 month",
      impact: "Reduce call volume by 30%",
      status: "in-progress",
      category: "Member Experience",
      icon: Clock
    },
    {
      id: 3,
      title: "Formulary Communication Update",
      description: "Send clarification notice about formulary changes to affected diabetic members",
      priority: "High",
      timeline: "1 week",
      impact: "Improve satisfaction scores",
      status: "pending",
      category: "Communication",
      icon: Calendar
    },
    {
      id: 4,
      title: "Generic Substitution Program",
      description: "Implement automated generic substitution alerts for high-cost brand medications",
      priority: "Medium",
      timeline: "6 weeks",
      impact: "Cost savings: $25,000/month",
      status: "planning",
      category: "Cost Management",
      icon: DollarSign
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
      case 'planning': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'planning': return 'Planning';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Recommended Action Items</h2>
          <p className="text-muted-foreground">Priority initiatives based on your performance data</p>
        </div>
        <Button>Schedule Review Meeting</Button>
      </div>

      <div className="grid gap-4">
        {actionItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <Card key={item.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox id={`action-${item.id}`} />
                    <div className="p-2 rounded-full bg-muted">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.category}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(item.priority) as any}>
                      {item.priority} Priority
                    </Badge>
                    <Badge variant={getStatusColor(item.status) as any}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{item.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Timeline</h4>
                    <p className="text-sm text-muted-foreground">{item.timeline}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Expected Impact</h4>
                    <p className="text-sm text-muted-foreground">{item.impact}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Learn More</Button>
                  <Button size="sm">Take Action</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
