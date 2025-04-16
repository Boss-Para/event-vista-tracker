
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChatInterface from "@/components/chat/ChatInterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for chat contacts
const clientContacts = [
  {
    id: "client-1",
    name: "Smith Family",
    avatar: "/placeholder.svg",
    lastMessage: "What's the status of our venue booking?",
    timestamp: "10:30 AM",
    unread: 2,
  },
  {
    id: "client-2",
    name: "Johnson Wedding",
    avatar: "/placeholder.svg",
    lastMessage: "The cake samples look amazing!",
    timestamp: "Yesterday",
    unread: 0,
  },
  {
    id: "client-3",
    name: "Corporate Event Co.",
    avatar: "/placeholder.svg",
    lastMessage: "Can we discuss the budget changes?",
    timestamp: "Monday",
    unread: 1,
  },
];

const vendorContacts = [
  {
    id: "vendor-1",
    name: "Elegant Decor",
    avatar: "/placeholder.svg",
    lastMessage: "Floral samples ready for approval",
    timestamp: "2:15 PM",
    unread: 3,
  },
  {
    id: "vendor-2",
    name: "Gourmet Catering",
    avatar: "/placeholder.svg",
    lastMessage: "Updated the menu as requested",
    timestamp: "Yesterday",
    unread: 0,
  },
  {
    id: "vendor-3",
    name: "Sound Masters",
    avatar: "/placeholder.svg",
    lastMessage: "Need venue dimensions for setup",
    timestamp: "Tuesday",
    unread: 0,
  },
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState("clients");
  const [selectedContact, setSelectedContact] = useState(clientContacts[0]);
  const [selectedContactType, setSelectedContactType] = useState<"client" | "vendor">("client");

  const handleSelectContact = (contact: any, type: "client" | "vendor") => {
    setSelectedContact(contact);
    setSelectedContactType(type);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "clients") {
      setSelectedContact(clientContacts[0]);
      setSelectedContactType("client");
    } else {
      setSelectedContact(vendorContacts[0]);
      setSelectedContactType("vendor");
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with clients and vendors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
            </TabsList>

            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder={`Search ${activeTab === "clients" ? "clients" : "vendors"}...`}
              />
            </div>

            <TabsContent value="clients" className="m-0">
              <div className="space-y-2">
                {clientContacts.map((client) => (
                  <div
                    key={client.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                      selectedContact.id === client.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectContact(client, "client")}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>
                          {client.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {client.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {client.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{client.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {client.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {client.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="vendors" className="m-0">
              <div className="space-y-2">
                {vendorContacts.map((vendor) => (
                  <div
                    key={vendor.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                      selectedContact.id === vendor.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectContact(vendor, "vendor")}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={vendor.avatar} alt={vendor.name} />
                        <AvatarFallback>
                          {vendor.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {vendor.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {vendor.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{vendor.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {vendor.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {vendor.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2">
          {selectedContact && (
            <ChatInterface
              recipientType={selectedContactType}
              recipient={{
                id: selectedContact.id,
                name: selectedContact.name,
                avatar: selectedContact.avatar,
              }}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
