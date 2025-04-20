
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Image } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock vendor data (you can replace with real data later)
const mockVendors: Record<string, Array<{
  id: string;
  name: string;
  rating: number;
  priceMin: number;
  priceMax: number;
  proofImg: string;
}>> = {
  photography: [
    { id: "v1", name: "Lens Magic Studios", rating: 4.8, priceMin: 15000, priceMax: 25000, proofImg: "/placeholder.svg" },
    { id: "v2", name: "Snap Savvy", rating: 4.5, priceMin: 12000, priceMax: 19000, proofImg: "/placeholder.svg" },
    { id: "v3", name: "Wedo Photography", rating: 4.2, priceMin: 18000, priceMax: 23000, proofImg: "/placeholder.svg" },
  ],
  videography: [
    { id: "v4", name: "Cinematic Reelers", rating: 4.9, priceMin: 20000, priceMax: 30000, proofImg: "/placeholder.svg" },
    { id: "v5", name: "Story Films", rating: 4.6, priceMin: 16000, priceMax: 21000, proofImg: "/placeholder.svg" },
    { id: "v6", name: "Eyeshot Productions", rating: 4.3, priceMin: 10000, priceMax: 23000, proofImg: "/placeholder.svg" },
  ],
  reels: [
    { id: "v7", name: "Social Clips", rating: 4.8, priceMin: 7000, priceMax: 15000, proofImg: "/placeholder.svg" },
    { id: "v8", name: "Reel Hub", rating: 4.4, priceMin: 9000, priceMax: 13000, proofImg: "/placeholder.svg" },
    { id: "v9", name: "Instafilm", rating: 4.1, priceMin: 8000, priceMax: 14000, proofImg: "/placeholder.svg" },
  ],
  makeup: [
    { id: "v10", name: "GlamMakers", rating: 4.7, priceMin: 14000, priceMax: 19000, proofImg: "/placeholder.svg" },
    { id: "v11", name: "Powder Room", rating: 4.4, priceMin: 12000, priceMax: 17000, proofImg: "/placeholder.svg" },
    { id: "v12", name: "Chic Artistry", rating: 4.2, priceMin: 12500, priceMax: 16000, proofImg: "/placeholder.svg" },
  ],
};

interface ServiceVendorSelectProps {
  serviceId: string;
  selectedVendors: string[];
  setSelectedVendors: (vendorIds: string[]) => void;
  open: boolean;
  onToggleOpen: () => void;
}

// Improve the UI: cleaner spacing, accordion-like open/close behavior, better card layout.
const ServiceVendorSelect: React.FC<ServiceVendorSelectProps> = ({
  serviceId,
  selectedVendors,
  setSelectedVendors,
  open,
  onToggleOpen
}) => {
  const vendors = mockVendors[serviceId] || [];

  React.useEffect(() => {
    if (open && !selectedVendors.length && vendors.length > 0) {
      const sorted = [...vendors].sort((a, b) => a.priceMin - b.priceMin);
      setSelectedVendors(sorted.slice(0, 2).map(v => v.id));
    }
    // eslint-disable-next-line
  }, [vendors, open, selectedVendors.length]);

  const handleToggle = (id: string) => {
    if (selectedVendors.includes(id)) {
      setSelectedVendors(selectedVendors.filter(v => v !== id));
    } else {
      setSelectedVendors([...selectedVendors, id]);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        className={cn(
          "w-full font-semibold mb-2 text-lg flex justify-between items-center px-2 py-1 hover:bg-accent rounded transition border-none bg-transparent",
          open && "bg-blue-100"
        )}
        onClick={onToggleOpen}
        aria-expanded={open}
      >
        <span>Select Vendors</span>
        <span className="ml-2 text-blue-600">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="flex flex-col space-y-4 px-0 sm:px-2 pb-2">
          {vendors.map(vendor => (
            <div
              key={vendor.id}
              className={cn(
                "border rounded-lg p-4 bg-white shadow-sm transition-colors",
                selectedVendors.includes(vendor.id) && "border-blue-500 bg-blue-50"
              )}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Vendor name and rating */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedVendors.includes(vendor.id)}
                    onCheckedChange={() => handleToggle(vendor.id)}
                  />
                  <div className="font-medium truncate">{vendor.name}</div>
                  <Badge className="ml-auto flex items-center gap-1 bg-green-200 text-green-800">
                    <Star className="h-4 w-4 text-green-600" />
                    {vendor.rating.toFixed(1)}
                  </Badge>
                </div>
                {/* Proof of work */}
                <div className="flex items-center gap-3 justify-start sm:justify-center">
                  <div className="flex items-center gap-2">
                    <Image className="h-6 w-6 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Proof</span>
                  </div>
                  <img
                    src={vendor.proofImg}
                    alt="Proof of work"
                    className="h-14 w-14 object-cover rounded ml-1"
                  />
                </div>
                {/* Price range */}
                <div className="flex flex-col sm:items-end gap-1">
                  <div className="text-sm text-blue-700 font-bold">
                    ₹{vendor.priceMin.toLocaleString()} - ₹{vendor.priceMax.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Estimated Price Range</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceVendorSelect;

