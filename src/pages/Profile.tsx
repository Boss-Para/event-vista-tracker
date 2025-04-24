
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Link,
  Calendar,
  Users,
} from "lucide-react";

const Profile = () => {
  const [userRole, setUserRole] = useState("company"); // Options: company, vendor, client
  const [profileData, setProfileData] = useState({
    // Common fields
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    role: userRole,
    
    // Company specific
    companyName: "Event Vista",
    website: "www.eventvista.com",
    socialMedia: "instagram.com/eventvista",
    officeLocation: "123 Event St, New York, NY",
    about: "Premier event management company specializing in corporate and wedding events.",
    taxId: "GST123456789",
    preferredServices: ["Wedding", "Corporate"],
    teamMembers: ["Jane Smith", "Mike Johnson"],
    
    // Vendor specific
    vendorType: "Catering",
    serviceArea: "New York Metro Area",
    ratings: "4.8/5",
    
    // Client specific
    eventType: "Wedding",
    eventDate: "2025-08-15",
    venue: "Grand Plaza Hotel",
    budget: "$10,000 - $15,000",
    notes: "Looking for a sophisticated wedding setup with a modern touch.",
    eventManager: "Sarah Williams"
  });

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    setProfileData({ ...profileData, role: newRole });
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  const renderCompanyFields = () => (
    <div className="grid gap-6 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={profileData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <div className="flex items-center">
          <Link className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="website"
            value={profileData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="socialMedia">Social Media</Label>
        <div className="flex items-center">
          <Link className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="socialMedia"
            value={profileData.socialMedia}
            onChange={(e) => handleChange("socialMedia", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="officeLocation">Office Location</Label>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="officeLocation"
            value={profileData.officeLocation}
            onChange={(e) => handleChange("officeLocation", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          value={profileData.about}
          onChange={(e) => handleChange("about", e.target.value)}
          className="min-h-24"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="taxId">GST / Tax ID</Label>
        <Input
          id="taxId"
          value={profileData.taxId}
          onChange={(e) => handleChange("taxId", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="preferredServices">Preferred Services</Label>
        <Select defaultValue="Wedding">
          <SelectTrigger>
            <SelectValue placeholder="Select services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Wedding">Wedding</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="Birthday">Birthday</SelectItem>
            <SelectItem value="Conference">Conference</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="teamMembers">Team Members</Label>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="teamMembers"
            value={profileData.teamMembers.join(", ")}
            onChange={(e) => handleChange("teamMembers", e.target.value.split(", "))}
          />
        </div>
      </div>
    </div>
  );

  const renderVendorFields = () => (
    <div className="grid gap-6 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="vendorType">Vendor Type</Label>
        <Select defaultValue={profileData.vendorType}>
          <SelectTrigger>
            <SelectValue placeholder="Select vendor type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Catering">Catering</SelectItem>
            <SelectItem value="Decor">Decor</SelectItem>
            <SelectItem value="Photography">Photography</SelectItem>
            <SelectItem value="Videography">Videography</SelectItem>
            <SelectItem value="Lights">Lights & Sound</SelectItem>
            <SelectItem value="DJ">DJ</SelectItem>
            <SelectItem value="Cake">Cake</SelectItem>
            <SelectItem value="Makeup">Makeup</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="serviceArea">Service Area</Label>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="serviceArea"
            value={profileData.serviceArea}
            onChange={(e) => handleChange("serviceArea", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ratings">Ratings</Label>
        <Input
          id="ratings"
          value={profileData.ratings}
          readOnly
          className="bg-gray-100"
        />
      </div>
      <div className="grid gap-2">
        <Label>Work Gallery</Label>
        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
          <Button variant="outline" className="w-full">
            Upload Sample Work
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Drag and drop files or click to browse
          </p>
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Assigned Events</Label>
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm">No events assigned yet.</p>
        </div>
      </div>
    </div>
  );

  const renderClientFields = () => (
    <div className="grid gap-6 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="eventType">Event Type</Label>
        <Select defaultValue={profileData.eventType}>
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Wedding">Wedding</SelectItem>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="Birthday">Birthday</SelectItem>
            <SelectItem value="Anniversary">Anniversary</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="eventDate">Event Date</Label>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="eventDate"
            type="date"
            value={profileData.eventDate}
            onChange={(e) => handleChange("eventDate", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="venue">Venue</Label>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="venue"
            value={profileData.venue}
            onChange={(e) => handleChange("venue", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="budget">Budget Range</Label>
        <Input
          id="budget"
          value={profileData.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes/Preferences</Label>
        <Textarea
          id="notes"
          value={profileData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="min-h-24"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="eventManager">Assigned Event Manager</Label>
        <Input
          id="eventManager"
          value={profileData.eventManager}
          readOnly
          className="bg-gray-100"
        />
      </div>
    </div>
  );

  const renderCommonFields = () => (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="flex items-center">
          <User className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            value={profileData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            value={profileData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <div className="flex items-center">
          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
          <Select defaultValue={userRole} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="company">Company (Event Manager)</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>
                  {profileData.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">My Profile</h2>
                <p className="text-muted-foreground">Manage your personal information</p>
              </div>
              
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="role-specific">Role Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  {renderCommonFields()}
                </TabsContent>
                
                <TabsContent value="role-specific" className="space-y-4">
                  {userRole === "company" && renderCompanyFields()}
                  {userRole === "vendor" && renderVendorFields()}
                  {userRole === "client" && renderClientFields()}
                </TabsContent>
              </Tabs>
              
              <Button className="w-fit" onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
