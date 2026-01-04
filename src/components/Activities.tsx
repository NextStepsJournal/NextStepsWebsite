import { BookOpen, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-primary-foreground">
            Our Activities
          </h2>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-background border border-border hover:border-primary/20 transition-colors group"
            >
              <activity.icon className="w-8 h-8 text-primary mb-6 group-hover:text-secondary transition-colors" />
              <h3 className="font-display text-2xl font-medium text-foreground mb-3">
                {activity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Activities;
