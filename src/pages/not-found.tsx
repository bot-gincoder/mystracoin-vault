import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-bold text-foreground mb-3">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => setLocation("/dashboard")}
          className="rounded-xl px-8 h-12"
          data-testid="btn-go-home"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
