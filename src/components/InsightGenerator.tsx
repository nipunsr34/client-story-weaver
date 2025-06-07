
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Mail, Copy, BarChart3, Loader2, Paperclip } from "lucide-react";

interface InsightGeneratorProps {
  isGenerating: boolean;
  insight: any;
}

export const InsightGenerator = ({ isGenerating, insight }: InsightGeneratorProps) => {
  if (isGenerating) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="font-semibold">Generating Insights...</h3>
              <p className="text-sm text-muted-foreground">
                Analyzing call transcripts, email communications, attachments, and performance data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insight) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Ready to Generate Insights</h3>
              <p className="text-sm text-muted-foreground">
                Select a client and topic to analyze communications and data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{insight.title}</CardTitle>
            <CardDescription className="mt-2">
              Generated from call transcripts, email communications, document attachments, and system metrics
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Sources Used */}
        <div>
          <h4 className="font-semibold mb-2">Data Sources Analyzed</h4>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Call Transcripts
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              Email Communications
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              Document Attachments
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Performance Metrics
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <h4 className="font-semibold mb-2">Executive Summary</h4>
          <p className="text-muted-foreground">{insight.summary}</p>
        </div>

        <Separator />

        {/* Key Findings */}
        <div>
          <h4 className="font-semibold mb-3">Key Findings</h4>
          <div className="space-y-2">
            {insight.keyFindings.map((finding: string, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  {index + 1}
                </Badge>
                <span className="text-sm">{finding}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Recommendations */}
        <div>
          <h4 className="font-semibold mb-3">Recommendations</h4>
          <div className="space-y-2">
            {insight.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5">
                  ✓
                </Badge>
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline">
            View Supporting Communications
          </Button>
          <Button variant="outline">
            Review Source Documents
          </Button>
          <Button>
            Schedule Client Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
