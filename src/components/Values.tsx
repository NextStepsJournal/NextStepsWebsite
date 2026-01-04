import { Compass, Eye, Shield, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Compass, title: "Access", description: "Opportunity independent of background" },
  { icon: Eye, title: "Curiosity", description: "Asking questions drives discovery" },
  { icon: Shield, title: "Clarity", description: "Clear, realistic guidance" },
  { icon: Star, title: "Integrity", description: "Accurate, ethical representation" },
  { icon: Users, title: "Student-Led", description: "Students lead the organization" },
];

const Values = () => {
  return (
    <section id="mission" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Our Foundation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
            Core Values
          </h2>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
