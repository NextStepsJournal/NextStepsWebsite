import { ArrowRight, Globe, Newspaper, School, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const impactItems = [
  {
    icon: Newspaper,
    number: "4+",
    label: "Articles per chapter/year",
    description: "Each chapter publishes research-driven career content annually",
  },
  {
    icon: UserCheck,
    number: "100%",
    label: "Student-led",
    description: "Every interview, article, and chapter is run by high school students",
  },
  {
    icon: School,
    number: "Priority",
    label: "Under-resourced schools",
    description: "Content distributed to schools with greatest need first",
  },
  {
    icon: Globe,
    number: "National",
    label: "Reach",
    description: "Local chapters contributing to a shared national platform",
  },
];

const Impact = () => {
  return (
    <section id="impact" className="py-24 gradient-bg text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-coral-light font-semibold tracking-wide uppercase text-sm">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 mb-6">
            The Ripple Effect of <span className="italic font-normal">Student Leadership</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            When students lead, communities transform. Our global model ensures support 
            is rich, varied, and culturally aware.
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactItems.map((item, index) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 group"
            >
              <item.icon className="w-10 h-10 text-coral-light mb-4" />
              <div className="text-4xl font-display font-bold mb-2">
                {item.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.label}</h3>
              <p className="text-primary-foreground/70 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xl mb-6 text-primary-foreground/90">
            Ready to bring NextSteps to your school?
          </p>
          <Button 
            variant="hero-outline" 
            size="lg"
            className="group border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Start a Chapter Today
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Impact;
