import { motion } from "framer-motion";
import aboutImage from "@/assets/about-mentorship.jpg";
import ImageWithLoader from "@/components/ImageWithLoader";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                About NextSteps
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground leading-[1.1]">
                Guiding Students Toward Meaningful Futures
              </h2>
            </div>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
              <p>
                Too many students make life-defining decisions without seeing what's truly possible. For those without professional networks or mentors, careers feel abstract and out of reach.
              </p>
              <p>
                We translate real-world experiences into clear, actionable pathways. Access to opportunity shouldn't depend on zip code, income, or background.
              </p>
            </div>

            <blockquote className="border-l-2 border-secondary pl-8 py-4">
              <p className="font-display text-xl md:text-2xl text-foreground italic leading-relaxed">
                "Not about telling students who to become—it's about giving them clarity to decide for themselves."
              </p>
              <footer className="mt-4 text-sm text-muted-foreground tracking-wide">
                — Landon Mahler, Founder
              </footer>
            </blockquote>
          </motion.div>

          {/* Right - Image */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden aspect-[4/5]">
              <ImageWithLoader
                src={aboutImage} 
                alt="Students in a mentorship session" 
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
