import { motion } from "framer-motion";
import aboutImage from "@/assets/about-mentorship.jpg";
import ImageWithLoader from "@/components/ImageWithLoader";
const About = () => {
  return <section id="about" className="py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div initial={{
          opacity: 0,
          x: -40
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.7
        }} className="space-y-8">
            <div>
              
              <h2 className="text-display-lg font-display font-semibold text-foreground leading-tight">
                Guiding Students Toward{" "}
                <span className="text-gradient font-bold text-secondary">Meaningful Futures</span>
              </h2>
            </div>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed text-body-lg">
              <p>
                Too many students make life-defining decisions without seeing what's truly possible. For those without professional networks or mentors, careers feel abstract and out of reach.
              </p>
              <p className="font-normal text-muted-foreground">
                We translate real-world experiences into clear, actionable pathways. <strong className="font-normal text-muted-foreground">Access to opportunity shouldn't depend on zip code, income, or background.</strong>
              </p>
            </div>

            <motion.blockquote initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3
          }} className="relative border-l-4 border-primary pl-8 py-4 mt-10">
              
              <p className="italic text-xl leading-relaxed font-serif font-normal text-primary">
                "Not about telling students who to become—it's about giving them clarity to decide for themselves."
              </p>
              <footer className="mt-4 text-sm font-medium text-primary">
                — Landon Mahler, <span className="text-primary">Founder</span>
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Right - Image */}
          <motion.div initial={{
          opacity: 0,
          x: 40
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithLoader src={aboutImage} alt="Students engaged in a mentorship session discussing career paths" className="w-full h-full object-cover aspect-[4/5]" containerClassName="w-full h-full" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
            
            {/* Floating stat card */}
            
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;