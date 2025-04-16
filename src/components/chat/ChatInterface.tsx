
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Paperclip } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ChatMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    type: "client" | "vendor" | "manager";
  };
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  recipientType: "client" | "vendor";
  recipient: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const ChatInterface = ({ recipientType, recipient }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: {
        id: "manager-1",
        name: "Event Manager",
        type: "manager",
      },
      content: "Hello! How can I assist you with your event planning today?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      sender: {
        id: recipient.id,
        name: recipient.name,
        avatar: recipient.avatar,
        type: recipientType,
      },
      content: "Hi! I wanted to check on the progress of our floral arrangements.",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: ChatMessage = {
      id: `message-${Date.now()}`,
      sender: {
        id: "manager-1",
        name: "Event Manager",
        type: "manager",
      },
      content: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    toast.success("Message sent");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[calc(100vh-200px)] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={recipient.avatar} alt={recipient.name} />
            <AvatarFallback>{recipient.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{recipient.name}</CardTitle>
            <p className="text-sm text-muted-foreground capitalize">{recipientType}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender.type === "manager" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    msg.sender.type === "manager"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender.type === "manager"
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
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
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-9 w-9" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
