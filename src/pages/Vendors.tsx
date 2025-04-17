import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import VendorCard from "@/components/vendors/VendorCard";
import VendorCalendar from "@/components/vendors/VendorCalendar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for vendors with availability dates
const mockVendors = [
  {
    id: "1",
    name: "Elegant Decor",
    image: "/placeholder.svg",
    type: "Decoration",
    phone: "(555) 123-4567",
    email: "info@elegantdecor.com",
    status: "available" as const,
    availableDates: [
      new Date("2025-04-17"),
      new Date("2025-04-18"),
      new Date("2025-04-19"),
    ],
  },
  {
    id: "2",
    name: "Gourmet Catering",
    image: "/placeholder.svg",
    type: "Catering",
    phone: "(555) 234-5678",
    email: "contact@gourmetcatering.com",
    status: "available" as const,
    availableDates: [
      new Date("2025-04-18"),
      new Date("2025-04-19"),
      new Date("2025-04-20"),
    ],
  },
  {
    id: "3",
    name: "Sound Masters",
    image: "/placeholder.svg",
    type: "Sound & Lighting",
    phone: "(555) 345-6789",
    email: "booking@soundmasters.com",
    progress: 30,
    tasks: { completed: 3, total: 10 },
    status: "unavailable" as const,
  },
  {
    id: "4",
    name: "Perfect Photos",
    image: "/placeholder.svg",
    type: "Photography",
    phone: "(555) 456-7890",
    email: "shoot@perfectphotos.com",
    progress: 60,
    tasks: { completed: 6, total: 10 },
    status: "busy" as const,
  },
  {
    id: "5",
    name: "Sweet Bakery",
    image: "/placeholder.svg",
    type: "Cake & Pastries",
    phone: "(555) 567-8901",
    email: "orders@sweetbakery.com",
    progress: 90,
    tasks: { completed: 9, total: 10 },
    status: "available" as const,
  },
  {
    id: "6",
    name: "Event Transport",
    image: "/placeholder.svg",
    type: "Transportation",
    phone: "(555) 678-9012",
    email: "booking@eventtransport.com",
    progress: 50,
    tasks: { completed: 1, total: 2 },
    status: "available" as const,
  },
];

const Vendors = () => {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const vendorTypes = Array.from(new Set(mockVendors.map(vendor => vendor.type)));

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.type.toLowerCase().includes(search.toLowerCase()) ||
      vendor.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(vendor.type);
    
    const matchesDate = !selectedDate || 
      vendor.availableDates.some(date => 
        date.toDateString() === selectedDate.toDateString()
      );

    return matchesSearch && matchesType && matchesDate;
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full md:w-64">
            <Input 
              placeholder="Search vendors..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <VendorCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {vendorTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Vendors;
