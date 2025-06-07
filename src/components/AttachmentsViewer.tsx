
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { File, FileText, Mail } from "lucide-react";

interface AttachmentsViewerProps {
  selectedClient: string;
}

export const AttachmentsViewer = ({ selectedClient }: AttachmentsViewerProps) => {
  const attachments = [
    {
      id: "att-1",
      name: "Q1_Formulary_Changes.pdf",
      type: "PDF",
      size: "2.4 MB",
      source: "Email",
      date: "2025-01-15",
      emailSubject: "Q1 2025 Formulary Changes"
    },
    {
      id: "att-2",
      name: "Member_Satisfaction_Survey.xlsx", 
      type: "Excel",
      size: "856 KB",
      source: "Email",
      date: "2025-01-12",
      emailSubject: "Member Complaint Follow-up"
    },
    {
      id: "att-3",
      name: "Cost_Analysis_GLP1.pdf",
      type: "PDF", 
      size: "1.8 MB",
      source: "Email",
      date: "2025-01-08",
      emailSubject: "Cost Analysis Report"
    },
    {
      id: "att-4",
      name: "Prior_Auth_Guidelines.docx",
      type: "Word",
      size: "425 KB", 
      source: "Email",
      date: "2025-01-08",
      emailSubject: "Cost Analysis Report"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'excel':
        return <File className="h-4 w-4 text-green-500" />;
      case 'word':
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!selectedClient) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <File className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Select a Client</h3>
              <p className="text-sm text-muted-foreground">
                Choose a client to view attachments and documents
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
        <CardTitle className="flex items-center gap-2">
          <File className="h-5 w-5" />
          Documents & Attachments
        </CardTitle>
        <CardDescription>
          Files and documents from communications with {selectedClient}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.type)}
                <div>
                  <h4 className="font-medium text-sm">{attachment.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{attachment.size}</span>
                    <span>•</span>
                    <span>{attachment.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {attachment.emailSubject}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {attachment.type}
                </Badge>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
