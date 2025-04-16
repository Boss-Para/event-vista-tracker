
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";

const ClientChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "manager",
      content: "Hello! How can I help you with your event today?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      sender: "client",
      content: "I wanted to ask about the venue options.",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      sender: "manager",
      content: "Of course! We have several venues available for your event date. Would you like to schedule a tour?",
      timestamp: new Date(Date.now() - 1700000),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: "client",
      content: message,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate reply from event manager
    setTimeout(() => {
      const managerReply = {
        id: (Date.now() + 1).toString(),
        sender: "manager",
        content: "Thanks for your message! I'll get back to you shortly.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, managerReply]);
    }, 1000);
    
    toast.success("Message sent to your event manager");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[70vh] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Event Manager" />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Your Event Manager</h3>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "client" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      msg.sender === "client"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "client"
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type a message..."
                className="min-h-[60px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button className="h-full" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ClientChatWidget;
