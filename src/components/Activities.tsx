import { BookOpen, Users, Lightbulb, Mic, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    icon: BookOpen,
    title: "Research",
    description: "Volunteers conduct in-depth research to create valuable career resources that benefit students exploring different paths.",
  },
  {
    icon: Mic,
    title: "Interviews",
    description: "Professional interviews with industry experts to support research and provide authentic career insights.",
  },
  {
    icon: Calendar,
    title: "Workshops",
    description: "Online and in-person workshops and activities to help students develop skills, network and explore career options.",
  },
  {
    icon: Users,
    title: "Chapters",
    description: "Student-led teams expanding access and creating impact in schools and communities worldwide.",
  },
  {
    icon: Lightbulb,
    title: "Guide",
    description: "Structured resources, mentorship pathways, and actionable steps for students to explore careers.",
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
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
          className="flex flex-wrap justify-center gap-8"
        >
          {/* First row - 3 cards */}
          <div className="grid md:grid-cols-3 gap-8 w-full">
            {activities.slice(0, 3).map((activity) => (
              <motion.div
                key={activity.title}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-lg cursor-pointer"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="icon-container mb-6">
                    <activity.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="font-display text-foreground text-2xl font-bold">
                      {activity.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row - 2 cards centered */}
          <div className="flex justify-center gap-8 w-full">
            {activities.slice(3, 5).map((activity) => (
              <motion.div
                key={activity.title}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-lg cursor-pointer w-full md:w-[calc(33.333%-1rem)]"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="icon-container mb-6">
                    <activity.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="font-display text-foreground text-2xl font-bold">
                      {activity.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;
