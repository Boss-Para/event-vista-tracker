
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface EventGalleryPreviewProps {
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
}

const EventGalleryPreview = ({ images }: EventGalleryPreviewProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Events</CardTitle>
        <Link 
          to="/gallery" 
          className="text-sm text-event hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {images.slice(0, 6).map((image, index) => (
            <div 
              key={image.id} 
              className={cn(
                "overflow-hidden rounded-md",
                index === 0 && "col-span-2 row-span-2"
              )}
            >
              <AspectRatio ratio={index === 0 ? 4/3 : 1}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventGalleryPreview;
