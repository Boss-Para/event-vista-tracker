
import MainLayout from "@/components/layout/MainLayout";
import EventGallery from "@/components/gallery/EventGallery";

// Mock data for gallery
const mockImages = [
  {
    id: "1",
    src: "/placeholder.svg",
    alt: "Corporate event with people networking",
    category: "corporate",
  },
  {
    id: "2",
    src: "/placeholder.svg",
    alt: "Wedding venue decoration",
    category: "wedding",
  },
  {
    id: "3",
    src: "/placeholder.svg",
    alt: "Birthday party setup",
    category: "birthday",
  },
  {
    id: "4",
    src: "/placeholder.svg",
    alt: "Conference stage setup",
    category: "corporate",
  },
  {
    id: "5",
    src: "/placeholder.svg",
    alt: "Wedding ceremony",
    category: "wedding",
  },
  {
    id: "6",
    src: "/placeholder.svg",
    alt: "Corporate dinner event",
    category: "corporate",
  },
  {
    id: "7",
    src: "/placeholder.svg",
    alt: "Wedding reception decorations",
    category: "wedding",
  },
  {
    id: "8",
    src: "/placeholder.svg",
    alt: "Kids birthday celebration",
    category: "birthday",
  },
  {
    id: "9",
    src: "/placeholder.svg",
    alt: "Product launch event",
    category: "corporate",
  },
];

const Gallery = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Event Gallery</h1>
        <p className="text-muted-foreground">Browse our past events</p>
      </div>

      <EventGallery images={mockImages} />
    </MainLayout>
  );
};

export default Gallery;
