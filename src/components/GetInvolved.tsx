import { Button } from "@/components/ui/button";
import { ArrowRight, BookMarked, HandHeart, Mic2, PenTool } from "lucide-react";

const opportunities = [
  {
    icon: PenTool,
    title: "Start a Chapter",
    description: "Lead a team of student journalists in your school or region. Publish interviews, create content, and help peers explore careers.",
    cta: "Apply Now",
    highlight: true,
  },
  {
    icon: Mic2,
    title: "Be Interviewed",
    description: "Share your career journey with curious students. Your story could inspire someone to pursue their passion.",
    cta: "Volunteer",
    highlight: false,
  },
  {
    icon: BookMarked,
    title: "Partner With Us",
    description: "Schools, nonprofits, and organizations can partner to bring NextSteps resources to students who need them most.",
    cta: "Learn More",
    highlight: false,
  },
  {
    icon: HandHeart,
    title: "Donate",
    description: "Your contribution helps us reach more under-resourced schools and expand our mentorship programs.",
    cta: "Give Today",
    highlight: false,
  },
];

const GetInvolved = () => {
  return (
    <section id="involved" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wide uppercase text-sm">
            Join the Movement
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Get <span className="gradient-text italic">Involved</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a student, professional, educator, or supporter—there's a place 
            for you in the NextSteps community.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {opportunities.map((opp, index) => (
            <div
              key={opp.title}
              className={`group p-8 rounded-2xl border transition-all duration-300 hover:shadow-glow ${
                opp.highlight 
                  ? "gradient-bg border-transparent text-primary-foreground" 
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                opp.highlight 
                  ? "bg-primary-foreground/20" 
                  : "gradient-bg"
              }`}>
                <opp.icon className={`w-7 h-7 ${opp.highlight ? "text-primary-foreground" : "text-primary-foreground"}`} />
              </div>

              <h3 className={`font-display font-bold text-2xl mb-3 ${
                opp.highlight ? "" : "text-foreground"
              }`}>
                {opp.title}
              </h3>
              
              <p className={`mb-6 leading-relaxed ${
                opp.highlight ? "text-primary-foreground/85" : "text-muted-foreground"
              }`}>
                {opp.description}
              </p>

              <Button 
                variant={opp.highlight ? "hero-outline" : "outline"}
                className={`group/btn ${opp.highlight ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}`}
              >
                {opp.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
