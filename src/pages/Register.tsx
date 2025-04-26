
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyRegistrationForm from "@/components/auth/CompanyRegistrationForm";
import VendorRegistrationForm from "@/components/auth/VendorRegistrationForm";
import ClientRegistrationForm from "@/components/auth/ClientRegistrationForm";
import { Building2, Users, User } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("company");

  const handleCompanySubmit = (data: any) => {
    // Handle company registration
    console.log("Company registration:", data);
    toast.success("Successfully registered!");
    navigate("/");
  };

  const handleVendorSubmit = (data: any) => {
    // Handle vendor registration
    console.log("Vendor registration:", data);
    toast.success("Successfully registered!");
    navigate("/");
  };

  const handleClientSubmit = (data: any) => {
    // Handle client registration
    console.log("Client registration:", data);
    toast.success("Successfully registered!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-event mx-auto flex items-center justify-center">
            <span className="text-white font-semibold text-lg">EV</span>
          </div>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="company" className="w-full" onValueChange={setRole}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Event Company</span>
              </TabsTrigger>
              <TabsTrigger value="vendor" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Vendor</span>
              </TabsTrigger>
              <TabsTrigger value="client" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Client</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="company">
                <CompanyRegistrationForm onSubmit={handleCompanySubmit} />
              </TabsContent>
              <TabsContent value="vendor">
                <VendorRegistrationForm onSubmit={handleVendorSubmit} />
              </TabsContent>
              <TabsContent value="client">
                <ClientRegistrationForm onSubmit={handleClientSubmit} />
              </TabsContent>

              <div className="mt-6 space-y-4">
                <Button type="submit" className="w-full" onClick={() => {
                  const form = document.querySelector('form');
                  if (form) form.requestSubmit();
                }}>
                  Register as {role === 'company' ? 'Event Company' : role === 'vendor' ? 'Vendor' : 'Client'}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
