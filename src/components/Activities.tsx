import { BookOpen, Users, Lightbulb, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    icon: BookOpen,
    title: "Publish",
    description: "Student-led journal featuring in-depth interviews with professionals across diverse fields and industries.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Users,
    title: "Chapters",
    description: "Student-led teams expanding access and creating impact in schools and communities nationwide.",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Lightbulb,
    title: "Guide",
    description: "Structured resources, mentorship pathways, and actionable steps for students to explore careers.",
    color: "from-primary/15 to-secondary/10",
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Activities = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h2 className="text-display-lg font-display font-semibold text-primary-foreground">
            Our Activities
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {activities.map((activity) => (
            <motion.div 
              key={activity.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="icon-container mb-6 group-hover:scale-110 transition-transform duration-300">
                  <activity.icon className="w-7 h-7 text-primary" />
                </div>
                
                {/* Title with arrow */}
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-display font-semibold text-foreground text-2xl">
                    {activity.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;