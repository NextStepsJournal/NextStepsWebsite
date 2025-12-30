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
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            What We Do
          </p>
          <h2 className="text-display-md font-display font-semibold text-foreground">
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