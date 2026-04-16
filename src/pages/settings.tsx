import { useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/layouts/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockUser } from "@/data/mock";
import { toast } from "sonner";
import { LogOut, User, Shield, Bell, Key, Moon } from "lucide-react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setLocation("/login");
  };

  return (
    <AppLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="w-full flex flex-col md:flex-row gap-8">
          <TabsList className="flex md:flex-col h-auto bg-transparent p-0 gap-2 w-full md:w-48 overflow-x-auto justify-start border-b md:border-b-0 border-border pb-2 md:pb-0 mb-4 md:mb-0 scrollbar-hide">
            <TabsTrigger value="profile" className="rounded-xl justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm w-full">
              <User className="w-4 h-4 mr-2 hidden md:block" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm w-full">
              <Shield className="w-4 h-4 mr-2 hidden md:block" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-xl justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm w-full">
              <Bell className="w-4 h-4 mr-2 hidden md:block" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 space-y-6">
            <TabsContent value="profile" className="mt-0">
              <Card className="rounded-[2rem] border-border shadow-md bg-card/50">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-3xl">
                      {mockUser.name.charAt(0).toUpperCase()}
                    </div>
                    <Button variant="outline" className="rounded-xl">Change Avatar</Button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={mockUser.name} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input defaultValue={mockUser.email} disabled className="h-12 rounded-xl bg-muted/50" />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input defaultValue={mockUser.phone} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Input defaultValue={mockUser.country} className="h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button type="submit" disabled={isSaving} className="rounded-xl px-8" data-testid="btn-save-profile">
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-6">
              <Card className="rounded-[2rem] border-border shadow-md bg-card/50">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                    </div>
                    <Button type="button" className="rounded-xl mt-2">Update Password</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-border shadow-md bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Key className="w-4 h-4 text-primary" /> Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Switch defaultChecked data-testid="switch-2fa" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-0 space-y-6">
              {/* Display & Currency */}
              <Card className="rounded-[2rem] border-border shadow-md bg-card/50">
                <CardHeader>
                  <CardTitle>Display & Currency</CardTitle>
                  <CardDescription>Customize how balances and amounts appear</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Display Currency</h4>
                      <p className="text-sm text-muted-foreground">Currency used for balance equivalents</p>
                    </div>
                    <Select value={currency} onValueChange={(v) => { setCurrency(v); toast.success(`Currency set to ${v}`); }}>
                      <SelectTrigger className="w-28 rounded-xl" data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex items-center gap-3">
                      <Moon className="w-4 h-4 text-primary" />
                      <div>
                        <h4 className="font-medium">Dark Theme</h4>
                        <p className="text-sm text-muted-foreground">Use dark mode across the app</p>
                      </div>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={(v) => { setDarkMode(v); toast.success(v ? "Dark theme enabled" : "Light theme enabled"); }}
                      data-testid="switch-dark-mode"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="rounded-[2rem] border-border shadow-md bg-card/50">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what we notify you about</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Email Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your devices.</p>
                    </div>
                    <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-sm text-muted-foreground">Receive news, updates, and special offers.</p>
                    </div>
                    <Switch checked={marketing} onCheckedChange={setMarketing} />
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="rounded-[2rem] border-destructive/20 shadow-md bg-destructive/5 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                      <h4 className="text-destructive font-semibold">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground mt-1">Sign out of your account on this device.</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="rounded-xl w-full sm:w-auto"
                      onClick={() => setShowLogout(true)}
                      data-testid="btn-logout-settings"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of Mystracoin Vault?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setShowLogout(false)} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={handleLogout} className="rounded-xl" data-testid="btn-confirm-logout">
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}