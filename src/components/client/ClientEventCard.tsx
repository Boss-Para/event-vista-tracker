
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface ClientEventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    progress: number;
    status: string;
    tasks: {
      completed: number;
      total: number;
    };
    nextMilestone?: {
      name: string;
      date: string;
    };
  };
}

const ClientEventCard = ({ event }: ClientEventCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "in-progress":
        return <Badge className="bg-orange-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{event.name}</CardTitle>
          {getStatusBadge(event.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Planning Progress</span>
            <span className="text-sm font-medium">{event.progress}%</span>
          </div>
          <Progress value={event.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">
              {event.tasks.completed} of {event.tasks.total} tasks completed
            </span>
          </div>
        </div>
        
        {event.nextMilestone && (
          <div className="rounded-md border p-3 bg-muted/50">
            <div className="flex items-center gap-2 text-sm mb-1">
              <AlertCircle className="h-4 w-4 text-event" />
              <span className="font-medium">Next Milestone</span>
            </div>
            <div className="flex items-center gap-2 text-sm ml-6">
              <span>{event.nextMilestone.name}</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{event.nextMilestone.date}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ClientEventCard;
