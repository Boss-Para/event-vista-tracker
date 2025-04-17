import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Search, FileCheck, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewEventDialog from "@/components/events/NewEventDialog";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    name: "Smith-Johnson Wedding",
    date: "July 8, 2023",
    location: "Lakeside Gardens",
    client: "Emily Smith & Michael Johnson",
    progress: 90,
    status: "in-progress",
    budget: "$45,000",
    vendorCount: 8,
    occasion: "wedding",
    description: "Elegant outdoor wedding ceremony and indoor reception for 150 guests.",
    subEvents: [
      { id: "1-1", name: "Engagement Ceremony", date: "June 15, 2023", status: "completed" },
      { id: "1-2", name: "Bachelor Party", date: "July 1, 2023", status: "completed" },
      { id: "1-3", name: "Wedding Ceremony", date: "July 8, 2023", status: "in-progress" },
      { id: "1-4", name: "Reception", date: "July 8, 2023", status: "upcoming" }
    ]
  },
  {
    id: "2",
    name: "Tech Conference 2023",
    date: "June 15-17, 2023",
    location: "Grand Convention Center",
    client: "TechCorp Inc.",
    progress: 75,
    status: "in-progress",
    budget: "$85,000",
    vendorCount: 12,
    occasion: "corporate",
    description: "Annual technology conference featuring keynotes, workshops, and networking events.",
    subEvents: [
      { id: "2-1", name: "Opening Keynote", date: "June 15, 2023", status: "upcoming" },
      { id: "2-2", name: "Workshops Day", date: "June 16, 2023", status: "upcoming" },
      { id: "2-3", name: "Networking Gala", date: "June 17, 2023", status: "upcoming" }
    ]
  },
  {
    id: "3",
    name: "Product Launch Gala",
    date: "August 22, 2023",
    location: "Metropolitan Hotel",
    client: "Innovate Labs",
    progress: 40,
    status: "in-progress",
    budget: "$65,000",
    vendorCount: 10,
    occasion: "corporate",
    description: "Evening gala event to launch new product line with press, influencers, and industry partners.",
    subEvents: [
      { id: "3-1", name: "Press Conference", date: "August 22, 2023 - 2PM", status: "upcoming" },
      { id: "3-2", name: "Product Demo", date: "August 22, 2023 - 4PM", status: "upcoming" },
      { id: "3-3", name: "Gala Dinner", date: "August 22, 2023 - 7PM", status: "upcoming" }
    ]
  },
  {
    id: "4",
    name: "Williams Anniversary",
    date: "October 12, 2023",
    location: "Rivera Estate",
    client: "John & Sarah Williams",
    progress: 10,
    status: "upcoming",
    budget: "$15,000",
    vendorCount: 5,
    occasion: "wedding",
    description: "25th wedding anniversary celebration with family and close friends.",
    subEvents: [
      { id: "4-1", name: "Vow Renewal Ceremony", date: "October 12, 2023 - 3PM", status: "upcoming" },
      { id: "4-2", name: "Anniversary Dinner", date: "October 12, 2023 - 6PM", status: "upcoming" }
    ]
  },
  {
    id: "5",
    name: "Rodriguez-Chen Wedding",
    date: "September 18, 2023",
    location: "Sunset Beach Resort",
    client: "Maria Rodriguez & David Chen",
    progress: 65,
    status: "in-progress",
    budget: "$50,000",
    vendorCount: 9,
    occasion: "wedding",
    description: "Destination beach wedding with 100 guests, featuring cultural fusion elements.",
    subEvents: [
      { id: "5-1", name: "Welcome Party", date: "September 16, 2023", status: "upcoming" },
      { id: "5-2", name: "Rehearsal Dinner", date: "September 17, 2023", status: "upcoming" },
      { id: "5-3", name: "Wedding Ceremony", date: "September 18, 2023", status: "upcoming" },
      { id: "5-4", name: "Reception", date: "September 18, 2023", status: "upcoming" },
      { id: "5-5", name: "Farewell Brunch", date: "September 19, 2023", status: "upcoming" }
    ]
  },
  {
    id: "6",
    name: "Corporate Holiday Party",
    date: "December 15, 2023",
    location: "Winter Garden Hall",
    client: "Global Finance Group",
    progress: 5,
    status: "upcoming",
    budget: "$55,000",
    vendorCount: 8,
    occasion: "corporate",
    description: "Year-end celebration with dinner, awards, and entertainment for 200 employees.",
    subEvents: [
      { id: "6-1", name: "Awards Ceremony", date: "December 15, 2023 - 6PM", status: "upcoming" },
      { id: "6-2", name: "Dinner & Entertainment", date: "December 15, 2023 - 7:30PM", status: "upcoming" }
    ]
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [occasionFilter, setOccasionFilter] = useState<string | null>(null);

  const filteredEvents = mockEvents
    .filter(event => 
      (activeTab === "all" || event.status === activeTab) && 
      (!occasionFilter || event.occasion === occasionFilter)
    );

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

  const getOccasionBadge = (occasion: string) => {
    switch (occasion) {
      case "wedding":
        return <Badge variant="outline" className="bg-pink-50 text-pink-800 border-pink-300">Wedding</Badge>;
      case "corporate":
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Corporate</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input className="pl-8" placeholder="Search events..." />
          </div>
          <NewEventDialog />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>{event.name}</CardTitle>
                      </div>
                      <CardDescription className="mt-1">{event.date}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {getStatusBadge(event.status)}
                      {getOccasionBadge(event.occasion)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{event.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">{event.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{event.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vendors</p>
                        <p className="font-medium">{event.vendorCount}</p>
                      </div>
                    </div>
                    
                    {event.subEvents && event.subEvents.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Sub-Events</p>
                        <div className="space-y-2">
                          {event.subEvents.slice(0, 3).map(subEvent => (
                            <div key={subEvent.id} className="flex justify-between items-center text-sm border rounded-md p-2">
                              <span>{subEvent.name}</span>
                              {getStatusBadge(subEvent.status)}
                            </div>
                          ))}
                          {event.subEvents.length > 3 && (
                            <div className="text-sm text-center text-muted-foreground">
                              +{event.subEvents.length - 3} more sub-events
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm font-medium">{event.progress}%</p>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Vendors
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Proof of Work
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Events;
