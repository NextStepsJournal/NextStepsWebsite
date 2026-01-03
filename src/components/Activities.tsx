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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Activities = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background - same as hero */}
      <div className="absolute inset-0 hero-overlay opacity-90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wide mb-3">
            What We Do
          </p>
          <h2 className="text-display-lg font-display font-semibold text-primary-foreground">
            Our Activities
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {activities.map((activity) => (
            <motion.div 
              key={activity.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <activity.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {activity.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
