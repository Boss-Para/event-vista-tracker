
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  Moon,
  Sun,
  Lock,
  Settings as SettingsIcon,
  Smartphone,
  Calendar,
  CreditCard,
  Globe,
  Clock,
  Users,
  PieChart
} from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [userRole, setUserRole] = useState("company"); // company, vendor, client
  
  const [settings, setSettings] = useState({
    // Account settings
    enableTwoFactor: false,
    language: "English",
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    
    // Event preferences (for company)
    defaultEventType: "Wedding",
    templateBudgets: true,
    defaultVendors: true,
    autoAssign: false,
    eventPrivacy: "private",
    
    // App settings
    darkMode: theme === "dark",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeZone: "UTC-5",
    emailTemplates: true,
    paymentGateway: "Stripe",
    
    // Notification settings
    vendorAlerts: true,
    clientUpdates: true,
    teamReminders: true,
    deadlineAlerts: true,
    budgetAlerts: true,
    
    // Reporting settings
    clientProgress: true,
    vendorAnalytics: true,
    profitMargins: false,
    customReports: false,
    
    // Vendor management
    vendorApproval: true,
    ratingSystem: true,
    contractUpload: true
  });

  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    if (setting === "darkMode") {
      setTheme(value ? "dark" : "light");
    }
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">🔐 Account Security</h3>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button variant="outline" className="mt-2">Change Password</Button>
        </div>
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <Label htmlFor="twoFactor">Two-Factor Authentication (2FA)</Label>
          </div>
          <Switch
            id="twoFactor"
            checked={settings.enableTwoFactor}
            onCheckedChange={(checked) => handleSettingChange("enableTwoFactor", checked)}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1 ml-7">
          Add an extra layer of security to your account
        </p>
      </div>
      
      <div className="pt-2">
        <Label htmlFor="role">User Role</Label>
        <Select defaultValue={userRole} onValueChange={setUserRole}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">Company (Event Manager)</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
            <SelectItem value="client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="pt-2">
        <Label htmlFor="language">Language Preference</Label>
        <Select defaultValue={settings.language}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Hindi">Hindi</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderEventPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">🎯 Event Defaults</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="defaultEventType">Default Event Type</Label>
            <Select defaultValue={settings.defaultEventType}>
              <SelectTrigger className="mt-1">
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
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <Label htmlFor="templateBudgets">Use Template Event Budgets</Label>
            </div>
            <Switch
              id="templateBudgets"
              checked={settings.templateBudgets}
              onCheckedChange={(checked) => handleSettingChange("templateBudgets", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <Label htmlFor="defaultVendors">Set Default Vendors</Label>
            </div>
            <Switch
              id="defaultVendors"
              checked={settings.defaultVendors}
              onCheckedChange={(checked) => handleSettingChange("defaultVendors", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              <Label htmlFor="autoAssign">Auto-assign Policies</Label>
            </div>
            <Switch
              id="autoAssign"
              checked={settings.autoAssign}
              onCheckedChange={(checked) => handleSettingChange("autoAssign", checked)}
            />
          </div>
          
          <div className="pt-2">
            <Label htmlFor="eventPrivacy">Event Privacy</Label>
            <Select defaultValue={settings.eventPrivacy}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select privacy setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (for showcase)</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team-only">Team Only</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Controls who can view your events
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">📱 App Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <Label htmlFor="darkMode">Dark Mode</Label>
            </div>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
            />
          </div>
          
          <div className="pt-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue={settings.currency}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Select defaultValue={settings.dateFormat}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2">
            <Label htmlFor="timeZone">Time Zone</Label>
            <Select defaultValue={settings.timeZone}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC-12">UTC-12:00</SelectItem>
                <SelectItem value="UTC-11">UTC-11:00</SelectItem>
                <SelectItem value="UTC-10">UTC-10:00</SelectItem>
                <SelectItem value="UTC-9">UTC-09:00</SelectItem>
                <SelectItem value="UTC-8">UTC-08:00</SelectItem>
                <SelectItem value="UTC-7">UTC-07:00</SelectItem>
                <SelectItem value="UTC-6">UTC-06:00</SelectItem>
                <SelectItem value="UTC-5">UTC-05:00</SelectItem>
                <SelectItem value="UTC-4">UTC-04:00</SelectItem>
                <SelectItem value="UTC-3">UTC-03:00</SelectItem>
                <SelectItem value="UTC-2">UTC-02:00</SelectItem>
                <SelectItem value="UTC-1">UTC-01:00</SelectItem>
                <SelectItem value="UTC">UTC±00:00</SelectItem>
                <SelectItem value="UTC+1">UTC+01:00</SelectItem>
                <SelectItem value="UTC+2">UTC+02:00</SelectItem>
                <SelectItem value="UTC+3">UTC+03:00</SelectItem>
                <SelectItem value="UTC+4">UTC+04:00</SelectItem>
                <SelectItem value="UTC+5">UTC+05:00</SelectItem>
                <SelectItem value="UTC+5.5">UTC+05:30</SelectItem>
                <SelectItem value="UTC+6">UTC+06:00</SelectItem>
                <SelectItem value="UTC+7">UTC+07:00</SelectItem>
                <SelectItem value="UTC+8">UTC+08:00</SelectItem>
                <SelectItem value="UTC+9">UTC+09:00</SelectItem>
                <SelectItem value="UTC+10">UTC+10:00</SelectItem>
                <SelectItem value="UTC+11">UTC+11:00</SelectItem>
                <SelectItem value="UTC+12">UTC+12:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <Label htmlFor="emailTemplates">Email Templates</Label>
            </div>
            <Switch
              id="emailTemplates"
              checked={settings.emailTemplates}
              onCheckedChange={(checked) => handleSettingChange("emailTemplates", checked)}
            />
          </div>
          
          <div className="pt-2">
            <Label htmlFor="paymentGateway">Payment Gateway</Label>
            <Select defaultValue={settings.paymentGateway}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select payment gateway" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Stripe">Stripe</SelectItem>
                <SelectItem value="Razorpay">Razorpay</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">📢 Communication Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <Label htmlFor="emailNotifications">Email Notifications</Label>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
            </div>
            <Switch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <Label htmlFor="inAppNotifications">In-app Notifications</Label>
            </div>
            <Switch
              id="inAppNotifications"
              checked={settings.inAppNotifications}
              onCheckedChange={(checked) => handleSettingChange("inAppNotifications", checked)}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-4">🔔 Alert Types</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="vendorAlerts">Vendor Progress Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify when vendors update task status</p>
            </div>
            <Switch
              id="vendorAlerts"
              checked={settings.vendorAlerts}
              onCheckedChange={(checked) => handleSettingChange("vendorAlerts", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="clientUpdates">Client Update Triggers</Label>
              <p className="text-sm text-muted-foreground">Send client notifications on event milestones</p>
            </div>
            <Switch
              id="clientUpdates"
              checked={settings.clientUpdates}
              onCheckedChange={(checked) => handleSettingChange("clientUpdates", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="teamReminders">Internal Team Reminders</Label>
              <p className="text-sm text-muted-foreground">Communication between team members</p>
            </div>
            <Switch
              id="teamReminders"
              checked={settings.teamReminders}
              onCheckedChange={(checked) => handleSettingChange("teamReminders", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="deadlineAlerts">Task Deadline Alerts</Label>
              <p className="text-sm text-muted-foreground">Warnings for approaching deadlines</p>
            </div>
            <Switch
              id="deadlineAlerts"
              checked={settings.deadlineAlerts}
              onCheckedChange={(checked) => handleSettingChange("deadlineAlerts", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="budgetAlerts">Budget Change Alerts</Label>
              <p className="text-sm text-muted-foreground">Notifications when budget thresholds are reached</p>
            </div>
            <Switch
              id="budgetAlerts"
              checked={settings.budgetAlerts}
              onCheckedChange={(checked) => handleSettingChange("budgetAlerts", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">📊 Performance Insights</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="clientProgress">Client Progress View</Label>
              <p className="text-sm text-muted-foreground">Allow clients to see event progress</p>
            </div>
            <Switch
              id="clientProgress"
              checked={settings.clientProgress}
              onCheckedChange={(checked) => handleSettingChange("clientProgress", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="vendorAnalytics">Vendor Performance Analytics</Label>
              <p className="text-sm text-muted-foreground">Track vendor ratings and delivery metrics</p>
            </div>
            <Switch
              id="vendorAnalytics"
              checked={settings.vendorAnalytics}
              onCheckedChange={(checked) => handleSettingChange("vendorAnalytics", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profitMargins">Profit Margin Tracking</Label>
              <p className="text-sm text-muted-foreground">Monitor financial performance of events</p>
            </div>
            <Switch
              id="profitMargins"
              checked={settings.profitMargins}
              onCheckedChange={(checked) => handleSettingChange("profitMargins", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="customReports">Enable Custom Report Exports</Label>
              <p className="text-sm text-muted-foreground">Generate detailed CSV/PDF reports</p>
            </div>
            <Switch
              id="customReports"
              checked={settings.customReports}
              onCheckedChange={(checked) => handleSettingChange("customReports", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderVendorSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">🤝 Vendor Relationships</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="vendorApproval">Vendor Approval Workflow</Label>
              <p className="text-sm text-muted-foreground">Require approval for new vendors</p>
            </div>
            <Switch
              id="vendorApproval"
              checked={settings.vendorApproval}
              onCheckedChange={(checked) => handleSettingChange("vendorApproval", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ratingSystem">Enable Rating/Review System</Label>
              <p className="text-sm text-muted-foreground">Allow clients to rate vendors</p>
            </div>
            <Switch
              id="ratingSystem"
              checked={settings.ratingSystem}
              onCheckedChange={(checked) => handleSettingChange("ratingSystem", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="contractUpload">Enable Contract Uploads</Label>
              <p className="text-sm text-muted-foreground">Store vendor agreements securely</p>
            </div>
            <Switch
              id="contractUpload"
              checked={settings.contractUpload}
              onCheckedChange={(checked) => handleSettingChange("contractUpload", checked)}
            />
          </div>
          
          <div className="pt-2">
            <Button variant="outline">
              Manage Vendor Network
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-muted-foreground">Manage your app preferences</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="account">Account</TabsTrigger>
                {userRole === "company" && <TabsTrigger value="event">Event</TabsTrigger>}
                <TabsTrigger value="app">App</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                {userRole === "company" && <TabsTrigger value="reporting">Reporting</TabsTrigger>}
                {userRole === "company" && <TabsTrigger value="vendor">Vendors</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="account" className="space-y-4 pt-4">
                {renderAccountSettings()}
              </TabsContent>
              
              {userRole === "company" && (
                <TabsContent value="event" className="space-y-4 pt-4">
                  {renderEventPreferences()}
                </TabsContent>
              )}
              
              <TabsContent value="app" className="space-y-4 pt-4">
                {renderAppSettings()}
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4 pt-4">
                {renderNotificationSettings()}
              </TabsContent>
              
              {userRole === "company" && (
                <TabsContent value="reporting" className="space-y-4 pt-4">
                  {renderReportingSettings()}
                </TabsContent>
              )}
              
              {userRole === "company" && (
                <TabsContent value="vendor" className="space-y-4 pt-4">
                  {renderVendorSettings()}
                </TabsContent>
              )}
            </Tabs>

            <Button onClick={handleSave} className="mt-6">Save All Changes</Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
