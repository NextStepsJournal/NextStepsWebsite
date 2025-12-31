import { BookOpen, Users, Lightbulb } from "lucide-react";

const activities = [
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
];

const Activities = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background - same as hero */}
      <div className="absolute inset-0 hero-overlay opacity-90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wide mb-3">
            What We Do
          </p>
          <h2 className="text-display-lg font-display font-semibold text-primary-foreground">
            Our Activities
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div 
              key={activity.title}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <activity.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {activity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
