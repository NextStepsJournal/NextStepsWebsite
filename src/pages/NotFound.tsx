import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center hero-overlay">
      <div className="text-center px-4">
        <h1 className="text-6xl font-display font-semibold text-primary-foreground mb-4">404</h1>
        <p className="text-xl text-primary-foreground/80 mb-8">
          Page not found
        </p>
        <Button variant="hero-secondary" asChild>
          <a href="/" className="inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
