
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Bell, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-muted-foreground">Manage your app preferences</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Theme</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <Label htmlFor="theme">Dark Mode</Label>
                </div>
                <Switch
                  id="theme"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, marketingEmails: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about security updates</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={settings.securityAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, securityAlerts: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
