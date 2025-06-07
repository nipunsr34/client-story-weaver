
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";

interface ClientSelectorProps {
  selectedClient: string;
  onClientChange: (client: string) => void;
}

export const ClientSelector = ({ selectedClient, onClientChange }: ClientSelectorProps) => {
  const clients = [
    { id: "client-a", name: "Client A - Employer Group", type: "Employer", members: "2,500" },
    { id: "client-b", name: "Client B - MAPD South Region", type: "MAPD", members: "8,750" },
    { id: "client-c", name: "Client C - Self-Insured Plan", type: "Self-Insured", members: "1,200" },
    { id: "client-d", name: "Client D - Regional Health Plan", type: "Regional", members: "15,000" },
    { id: "client-e", name: "Client E - Medicare Advantage", type: "Medicare", members: "6,300" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Select Client
        </CardTitle>
        <CardDescription>
          Choose the client you want to analyze
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client-search">Search by name or ID</Label>
          <Input 
            id="client-search"
            placeholder="Type to search clients..."
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="client-select">Or select from list</Label>
          <Select value={selectedClient} onValueChange={onClientChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a client..." />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{client.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {client.type} • {client.members} members
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
