import { Compass, Eye, Shield, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
const values = [{
  icon: Compass,
  title: "Access",
  description: "Opportunity independent of background"
}, {
  icon: Eye,
  title: "Curiosity",
  description: "Asking questions drives discovery"
}, {
  icon: Shield,
  title: "Clarity",
  description: "Clear, realistic guidance"
}, {
  icon: Star,
  title: "Integrity",
  description: "Accurate, ethical representation"
}, {
  icon: Users,
  title: "Student-Led",
  description: "Students lead and grow the organization"
}];
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};
const Values = () => {
  return <section id="mission" className="py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.6
      }} className="section-header">
          <span className="section-label text-primary">Our Foundation</span>
          <h2 className="section-title">Core Values</h2>
        </motion.div>

        {/* Values grid */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {values.map(value => <motion.div key={value.title} variants={itemVariants} className="group text-center">
              <motion.div whileHover={{
            y: -8,
            transition: {
              duration: 0.3
            }
          }} className="flex flex-col items-center">
                {/* Icon circle */}
                <motion.div whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: {
                duration: 0.4
              }
            }} className="relative w-20 h-20 mb-6">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon container */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-accent to-muted flex items-center justify-center transition-colors duration-300 border-primary border-0">
                    <value.icon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </motion.div>
                
                {/* Title */}
                <h3 className="font-display text-foreground text-xl mb-2 group-hover:text-primary transition-colors duration-300 font-extrabold">
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[140px] mx-auto">
                  {value.description}
                </p>
              </motion.div>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};
export default Values;