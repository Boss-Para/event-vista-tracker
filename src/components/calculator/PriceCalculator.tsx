
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const PriceCalculator = () => {
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [newService, setNewService] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");

  const addService = () => {
    if (newService && newPrice) {
      const service = {
        id: Date.now().toString(),
        name: newService,
        quantity: parseInt(newQuantity) || 1,
        price: parseFloat(newPrice) || 0
      };
      setServices([...services, service]);
      setNewService("");
      setNewPrice("");
      setNewQuantity("1");
    }
  };

  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const calculateTotal = () => {
    return services.reduce((total, service) => {
      return total + (service.price * service.quantity);
    }, 0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Event Price Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger id="eventType">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate Event</SelectItem>
                <SelectItem value="birthday">Birthday Party</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guestCount">Guest Count</Label>
            <Input
              id="guestCount"
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="Number of guests"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Services and Items</Label>

          <div className="grid gap-2 md:grid-cols-7">
            <div className="md:col-span-3">
              <Input
                placeholder="Service or item name"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
            </div>
            <div className="md:col-span-1">
              <Input
                type="number"
                placeholder="Qty"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                min="1"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                type="number"
                placeholder="Price per unit"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div className="md:col-span-1">
              <Button onClick={addService} className="w-full" type="button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          {services.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service/Item</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell className="text-right">{service.quantity}</TableCell>
                    <TableCell className="text-right">${service.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${(service.price * service.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeService(service.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <div className="text-lg font-medium">Total Price:</div>
        <div className="text-2xl font-bold text-event">
          ${calculateTotal().toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PriceCalculator;
