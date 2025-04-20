import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Calendar, MapPin, Palette, Camera, Video, Film, Brush } from "lucide-react";
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

// Services for Save the Date
const services = [
  { id: "photography", label: "Photography", icon: Camera },
  { id: "videography", label: "Videography", icon: Video },
  { id: "reels", label: "Reels", icon: Film },
  { id: "makeup", label: "Makeup", icon: Brush },
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                            return (
                              <FormItem key={service.id} className="flex flex-col border rounded-md p-4 mb-4">
                                <div className="flex flex-row items-center space-x-3">
                                  <FormControl>
                                    <Checkbox
                                      checked={checked}
                                      onCheckedChange={(checkedVal) => {
                                        if (checkedVal) {
                                          field.onChange([...(field.value ?? []), service.id]);
                                        } else {
                                          field.onChange(field.value?.filter((v: string) => v !== service.id));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="flex items-center">
                                    <service.icon className="h-4 w-4 mr-2" />
                                    {service.label}
                                  </FormLabel>
                                </div>
                                <FormDescription>
                                  Select to add {service.label.toLowerCase()} services
                                </FormDescription>
                                {checked && (
                                  <ServiceVendorSelect
                                    serviceId={service.id}
                                    selectedVendors={serviceVendors[service.id] || []}
                                    setSelectedVendors={(vendorIds) => setServiceVendors(s => ({ ...s, [service.id]: vendorIds }))}
                                  />
                                )}
                              </FormItem>
                            );
                          }}
                        />
                      ))}
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
