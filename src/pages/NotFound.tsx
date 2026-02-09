import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const HOME_URL = "https://www.nextstepsjournal.com";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center hero-overlay">
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="container mx-auto px-4 pt-20 md:pt-24">
          <Breadcrumbs tone="dark" />
        </div>
      </div>
      <div className="text-center px-4">
        <h1 className="text-6xl font-display font-semibold text-primary-foreground mb-4">404</h1>
        <p className="text-xl text-primary-foreground/80 mb-8">
          Page not found
        </p>
        <Button variant="hero-secondary" asChild>
          <a href={HOME_URL} className="inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
