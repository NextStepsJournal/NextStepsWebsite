import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "4+", label: "Articles per chapter/year" },
  { value: "100%", label: "Student-led" },
  { value: "Priority", label: "Under-resourced schools" },
  { value: "National", label: "Reach" },
];

const Impact = () => {
  return (
    <section id="impact" className="py-24 hero-overlay text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wide mb-3">
              Our Impact
            </p>
            <h2 className="text-display-md font-display font-semibold mb-6">
              The Ripple Effect
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-md">
              When students lead, communities transform. Local chapters contribute to a shared national platform.
            </p>
            <Button variant="hero-secondary" className="group">
              Start a Chapter Today
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10"
              >
                <div className="text-2xl font-mono-nums font-medium mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
