import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Wallet, History, Settings, LogOut, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser } from "@/data/mock";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Wallet, label: "Wallet", path: "/wallets" },
    { icon: History, label: "History", path: "/transactions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-sidebar h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mystracoin Vault
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer hover:bg-primary/10",
                  location === item.path
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {mockUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
            </div>
          </div>
          <Link href="/login">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 cursor-pointer transition-colors" data-testid="nav-logout">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0">
        {/* Mobile Header & Desktop Top Bar */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
          <h2 className="text-lg font-semibold md:hidden">{title}</h2>
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors" data-testid="btn-notifications">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background"></span>
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-sidebar border-t border-border z-40 flex items-center justify-around px-2 pb-safe">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer transition-colors",
                location === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              data-testid={`mobilenav-${item.label.toLowerCase()}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}