import { Button } from "@/components/ui/button";
import { ArrowRight, BookMarked, HandHeart, Mic2, PenTool } from "lucide-react";

const opportunities = [
  {
    icon: PenTool,
    title: "Start a Chapter",
    description: "Lead a team in your school. Publish interviews and help peers explore careers.",
    cta: "Apply Now",
    featured: true,
  },
  {
    icon: Mic2,
    title: "Be Interviewed",
    description: "Share your career journey with curious students.",
    cta: "Volunteer",
    featured: false,
  },
  {
    icon: BookMarked,
    title: "Partner",
    description: "Schools and organizations can bring NextSteps to students.",
    cta: "Learn More",
    featured: false,
  },
  {
    icon: HandHeart,
    title: "Donate",
    description: "Help us reach more under-resourced schools.",
    cta: "Give",
    featured: false,
  },
];

const GetInvolved = () => {
  return (
    <section id="involved" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            Join the Movement
          </p>
          <h2 className="text-display-md font-display font-semibold text-foreground">
            Get Involved
          </h2>
        </div>

        {/* Opportunities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.title}
              className={`p-6 rounded-lg border transition-colors ${
                opp.featured 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              <opp.icon className={`w-5 h-5 mb-4 ${opp.featured ? "text-primary-foreground" : "text-primary"}`} />
              
              <h3 className={`font-semibold mb-2 ${opp.featured ? "" : "text-foreground"}`}>
                {opp.title}
              </h3>
              
              <p className={`text-sm mb-4 leading-relaxed ${
                opp.featured ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {opp.description}
              </p>

              <Button 
                variant={opp.featured ? "hero-secondary" : "outline"}
                size="sm"
                className="group"
              >
                {opp.cta}
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
