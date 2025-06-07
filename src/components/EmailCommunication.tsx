
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Paperclip, FileText, File } from "lucide-react";

interface EmailCommunicationProps {
  selectedClient: string;
}

export const EmailCommunication = ({ selectedClient }: EmailCommunicationProps) => {
  const emails = [
    {
      id: "email-1",
      subject: "Q1 2025 Formulary Changes - Action Required",
      sender: "client.contact@clienta.com",
      date: "2025-01-15",
      status: "read",
      attachments: 2,
      hasTranscript: false
    },
    {
      id: "email-2", 
      subject: "Member Complaint Follow-up - Diabetes Coverage",
      sender: "am.manager@company.com",
      date: "2025-01-12",
      status: "replied",
      attachments: 1,
      hasTranscript: false
    },
    {
      id: "email-3",
      subject: "Cost Analysis Report - GLP-1 Utilization",
      sender: "client.contact@clienta.com", 
      date: "2025-01-08",
      status: "read",
      attachments: 3,
      hasTranscript: false
    }
  ];

  const callTranscripts = [
    {
      id: "call-1",
      title: "Weekly Check-in Call",
      date: "2025-01-16",
      duration: "45 min",
      participants: "AM, Client Lead, Benefits Manager",
      hasTranscript: true,
      keyTopics: ["Adherence Rates", "Cost Concerns", "Member Feedback"]
    },
    {
      id: "call-2",
      title: "Formulary Review Discussion", 
      date: "2025-01-10",
      duration: "30 min",
      participants: "AM, Pharmacy Director",
      hasTranscript: true,
      keyTopics: ["Prior Auth Issues", "Generic Alternatives"]
    }
  ];

  if (!selectedClient) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Select a Client</h3>
              <p className="text-sm text-muted-foreground">
                Choose a client to view email communications and call transcripts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Email Communications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Communications
          </CardTitle>
          <CardDescription>
            Recent email exchanges with {selectedClient}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emails.map((email, index) => (
              <div key={email.id}>
                <div className="flex items-start justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{email.subject}</h4>
                      <Badge variant={email.status === "replied" ? "default" : "secondary"} className="text-xs">
                        {email.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      From: {email.sender} • {email.date}
                    </p>
                    {email.attachments > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Paperclip className="h-3 w-3" />
                        {email.attachments} attachment{email.attachments > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                {index < emails.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Transcripts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Call Transcripts
          </CardTitle>
          <CardDescription>
            Available call recordings and transcripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {callTranscripts.map((call, index) => (
              <div key={call.id}>
                <div className="flex items-start justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{call.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {call.duration}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {call.date} • {call.participants}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {call.keyTopics.map((topic, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Transcript
                    </Button>
                  </div>
                </div>
                {index < callTranscripts.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
