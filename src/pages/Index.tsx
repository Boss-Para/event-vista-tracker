import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import EventProgress from "@/components/dashboard/EventProgress";
import VendorOverview from "@/components/dashboard/VendorOverview";
import EventGalleryPreview from "@/components/dashboard/EventGalleryPreview";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, CalendarClock } from "lucide-react";

// Mock data for dashboard
const upcomingEvents = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "June 15-17, 2023",
    progress: 75,
    status: "in-progress" as const,
  },
  {
    id: "2",
    name: "Smith-Johnson Wedding",
    date: "July 8, 2023",
    progress: 90,
    status: "in-progress" as const,
  },
  {
    id: "3",
    name: "Product Launch Gala",
    date: "August 22, 2023",
    progress: 40,
    status: "in-progress" as const,
  },
  {
    id: "4",
    name: "Charity Fundraiser",
    date: "September 5, 2023",
    progress: 25,
    status: "upcoming" as const,
  },
];

const activeVendors = [
  {
    id: "1",
    name: "Elegant Decor",
    image: "/placeholder.svg",
    progress: 75,
    tasks: { completed: 3, total: 4 },
    status: "busy" as const,
  },
  {
    id: "2",
    name: "Gourmet Catering",
    image: "/placeholder.svg",
    progress: 100,
    tasks: { completed: 5, total: 5 },
    status: "available" as const,
  },
  {
    id: "3",
    name: "Sound Masters",
    image: "/placeholder.svg",
    progress: 30,
    tasks: { completed: 3, total: 10 },
    status: "unavailable" as const,
  },
  {
    id: "4",
    name: "Perfect Photos",
    image: "/placeholder.svg",
    progress: 60,
    tasks: { completed: 6, total: 10 },
    status: "busy" as const,
  },
];

const galleryImages = [
  {
    id: "1",
    src: "/placeholder.svg",
    alt: "Corporate event with people networking",
  },
  {
    id: "2",
    src: "/placeholder.svg",
    alt: "Wedding venue decoration",
  },
  {
    id: "3",
    src: "/placeholder.svg",
    alt: "Birthday party setup",
  },
  {
    id: "4",
    src: "/placeholder.svg",
    alt: "Conference stage setup",
  },
  {
    id: "5",
    src: "/placeholder.svg",
    alt: "Wedding ceremony",
  },
  {
    id: "6",
    src: "/placeholder.svg",
    alt: "Corporate dinner event",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to Event Vista</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Events"
          value="24"
          icon={<Calendar className="h-5 w-5" />}
          change={{ value: "3", positive: true }}
        />
        <StatCard
          title="Active Vendors"
          value="18"
          icon={<Users className="h-5 w-5" />}
          change={{ value: "2", positive: true }}
        />
        <StatCard
          title="Revenue"
          value="$245,500"
          icon={<DollarSign className="h-5 w-5" />}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Upcoming Events"
          value="6"
          icon={<CalendarClock className="h-5 w-5" />}
          change={{ value: "1", positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EventProgress events={upcomingEvents} />
        <VendorOverview vendors={activeVendors} />
      </div>

      <div className="mb-6">
        <EventGalleryPreview images={galleryImages} />
      </div>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <a href="/events">View All Events</a>
        </Button>
      </div>
    </MainLayout>
  );
};

export default Index;
