import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Calendar, MapPin, Palette, Camera, Video, Film, Brush, Users, Speaker, Flower, Bus } from "lucide-react";
import { useState } from "react";
import VendorCalendar from "../vendors/VendorCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import ServiceVendorSelect from "./ServiceVendorSelect";

// Event type options
const eventTypes = [
  { id: "save-the-date", label: "Save the Date" },
  { id: "engagement", label: "Engagement" },
  { id: "marriage", label: "Marriage" },
  { id: "post-wedding", label: "Post-Wedding" },
  { id: "corporate", label: "Corporate Events" },
];

// Add sub-categories/service options for engagement and other services
const services = [
  {
    id: "photography", label: "Photography", icon: Camera,
    packages: ["Standard", "Premium"]
  },
  {
    id: "videography", label: "Videography", icon: Video,
    options: ["Live Stream", "Record"], extras: [{ id: "cd", label: "CD Copy" }]
  },
  {
    id: "cake", label: "Cake", icon: "cake",
    flavors: ["Chocolate", "Vanilla", "Red Velvet"],
    tiers: ["1", "2", "3"]
  },
  {
    id: "makeup", label: "Makeup", icon: Brush
  },
  {
    id: "sound", label: "Light & Sound", icon: "speaker",
    options: ["Live Band", "PA System"]
  },
  {
    id: "decor", label: "Decor", icon: "flower"
  },
  {
    id: "catering", label: "Catering", icon: "users",
    options: ["Veg", "Non-Veg", "Welcome Drinks", "Snacks"],
    courses: ["Main", "Dessert", "Cuisine Types"]
  },
  {
    id: "transport", label: "Transport", icon: "bus",
    guestOptions: ["Bus", "Traveller"],
    carOptions: ["Mercedes", "Audi", "Thar"]
  }
];

