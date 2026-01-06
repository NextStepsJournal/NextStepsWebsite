import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithLoader from "@/components/ImageWithLoader";
import handsImage from "@/assets/hands-circle.jpg";
const GetInvolved = () => {
  return <section id="involved" className="relative py-32 overflow-hidden flex items-center min-h-[70vh]">
      {/* Gradient background */}
      <div className="absolute inset-0 hero-overlay z-0" />
      
      {/* Background image */}
      <div className="absolute inset-0 z-10">
        <ImageWithLoader src={handsImage} alt="Community members joining hands together, symbolizing unity and collaboration" className="w-full h-full object-cover opacity-15" containerClassName="w-full h-full" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl z-10" />
      
      <div className="container mx-auto px-4 relative z-20 flex justify-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.7
      }} className="max-w-2xl text-center">
          {/* Badge */}
          
          
          {/* Header */}
          <h2 className="text-display-lg md:text-display-xl font-display font-semibold text-primary-foreground mb-6">
            Get Involved
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-12 leading-relaxed max-w-lg mx-auto">
            There are many ways to contribute to our mission. Choose how you'd like to make an impact.
          </p>
          
          {/* CTA Button */}
          <motion.div whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            <Button variant="hero-primary" size="xl" className="group shadow-xl" asChild>
              <Link to="/get-involved">
                Start Here
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.5
        }} className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/60">
              Join 20+ members across 8+ countries making a difference
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default GetInvolved;