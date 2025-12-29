import { Compass, Eye, Shield, Star, Users } from "lucide-react";

const values = [
  {
    icon: Compass,
    title: "Access",
    description: "Opportunity should not depend on background or connections",
    color: "from-violet to-violet-light",
  },
  {
    icon: Eye,
    title: "Curiosity",
    description: "Asking questions drives discovery",
    color: "from-violet-light to-coral",
  },
  {
    icon: Shield,
    title: "Clarity",
    description: "Students deserve clear, realistic guidance",
    color: "from-coral to-coral-light",
  },
  {
    icon: Star,
    title: "Integrity",
    description: "Accurate, ethical, and respectful representation of professionals and careers",
    color: "from-coral-light to-secondary",
  },
  {
    icon: Users,
    title: "Student Leadership",
    description: "Students lead, create, and grow the organization",
    color: "from-secondary to-violet",
  },
];

const Values = () => {
  return (
    <section id="mission" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wide uppercase text-sm">
            Our Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Core Values That <span className="gradient-text italic">Guide Us</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            These principles shape everything we do, from how we conduct interviews to 
            how we support our chapters and communities.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full gradient-bg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
