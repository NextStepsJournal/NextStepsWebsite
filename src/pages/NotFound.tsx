import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center gradient-bg">
      <div className="text-center px-4">
        <h1 className="text-8xl font-display font-bold text-primary-foreground mb-4">404</h1>
        <p className="text-2xl text-primary-foreground/80 mb-8 font-light">
          Oops! This page doesn't exist
        </p>
        <Button variant="hero-outline" size="lg" asChild>
          <a href="/" className="inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
