import { useState, useRef, useEffect } from "react";
import { BookMarked, HandHeart, Mic2, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const opportunities = [
  {
    icon: PenTool,
    title: "Volunteer",
    description: "Become a chapter leader, join a local team, or contribute your skills in a volunteer role.",
    image: "/images/get-involved/volunteer.jpg",
  },
  {
    icon: Mic2,
    title: "Be Interviewed",
    description: "Share your career journey with students. Your story could inspire the next generation.",
    image: "/images/get-involved/interview.jpg",
  },
  {
    icon: BookMarked,
    title: "Partner",
    description: "Collaborate with NextSteps as an organization to expand access to career guidance.",
    image: "/images/get-involved/partner.jpg",
  },
  {
    icon: HandHeart,
    title: "Donate",
    description: "Support our mission to provide career clarity to students everywhere.",
    image: "/images/get-involved/donate.jpg",
  },
];

const GetInvolvedPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    
    setCurrentImage(opportunities[index].image);
    requestAnimationFrame(() => {
      setImageOpacity(0.4);
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setImageOpacity(0);
    
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentImage(null);
    }, 500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative min-h-screen py-32 overflow-hidden flex items-center">
            {/* Gradient background */}
            <div className="absolute inset-0 hero-overlay z-0" />
            
            {/* Background image */}
            <div 
              className="absolute inset-0 z-10 transition-opacity duration-500 ease-out"
              style={{
                backgroundImage: currentImage ? `url(${currentImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: imageOpacity,
              }}
            />

            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-xl mb-16"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">
                  Join the Movement
                </p>
                <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground mb-6">
                  Get Involved
                </h1>
                <p className="text-xl text-primary-foreground/80 leading-relaxed">
                  There are many ways to contribute to our mission. Choose how you'd like to make an impact.
                </p>
              </motion.div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
                {opportunities.map((opp, index) => (
                  <motion.div
                    key={opp.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="aspect-square p-8 bg-background border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center text-center"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="mb-4">
                      <opp.icon className="w-10 h-10 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-medium text-foreground mb-2">
                      {opp.title}
                    </h3>
                    
                    {/* Description that unfolds on hover */}
                    <div 
                      className="grid transition-all duration-400 ease-out w-full"
                      style={{
                        gridTemplateRows: hoveredIndex === index ? '1fr' : '0fr',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                          {opp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default GetInvolvedPage;
