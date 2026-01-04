import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithLoader from "@/components/ImageWithLoader";
import handsImage from "@/assets/hands-circle.jpg";

const GetInvolved = () => {
  return (
    <section
      id="involved"
      className="relative py-24 md:py-32 overflow-hidden flex items-center min-h-[50vh]"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 hero-overlay z-0" />
      
      {/* Background image */}
      <div className="absolute inset-0 z-10">
        <ImageWithLoader
          src={handsImage}
          alt="Hands coming together in unity"
          className="w-full h-full object-cover opacity-15"
          containerClassName="w-full h-full"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-20 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center"
        >
          {/* Header */}
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">
            Join the Movement
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-primary-foreground mb-6">
            Get Involved
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
            There are many ways to contribute to our mission. Choose how you'd like to make an impact.
          </p>
          
          {/* CTA */}
          <Button 
            variant="hero-primary" 
            size="lg" 
            className="group"
            asChild
          >
            <Link to="/get-involved">
              Start Here
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInvolved;
