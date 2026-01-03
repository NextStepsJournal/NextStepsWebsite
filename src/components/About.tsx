import { motion } from "framer-motion";
import aboutImage from "@/assets/about-mentorship.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wide">
              About NextSteps
            </p>
            <h2 className="text-display-lg font-display font-semibold text-foreground">
              Guiding Students Toward Meaningful Futures
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Too many students make life-defining decisions without seeing what's truly possible. For those without professional networks or mentors, careers feel abstract and out of reach.
              </p>
              <p>
                We translate real-world experiences into clear, actionable pathways. Access to opportunity shouldn't depend on zip code, income, or background.
              </p>
            </div>

            <blockquote className="border-l-2 border-primary pl-6 py-2 mt-8">
              <p className="text-foreground italic font-display text-lg">
                "Not about telling students who to become—it's about giving them clarity to decide for themselves."
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                Landon Mahler, Founder
              </footer>
            </blockquote>
          </motion.div>

          {/* Right - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden aspect-square">
              <img 
                src={aboutImage} 
                alt="Students in a mentorship session" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
