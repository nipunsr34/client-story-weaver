
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientSelector } from "@/components/ClientSelector";
import { TopicSelector } from "@/components/TopicSelector";
import { FilterOptions } from "@/components/FilterOptions";
import { InsightGenerator } from "@/components/InsightGenerator";
import { EmailCommunication } from "@/components/EmailCommunication";
import { AttachmentsViewer } from "@/components/AttachmentsViewer";
import { Users, FileText, TrendingUp, Search, Mail, Paperclip } from "lucide-react";

const AccountManagerDashboard = () => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [filters, setFilters] = useState({
    timeframe: "last-3-months",
    population: "all-members",
    specificMetric: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedInsight, setGeneratedInsight] = useState<any>(null);

  const handleGenerateInsight = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedInsight({
        title: `${selectedTopic} Analysis for ${selectedClient}`,
        summary: "Generated insights based on call transcripts, email communications, and performance data. Analysis includes patterns from email exchanges regarding formulary concerns and member complaints documented in recent calls.",
        keyFindings: [
          "23% of diabetic members had PDC < 80%",
          "12% drop linked to formulary changes (flagged in 8 transcripts + 3 emails)",
          "Top complaints: cost, confusion about refill schedule",
          "Email attachments show 15% increase in prior auth rejections"
        ],
        recommendations: [
          "Member education program based on call feedback",
          "Copay optimization review from cost analysis documents", 
          "Formulary communication improvement (emails show confusion)",
          "Streamline prior auth process per attachment data"
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Account Manager Portal</h1>
          <p className="text-muted-foreground">
            Generate client insights from call transcripts, email communications, and performance data
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Communications</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,143</div>
              <p className="text-xs text-muted-foreground">
                Calls + Emails
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attachments</CardTitle>
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                Documents processed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insights Generated</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface with Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights">Generate Insights</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="attachments">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Panel - Configuration */}
              <div className="lg:col-span-1 space-y-6">
                <ClientSelector 
                  selectedClient={selectedClient}
                  onClientChange={setSelectedClient}
                />
                
                <TopicSelector 
                  selectedTopic={selectedTopic}
                  onTopicChange={setSelectedTopic}
                />
                
                <FilterOptions 
                  filters={filters}
                  onFiltersChange={setFilters}
                />
                
                <Button 
                  onClick={handleGenerateInsight}
                  disabled={!selectedClient || !selectedTopic || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? "Generating..." : "Generate Client Summary"}
                </Button>
              </div>

              {/* Right Panel - Results */}
              <div className="lg:col-span-2">
                <InsightGenerator 
                  isGenerating={isGenerating}
                  insight={generatedInsight}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communications">
            <EmailCommunication selectedClient={selectedClient} />
          </TabsContent>

          <TabsContent value="attachments">
            <AttachmentsViewer selectedClient={selectedClient} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountManagerDashboard;
