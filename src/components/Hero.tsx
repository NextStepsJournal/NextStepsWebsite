import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
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
const universities = [{
  name: "UCLA",
  logo: uclaLogo
}, {
  name: "UPenn",
  logo: upennLogo
}, {
  name: "MIT",
  logo: mitLogo
}, {
  name: "Michigan",
  logo: michiganLogo
}, {
  name: "Northwestern",
  logo: northwesternLogo
}, {
  name: "University of the People",
  logo: uopeopleLogo
}];
const stats = [{
  value: "8+",
  label: "Countries"
}, {
  value: "20+",
  label: "Members"
}, {
  value: "∞",
  label: "Possibilities"
}];
const Hero = () => {
  return <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 hero-overlay z-0" />
      <div className="absolute inset-0 z-10">
        <ImageWithLoader src={heroImage} alt="Diverse students collaborating on career exploration projects" className="w-full h-full object-cover opacity-15" containerClassName="w-full h-full" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-1/3 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl z-10" />

      {/* Main Content */}
      <div className="container relative z-20 mx-auto px-4 py-24 flex-1 flex items-center">
        <div className="max-w-3xl">
          {/* Badge */}
          

          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.1
        }} className="text-display-xl md:text-[5.5rem] font-display font-semibold text-primary-foreground leading-[1.05] mb-8">
            Helping Students{" "}
            <br className="hidden md:block" />
            Take Their{" "}
            <span className="italic text-primary-foreground/90 font-serif font-bold">Next Steps</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.25
        }} className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed max-w-2xl">
            Career exploration through professional interviews and mentorship—prioritizing under-resourced communities.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.4
        }} className="flex flex-wrap gap-4">
            <Button variant="hero-primary" size="xl" className="group">
              Get Started 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-secondary" size="xl" className="group">
              <Play className="w-4 h-4" />
              Watch Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.7,
          delay: 0.7
        }} className="flex gap-12 mt-20 pt-10 border-t border-primary-foreground/20">
            {stats.map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.8 + index * 0.1
          }}>
                <div className="text-4xl md:text-5xl font-mono-nums font-semibold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-2 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </div>

      {/* University Conveyor Belt */}
      <div className="relative z-20 w-full overflow-hidden py-10">
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1
      }} className="text-center text-base font-semibold text-primary-foreground/80 mb-6 tracking-wide uppercase">
          Backed by students accepted into
        </motion.p>
        
        <div className="bg-card/95 backdrop-blur-sm py-8 border-y border-border/50">
          <div className="relative flex overflow-hidden fade-edges">
            <motion.div className="flex gap-20 items-center px-10" animate={{
            x: ["0%", "-50%"]
          }} transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity
          }}>
              {[...universities, ...universities, ...universities, ...universities].map((uni, index) => <div key={index} className="flex-shrink-0 flex items-center justify-center h-16 w-36">
                  <img src={uni.logo} alt={`${uni.name} logo`} className="max-h-14 max-w-[130px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" />
                </div>)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;