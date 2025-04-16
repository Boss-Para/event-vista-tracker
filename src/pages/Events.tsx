
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Search } from "lucide-react";
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

// Mock data for events
const mockEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "June 15-17, 2023",
    location: "Grand Convention Center",
    client: "TechCorp Inc.",
    progress: 75,
    status: "in-progress",
    budget: "$85,000",
    vendorCount: 12,
    description: "Annual technology conference featuring keynotes, workshops, and networking events.",
  },
  {
    id: "2",
    name: "Smith-Johnson Wedding",
    date: "July 8, 2023",
    location: "Lakeside Gardens",
    client: "Emily Smith & Michael Johnson",
    progress: 90,
    status: "in-progress",
    budget: "$45,000",
    vendorCount: 8,
    description: "Elegant outdoor wedding ceremony and indoor reception for 150 guests.",
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
    description: "Evening gala event to launch new product line with press, influencers, and industry partners.",
  },
  {
    id: "4",
    name: "Charity Fundraiser",
    date: "September 5, 2023",
    location: "City Ballroom",
    client: "Hope Foundation",
    progress: 25,
    status: "upcoming",
    budget: "$30,000",
    vendorCount: 6,
    description: "Annual fundraising dinner with silent auction and entertainment.",
  },
  {
    id: "5",
    name: "Williams Anniversary",
    date: "October 12, 2023",
    location: "Rivera Estate",
    client: "John & Sarah Williams",
    progress: 10,
    status: "upcoming",
    budget: "$15,000",
    vendorCount: 5,
    description: "25th wedding anniversary celebration with family and close friends.",
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
    description: "Year-end celebration with dinner, awards, and entertainment for 200 employees.",
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents = 
    activeTab === "all" ? mockEvents : 
    mockEvents.filter(event => event.status === activeTab);

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
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input className="pl-8" placeholder="Search events..." />
          </div>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Event
          </Button>
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
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription className="mt-1">{event.date}</CardDescription>
                    </div>
                    {getStatusBadge(event.status)}
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
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm font-medium">{event.progress}%</p>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">View Details</Button>
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
