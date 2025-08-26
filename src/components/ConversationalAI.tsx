import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Bot, User, Send, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  links?: { title: string; url: string; type: 'dashboard' | 'document' }[];
}

const mockResponses = {
  "low adherence": {
    content: "I found 347 members with low adherence (below 75%) across all medications. The highest concentration is in diabetes medications (42% of low-adherence cases) and hypertension medications (31%).\n\nKey findings:\n• 156 members haven't filled prescriptions in 45+ days\n• 89 members are in the 30-74% adherence range\n• Primary barriers: Cost concerns (38%), Side effects (24%), Forgetfulness (22%)",
    links: [
      { title: "Low Adherence Dashboard", url: "#", type: "dashboard" },
      { title: "Member Outreach Report", url: "#", type: "document" }
    ]
  },
  "cost increases": {
    content: "This quarter's 8.3% cost increase is primarily driven by:\n\n1. **Specialty Drug Utilization** (+$47 PMPM) - 23% increase in oncology and autoimmune treatments\n2. **Emergency Department Visits** (+$28 PMPM) - 15% rise, often preventable conditions\n3. **High-Cost Claims** (+$19 PMPM) - 3 members with claims >$100K\n\nRecommendations: Implement prior authorization for specialty drugs, enhance preventive care programs.",
    links: [
      { title: "Cost Analysis Dashboard", url: "#", type: "dashboard" },
      { title: "Specialty Drug Report", url: "#", type: "document" }
    ]
  },
  "default": {
    content: "I can help you analyze member data, costs, adherence patterns, and more. Try asking about:\n\n• Member adherence patterns\n• Cost drivers and trends\n• Preventive care gaps\n• High-risk member identification\n• Utilization patterns\n• Quality metrics\n\nWhat would you like to explore?",
    links: []
  }
};

export const ConversationalAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your benefit central AI assistant. I can help you analyze member data, identify trends, and answer questions about your plan performance. What would you like to know?",
      timestamp: new Date(),
      links: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('low adherence') || lowerQuery.includes('adherence')) {
      return mockResponses["low adherence"];
    } else if (lowerQuery.includes('cost') || lowerQuery.includes('increase') || lowerQuery.includes('driving')) {
      return mockResponses["cost increases"];
    } else {
      return mockResponses["default"];
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        links: response.links
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about your member data, costs, and benefit performance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.links && message.links.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.links.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-auto p-2 justify-start"
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          <span className="text-xs">{link.title}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {link.type}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about members, costs, adherence..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Try: "Show me members with low adherence" or "What's driving cost increases?"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};