// Form schema for Save the Date
const saveTheDateSchema = z.object({
  eventName: z.string().min(2, { message: "Event name is required" }),
  client: z.string().min(2, { message: "Client name is required" }),
  date: z.date({ required_error: "Date is required" }),
  venue: z.string().min(2, { message: "Venue is required" }),
  theme: z.string().min(2, { message: "Theme is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  services: z.array(z.string()).optional(),
  budget: z.string().optional(),
  description: z.string().optional(),
});

const NewEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [serviceVendors, setServiceVendors] = useState<Record<string, string[]>>({});
  // Track which service is open for vendor selection
  const [openService, setOpenService] = useState<string | null>(null);
  // Extra options for services (by service id)
  const [serviceOptions, setServiceOptions] = useState<Record<string, any>>({});

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof saveTheDateSchema>>({
    resolver: zodResolver(saveTheDateSchema),
    defaultValues: {
      eventName: "",
      client: "",
      venue: "",
      theme: "",
      location: "",
      services: [],
      budget: "",
      description: "",
    },
  });

  // Calculate total/estimated price (mock + options)
  const calculateTotal = () => {
    let total = 0;
    Object.entries(serviceVendors).forEach(([serviceId, vendorIds]) => {
      const service = services.find(s => s.id === serviceId);
      if (!service) return;
      vendorIds.forEach(vId => {
        const mockArr = mockVendors[serviceId] || [];
        const vendor = mockArr.find(v => v.id === vId);
        if (!vendor) return;
        // add based on package, tier etc
        let pkgMultiplier = 1;
        if (serviceId === "photography" && serviceOptions["photography"]?.package === "Premium")
          pkgMultiplier = 1.35;
        if (serviceId === "cake" && serviceOptions["cake"]?.tier)
          pkgMultiplier = Number(serviceOptions["cake"].tier) || 1;
        // For demonstration, average price
        total += ((vendor.priceMin + vendor.priceMax) / 2) * pkgMultiplier;
      });
    });
    return total > 0 ? Math.round(total) : "";
  };

  const onSubmit = (data: z.infer<typeof saveTheDateSchema>) => {
    console.log("Form data:", {
      eventType,
      ...data,
      vendors: serviceVendors,
    });
    toast.success("Event created successfully!");
    setOpen(false);
    form.reset();
    setServiceVendors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Select an event type and provide the necessary details.
          </DialogDescription>
        </DialogHeader>

        {!eventType ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            {eventTypes.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent"
                onClick={() => setEventType(type.id)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="details">General Info</TabsTrigger>
              <TabsTrigger value="services">Services Required</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <VendorCalendar
                          selectedDate={field.value}
                          onDateSelect={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Venue</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                              <Input className="pl-8" placeholder="Enter venue" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Palette className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                              <Input className="pl-8" placeholder="Event theme" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter detailed location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event budget" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter event description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="services" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Select Required Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <FormField
                          key={service.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            const checked = field.value?.includes(service.id);
                            // Open accordion-like vendor select
                            const doOpen = openService === service.id;
                            return (
                              <FormItem key={service.id} className="flex flex-col border rounded-md p-4 mb-4 bg-gray-50 relative">
                                <div className="flex flex-row items-center space-x-3">
                                  <FormControl>
                                    <Checkbox
                                      checked={checked}
                                      onCheckedChange={(checkedVal) => {
                                        if (checkedVal) {
                                          // open this service options only
                                          field.onChange([...(field.value ?? []), service.id]);
                                          setOpenService(service.id);
                                        } else {
                                          field.onChange(field.value?.filter((v: string) => v !== service.id));
                                          setOpenService(null);
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="flex items-center">
                                    {/* Use string icon names with Lucide icon map */}
                                    {typeof service.icon === "string" ? (
                                      // fallback if not imported, use Camera for demo
                                      <Camera className="h-4 w-4 mr-2" />
                                    ) : (
                                      <service.icon className="h-4 w-4 mr-2" />
                                    )}
                                    {service.label}
                                  </FormLabel>
                                </div>
                                <FormDescription>
                                  Select to add {service.label.toLowerCase()} services
                                </FormDescription>
                                {/* Sub-categories/options for each service */}
                                {checked && (
                                  <div className="pt-2">
                                    {/* Photography sub-options */}
                                    {service.id === "photography" && (
                                      <div className="flex gap-4 flex-wrap mb-2 items-end">
                                        <label className="text-sm">Package:</label>
                                        <select
                                          value={serviceOptions["photography"]?.package ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            photography: { ...o.photography, package: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">Select Package</option>
                                          {service.packages.map(pkg => (
                                            <option value={pkg} key={pkg}>{pkg}</option>
                                          ))}
                                        </select>
                                        <button type="button" className="btn btn-sm ml-4 text-xs text-blue-600 underline">
                                          Create Photo Album
                                        </button>
                                      </div>
                                    )}
                                    {/* Videography sub-options */}
                                    {service.id === "videography" && (
                                      <div className="flex gap-4 flex-wrap mb-2 items-end">
                                        <label className="text-sm">Option:</label>
                                        <select
                                          value={serviceOptions["videography"]?.option ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            videography: { ...o.videography, option: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">Select</option>
                                          {service.options.map(opt => (
                                            <option value={opt} key={opt}>{opt}</option>
                                          ))}
                                        </select>
                                        <label className="flex items-center gap-2 text-xs ml-8">
                                          <input
                                            type="checkbox"
                                            checked={serviceOptions["videography"]?.cd ?? false}
                                            onChange={e =>
                                              setServiceOptions(o => ({
                                                ...o,
                                                videography: { ...o.videography, cd: e.target.checked }
                                              }))
                                            }
                                          />
                                          CD Copy
                                        </label>
                                      </div>
                                    )}
                                    {/* Cake sub-options */}
                                    {service.id === "cake" && (
                                      <div className="flex gap-4 flex-wrap mb-2 items-end">
                                        <label className="text-sm">Flavor:</label>
                                        <select
                                          value={serviceOptions["cake"]?.flavor ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            cake: { ...o.cake, flavor: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">Select Flavor</option>
                                          {service.flavors.map(fl => (
                                            <option value={fl} key={fl}>{fl}</option>
                                          ))}
                                        </select>
                                        <label className="text-sm ml-6">Tiers:</label>
                                        <select
                                          value={serviceOptions["cake"]?.tier ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            cake: { ...o.cake, tier: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">1</option>
                                          {service.tiers.map(tr => (
                                            <option value={tr} key={tr}>{tr}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                    {/* Light & Sound sub-options */}
                                    {service.id === "sound" && (
                                      <div className="flex gap-4 flex-wrap mb-2 items-end">
                                        <label className="text-sm">Type:</label>
                                        <select
                                          value={serviceOptions["sound"]?.option ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            sound: { ...o.sound, option: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">Select</option>
                                          {service.options.map(opt => (
                                            <option value={opt} key={opt}>{opt}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                    {/* Catering sub-options */}
                                    {service.id === "catering" && (
                                      <div className="flex gap-4 flex-wrap mb-2 items-end">
                                        <label className="text-sm">Type:</label>
                                        <select
                                          value={serviceOptions["catering"]?.option ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            catering: { ...o.catering, option: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">Select</option>
                                          {service.options.map(opt => (
                                            <option value={opt} key={opt}>{opt}</option>
                                          ))}
                                        </select>
                                        <label className="text-sm ml-6">Course:</label>
                                        <select
                                          value={serviceOptions["catering"]?.course ?? ""}
                                          onChange={e => setServiceOptions(o => ({
                                            ...o,
                                            catering: { ...o.catering, course: e.target.value }
                                          }))}
                                          className="border rounded px-2 py-1"
                                        >
                                          <option value="">Select</option>
                                          {service.courses.map(cs => (
                                            <option value={cs} key={cs}>{cs}</option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                    {/* Transport sub-options */}
                                    {service.id === "transport" && (
                                      <div>
                                        <div className="flex gap-4 flex-wrap mb-2 items-end">
                                          <label className="text-sm">Guest:</label>
                                          <select
                                            value={serviceOptions["transport"]?.guest ?? ""}
                                            onChange={e => setServiceOptions(o => ({
                                              ...o,
                                              transport: { ...o.transport, guest: e.target.value }
                                            }))}
                                            className="border rounded px-2 py-1"
                                          >
                                            <option value="">Select</option>
                                            {service.guestOptions.map(opt => (
                                              <option value={opt} key={opt}>{opt}</option>
                                            ))}
                                          </select>
                                          <label className="text-sm ml-6">Bride & Groom:</label>
                                          <select
                                            value={serviceOptions["transport"]?.car ?? ""}
                                            onChange={e => setServiceOptions(o => ({
                                              ...o,
                                              transport: { ...o.transport, car: e.target.value }
                                            }))}
                                            className="border rounded px-2 py-1"
                                          >
                                            <option value="">Select Car</option>
                                            {service.carOptions.map(cr => (
                                              <option value={cr} key={cr}>{cr}</option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    )}
                                    {/* DECOR/MAKEUP: samples only (no special options) */}
                                    {/* Show Vendor Select only for open service */}
                                    <ServiceVendorSelect
                                      serviceId={service.id}
                                      selectedVendors={serviceVendors[service.id] || []}
                                      setSelectedVendors={vendorIds => setServiceVendors(s => ({ ...s, [service.id]: vendorIds }))}
                                      open={doOpen}
                                      onToggleOpen={() => setOpenService(doOpen ? null : service.id)}
                                    />
                                  </div>
                                )}
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t">
                      <span className="font-semibold">Estimated Total Price (approx):</span>
                      <span className="font-mono text-lg text-blue-700">{calculateTotal() ? `₹${calculateTotal().toLocaleString()}` : "--"}</span>
                    </div>
                  </div>
                </TabsContent>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => eventType ? setEventType("") : setOpen(false)}
                  >
                    {eventType ? "Back" : "Cancel"}
                  </Button>
                  <Button type="submit">Create Event</Button>
                </div>
              </form>
            </Form>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewEventDialog;
