import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Home, 
  Users, 
  Image, 
  LineChart, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Vendors", href: "/vendors", icon: Users },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Reports", href: "/reports", icon: LineChart },
  { name: "Chat", href: "/chat", icon: MessageCircle },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 left-3 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-black/50 transition-opacity",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      >
        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-64 bg-white transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between h-14 px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-event flex items-center justify-center">
                <span className="text-white font-semibold">EV</span>
              </div>
              <span className="font-semibold text-lg">Event Vista</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-gray-200 bg-white transition-all",
          expanded ? "w-64" : "w-16"
        )}
      >
        <div
          className={cn(
            "flex h-14 items-center border-b px-4",
            expanded ? "justify-between" : "justify-center"
          )}
        >
          {expanded ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-event flex items-center justify-center">
                  <span className="text-white font-semibold">EV</span>
                </div>
                <span className="font-semibold text-lg">Event Vista</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpanded(false)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(true)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
        <nav className={cn("flex-1 overflow-y-auto p-2")}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md my-1 hover:bg-gray-100",
                expanded ? "px-3 py-2 text-gray-700" : "justify-center p-2"
              )}
            >
              <item.icon className="h-5 w-5" />
              {expanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
