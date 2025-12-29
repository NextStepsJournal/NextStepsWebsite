import { Compass, Eye, Shield, Star, Users } from "lucide-react";

const values = [
  { icon: Compass, title: "Access", description: "Opportunity independent of background" },
  { icon: Eye, title: "Curiosity", description: "Asking questions drives discovery" },
  { icon: Shield, title: "Clarity", description: "Clear, realistic guidance" },
  { icon: Star, title: "Integrity", description: "Accurate, ethical representation" },
  { icon: Users, title: "Student-Led", description: "Students lead and grow the organization" },
];

const Values = () => {
  return (
    <section id="mission" className="py-24 section-alt">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            Our Foundation
          </p>
          <h2 className="text-display-md font-display font-semibold text-foreground">
            Core Values
          </h2>
        </div>

        {/* Values - horizontal layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
