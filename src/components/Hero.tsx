import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-students.jpg";
import ImageWithLoader from "@/components/ImageWithLoader";

// University logos
import uclaLogo from "@/assets/universities/ucla.png";
import upennLogo from "@/assets/universities/upenn.png";
import mitLogo from "@/assets/universities/mit.png";
import michiganLogo from "@/assets/universities/michigan.png";
import northwesternLogo from "@/assets/universities/northwestern.png";
import uopeopleLogo from "@/assets/universities/uopeople.png";

const universities = [
  { name: "UCLA", logo: uclaLogo },
  { name: "UPenn", logo: upennLogo },
  { name: "MIT", logo: mitLogo },
  { name: "Michigan", logo: michiganLogo },
  { name: "Northwestern", logo: northwesternLogo },
  { name: "University of the People", logo: uopeopleLogo },
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

      {/* University Conveyor Belt */}
      <div className="relative z-20 w-full overflow-hidden py-12">
        {/* Title above conveyor belt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center text-lg text-primary-foreground font-semibold mb-8 tracking-wide"
        >
          Backed by students accepted into:
        </motion.p>
        
        {/* Light purple conveyor belt */}
        <div className="bg-[hsl(270,30%,95%)] py-8">
          <div className="relative flex overflow-hidden">
            <motion.div
              className="flex gap-16 items-center px-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Double the universities for seamless loop */}
              {[...universities, ...universities].map((uni, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center h-20 w-40"
                >
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="max-h-16 max-w-[140px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
