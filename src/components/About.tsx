import { motion } from "framer-motion";
import { Compass, Lightbulb, Users } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";
import researchImage from "@/assets/activities/research.jpg";
import guideImage from "@/assets/activities/guide.jpg";
import workshopsImage from "@/assets/activities/workshops.jpg";
const About = () => {
  return <section id="about" className="py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
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
                <span className="text-gradient font-bold text-[sidebar-primary-foreground] text-accent-foreground">Meaningful Futures</span>
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

          {/* Right - Card Stack */}
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
        }} className="relative min-h-[560px] md:min-h-[600px] lg:min-h-[660px] flex items-center justify-center lg:justify-end lg:pl-20">
            <CardSwap width={580} height={370} cardDistance={42} verticalDistance={50} delay={3000} pauseOnHover={false} skewAmount={5} className="card-swap-themed">
              <Card customClass="card-theme card-theme-1">
                <img src={researchImage} alt="Students collaborating on career research" className="relative z-10 h-40 w-full rounded-xl object-cover border border-border/60" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="icon-container">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground">Career Research</h3>
                </div>
                <p className="text-base text-muted-foreground relative z-10 leading-relaxed">
                  Every piece starts with real research. We study roles, paths, and tradeoffs so students see careers as they are, not as they're sold.
                </p>
              </Card>

              <Card customClass="card-theme card-theme-2">
                <img src={guideImage} alt="Career planning guide and mentorship support" className="relative z-10 h-40 w-full rounded-xl object-cover border border-border/60" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="icon-container">
                    <Compass className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground">Clear Direction</h3>
                </div>
                <p className="text-base text-muted-foreground relative z-10 leading-relaxed">
                  Career paths are broken down into their real components, required skills, common entry points, and realistic next steps students can act on now.
                </p>
              </Card>

              <Card customClass="card-theme card-theme-3">
                <img src={workshopsImage} alt="Students in a workshop accessing new opportunities" className="relative z-10 h-40 w-full rounded-xl object-cover border border-border/60" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="icon-container">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground">Opportunity Access</h3>
                </div>
                <p className="text-base text-muted-foreground relative z-10 leading-relaxed">
                  Practical resources and guidance are made accessible so students can explore options and make informed decisions without relying on personal networks.
                </p>
              </Card>
            </CardSwap>
            
            {/* Floating stat card */}
            
          </motion.div>
        </div>
      </div>
    </section>;
};
export default About;
