
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface VendorOverviewProps {
  vendors: {
    id: string;
    name: string;
    image?: string;
    progress: number;
    tasks: {
      completed: number;
      total: number;
    };
    status: "available" | "busy" | "unavailable";
  }[];
}

const VendorOverview = ({ vendors }: VendorOverviewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Vendor Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={vendor.image} alt={vendor.name} />
                  <AvatarFallback>
                    {vendor.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${getStatusColor(vendor.status)}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium truncate">{vendor.name}</p>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {vendor.tasks.completed}/{vendor.tasks.total} Tasks
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={vendor.progress} className="h-2 flex-1" />
                  <span className="text-xs font-medium min-w-8 text-right">
                    {vendor.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorOverview;
