
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Calendar, UserCog } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold mb-4">Client Advocacy Portal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access personalized insights, performance metrics, and actionable recommendations for your healthcare plan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Track adherence, screening rates, and key health metrics</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Member Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Understand member feedback and satisfaction trends</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <DollarSign className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Cost Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Monitor cost trends and identify savings opportunities</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-8 w-8 mx-auto text-primary" />
              <CardTitle className="text-lg">Action Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get personalized recommendations and track progress</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button 
              onClick={() => navigate('/dashboard')} 
              size="lg"
              className="text-lg px-8 py-6 h-auto flex flex-col gap-2"
            >
              <Users className="h-6 w-6" />
              Client Dashboard
              <span className="text-sm opacity-90">View your insights</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/account-manager')} 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto flex flex-col gap-2"
            >
              <UserCog className="h-6 w-6" />
              Account Manager
              <span className="text-sm opacity-90">Generate client insights</span>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Secure access with role-based authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
