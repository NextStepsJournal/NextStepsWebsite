import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  return (
    <section id="involved" className="relative py-24 overflow-hidden">
      {/* Gradient background - same as hero */}
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wide mb-3">
            Join the Movement
          </p>
          <h2 className="text-display-lg font-display font-semibold text-primary-foreground mb-6">
            Get Involved
          </h2>
          <p className="text-lg text-primary-foreground/85 mb-10 leading-relaxed">
            There are many ways to contribute to our mission. Choose how you'd like to make an impact.
          </p>
          
          {/* Single CTA Button */}
          <Button 
            variant="hero-primary" 
            size="lg" 
            className="group"
            asChild
          >
            <Link to="/get-involved">
              Start Here
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;