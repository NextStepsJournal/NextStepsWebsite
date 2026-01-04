import { Compass, Eye, Shield, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Compass, title: "Access", description: "Opportunity independent of background" },
  { icon: Eye, title: "Curiosity", description: "Asking questions drives discovery" },
  { icon: Shield, title: "Clarity", description: "Clear, realistic guidance" },
  { icon: Star, title: "Integrity", description: "Accurate, ethical representation" },
  { icon: Users, title: "Student-Led", description: "Students lead and grow the organization" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const Values = () => {
  return (
    <section id="mission" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            Our Foundation
          </p>
          <h2 className="text-display-lg font-display font-semibold text-foreground">
            Core Values
          </h2>
        </motion.div>

        {/* Values - larger icons and text */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {values.map((value) => (
            <motion.div 
              key={value.title} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="text-center"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"
              >
                <value.icon className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="font-display font-bold text-[hsl(262_35%_18%)] text-2xl mb-2">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
