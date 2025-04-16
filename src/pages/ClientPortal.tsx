
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ClientEventCard from "@/components/client/ClientEventCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MessageSquare, FileText, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for client portal
const clientEvents = [
  {
    id: "1",
    name: "Smith-Johnson Wedding",
    date: "July 8, 2023",
    location: "Lakeside Gardens",
    progress: 85,
    status: "in-progress",
    tasks: { completed: 17, total: 20 },
    nextMilestone: {
      name: "Final Venue Walkthrough",
      date: "June 24, 2023",
    },
  },
  {
    id: "2",
    name: "Anniversary Celebration",
    date: "October 15, 2023",
    location: "Grand Hotel Ballroom",
    progress: 45,
    status: "in-progress",
    tasks: { completed: 9, total: 15 },
    nextMilestone: {
      name: "Menu Tasting",
      date: "August 30, 2023",
    },
  },
];

const clientDocuments = [
  {
    id: "1",
    name: "Wedding Contract.pdf",
    type: "PDF",
    date: "May 10, 2023",
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "Initial Proposal.pdf",
    type: "PDF",
    date: "April 28, 2023",
    size: "3.5 MB",
  },
  {
    id: "3",
    name: "Payment Schedule.xlsx",
    type: "XLSX",
    date: "May 5, 2023",
    size: "540 KB",
  },
  {
    id: "4",
    name: "Vendor Contacts.docx",
    type: "DOCX",
    date: "May 15, 2023",
    size: "780 KB",
  },
];

const upcomingAppointments = [
  {
    id: "1",
    title: "Menu Tasting",
    date: "June 15, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Gourmet Catering",
  },
  {
    id: "2",
    title: "Floral Design Consultation",
    date: "June 22, 2023",
    time: "10:00 AM - 11:30 AM",
    location: "Elegant Decor Studio",
  },
];

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Client Portal</h1>
            <p className="text-muted-foreground">Welcome back, Smith Family</p>
          </div>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Planner
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientEvents.map((event) => (
              <ClientEventCard key={event.id} event={event} />
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-4">
                    <div className="rounded-md bg-primary/10 p-2 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.title}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.date} • {appointment.time}</p>
                      <p className="text-sm">{appointment.location}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">Reschedule</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientDocuments.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4">
                    <div className="rounded-md bg-primary/10 p-2 flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">{doc.date} • {doc.size}</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientEvents.map((event) => (
              <ClientEventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Documents</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input className="pl-8" placeholder="Search documents..." />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    <div className="rounded-md bg-primary/10 p-2 flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">{doc.date} • {doc.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Download</Button>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>View and manage your upcoming meetings</CardDescription>
                </div>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Request New Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-lg">{appointment.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.date}</span>
                          </div>
                          <span className="hidden sm:inline text-muted-foreground">•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Reschedule</Button>
                        <Button variant="destructive">Cancel</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ClientPortal;
