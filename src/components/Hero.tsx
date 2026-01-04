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

const stats = [
  { value: "8+", label: "Countries" },
  { value: "20+", label: "Members" },
  { value: "∞", label: "Possibilities" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-18">
      {/* Background: gradient + image */}
      <div className="absolute inset-0 hero-overlay z-0" />
      <div className="absolute inset-0 z-10">
        <ImageWithLoader
          src={heroImage}
          alt="Students collaborating"
          className="w-full h-full object-cover opacity-15"
          containerClassName="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-6 py-24 flex-1 flex items-center">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary-foreground/70 text-sm uppercase tracking-[0.2em] mb-6"
          >
            Student-Led Publication
          </motion.p>

          {/* Headline - Large, editorial serif */}
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-[1.05] mb-8"
          >
            Helping Students Take Their{" "}
            <em className="not-italic text-primary-foreground/90">Next Steps</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-primary-foreground/80 mb-12 leading-relaxed max-w-lg"
          >
            Career exploration through professional interviews and mentorship—prioritizing under-resourced communities.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero-primary" size="lg" className="group">
              Get Started 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-secondary" size="lg">
              Read the Journal
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex gap-12 mt-20 pt-8 border-t border-primary-foreground/20"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl font-display font-medium text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-1 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* University Conveyor Belt */}
      <div className="relative z-20 w-full overflow-hidden">
        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-sm text-primary-foreground/80 uppercase tracking-[0.15em] mb-6"
        >
          Backed by students accepted into
        </motion.p>
        
        {/* Conveyor */}
        <div className="bg-background py-10">
          <div className="relative flex overflow-hidden">
            <motion.div
              className="flex gap-20 items-center px-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...universities, ...universities, ...universities, ...universities].map((uni, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center h-16 w-36"
                >
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="max-h-14 max-w-[130px] object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
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
