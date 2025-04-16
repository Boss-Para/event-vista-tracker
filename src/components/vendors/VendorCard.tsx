
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Phone, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    image?: string;
    type: string;
    phone: string;
    email: string;
    progress: number;
    tasks: {
      completed: number;
      total: number;
    };
    status: "available" | "busy" | "unavailable";
  };
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "busy":
        return <Badge className="bg-yellow-500">Busy</Badge>;
      case "unavailable":
        return <Badge className="bg-red-500">Unavailable</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="h-12 bg-event" />
      <CardContent className="pt-0 p-6">
        <div className="flex justify-between -mt-8">
          <Avatar className="h-16 w-16 border-4 border-white">
            <AvatarImage src={vendor.image} alt={vendor.name} />
            <AvatarFallback className="text-lg">
              {vendor.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          {getStatusBadge(vendor.status)}
        </div>
        
        <div className="mt-3">
          <h3 className="font-bold text-lg">{vendor.name}</h3>
          <p className="text-muted-foreground text-sm">{vendor.type}</p>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{vendor.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{vendor.email}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-medium">Task Progress</div>
            <div className="text-sm font-medium">
              {vendor.tasks.completed}/{vendor.tasks.total}
            </div>
          </div>
          <Progress value={vendor.progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button className="w-full" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VendorCard;
