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
    <section id="mission" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            Our Foundation
          </p>
          <h2 className="text-display-md font-display font-semibold text-foreground">
            Core Values
          </h2>
        </div>

        {/* Values - larger icons and text */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <value.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-xl mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-base">
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