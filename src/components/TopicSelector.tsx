
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";

interface TopicSelectorProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

export const TopicSelector = ({ selectedTopic, onTopicChange }: TopicSelectorProps) => {
  const topics = [
    {
      id: "medication-adherence",
      name: "Medication Adherence",
      description: "PDC rates, gaps in therapy, refill patterns"
    },
    {
      id: "screening-rates",
      name: "Screening Rates",
      description: "Cancer screenings, wellness visits, preventive care"
    },
    {
      id: "high-cost-utilization",
      name: "High Cost Utilization",
      description: "Drug classes, ER visits, specialty care"
    },
    {
      id: "member-complaints",
      name: "Member Complaints & Satisfaction",
      description: "Call sentiment, recurring issues, satisfaction trends"
    },
    {
      id: "formulary-navigation",
      name: "Formulary & Benefit Navigation",
      description: "Prior auth issues, coverage questions, confusion"
    },
    {
      id: "comparative-performance",
      name: "Comparative Performance",
      description: "Peer benchmarks, regional comparisons"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Choose Topic
        </CardTitle>
        <CardDescription>
          What would you like to explore?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="topic-select">Focus area</Label>
          <Select value={selectedTopic} onValueChange={onTopicChange}>
            <SelectTrigger>
              <SelectValue placeholder="Pick a topic..." />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {topic.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
