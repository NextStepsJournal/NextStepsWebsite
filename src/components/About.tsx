import { BookOpen, Users, Lightbulb, Heart } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Publish",
    description: "Student-led journal featuring interviews with professionals across diverse fields",
  },
  {
    icon: Users,
    title: "Chapters",
    description: "Student-led teams expanding access and impact in schools nationwide",
  },
  {
    icon: Lightbulb,
    title: "Guide",
    description: "Structured resources and mentorship pathways for students",
  },
  {
    icon: Heart,
    title: "Prioritize",
    description: "Educational content distributed first to under-resourced schools",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <p className="text-sm font-medium text-primary uppercase tracking-wide">
              About NextSteps
            </p>
            <h2 className="text-display-md font-display font-semibold text-foreground">
              Guiding Students Toward Meaningful Futures
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Too many students make life-defining decisions without seeing what's truly possible. For those without professional networks or mentors, careers feel abstract and out of reach.
              </p>
              <p>
                We translate real-world experiences into clear, actionable pathways. Access to opportunity shouldn't depend on zip code, income, or background.
              </p>
            </div>

            <blockquote className="border-l-2 border-primary pl-4 py-2 mt-8">
              <p className="text-foreground italic font-display text-lg">
                "Not about telling students who to become—it's about giving them clarity to decide for themselves."
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                Landon Mahler, Founder
              </footer>
            </blockquote>
          </div>

          {/* Right Column - Cards */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar.title}
                className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <pillar.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
