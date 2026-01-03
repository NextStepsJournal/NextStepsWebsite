import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-students.jpg";
import ImageWithLoader from "@/components/ImageWithLoader";

const partners = [
  "Partner 1",
  "Partner 2", 
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-16">
      {/* Background layers: gradient under a semi-opaque photo */}
      <div className="absolute inset-0 hero-overlay z-0" />
      <div className="absolute inset-0 z-10">
        <ImageWithLoader
          src={heroImage}
          alt="Students collaborating"
          className="w-full h-full object-cover opacity-20"
          containerClassName="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 py-20 flex-1 flex items-center">
        <div className="max-w-2xl">
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-display-lg font-display font-semibold text-primary-foreground mb-6"
          >
            Helping Students Take Their{" "}
            <span className="italic">Next Steps</span>
          </motion.h1>

          {/* Subheadline - tighter copy */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-primary-foreground/85 mb-10 leading-relaxed max-w-xl"
          >
            Career exploration through professional interviews and mentorship prioritizing under-resourced communities.
          </motion.p>

          {/* CTA - clear hierarchy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="hero-primary" size="lg" className="group">
              Get Started 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-secondary" size="lg">
              Read the Journal
            </Button>
          </motion.div>

          {/* Stats - using monospace for numbers */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex gap-12 mt-16 pt-8 border-t border-primary-foreground/20"
          >
            {[
              { value: "8+", label: "Countries" },
              { value: "20+", label: "Members" },
              { value: "∞", label: "Possibilities" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
              >
                <div className="text-3xl font-mono-nums font-medium text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Partner Conveyor Belt */}
      <div className="relative z-20 w-full overflow-hidden py-8 border-t border-primary-foreground/10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center text-sm text-primary-foreground/50 mb-4"
        >
          Trusted by organizations worldwide
        </motion.p>
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Double the partners for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-3 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10"
              >
                <span className="text-primary-foreground/40 font-medium whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
