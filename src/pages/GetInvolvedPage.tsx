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
    description: "Start a chapter, join a local team, or contribute your skills in a volunteer role. Help us empower students to discover their career paths.",
    image: "/images/get-involved/volunteer.jpg",
    link: "https://shortyhub.com/nextstepsjournal",
  },
  {
    icon: Mic2,
    title: "Be Interviewed",
    description: "Share your career journey with students. Your story could inspire the next generation and help them see possibilities they never knew existed.",
    image: "/images/get-involved/interview.jpg",
    link: "https://forms.gle/YQunVLcxtyZA9TdE8",
  },
  {
    icon: BookMarked,
    title: "Partner",
    description: "Collaborate with NextSteps as an organization. Whether you're a school, company, or nonprofit, together we can expand access to career guidance.",
    image: "/images/get-involved/partner.jpg",
    link: "https://forms.gle/YQunVLcxtyZA9TdE8",
  },
  {
    icon: HandHeart,
    title: "Donate",
    description: "Support our mission to provide career clarity to students everywhere. Your contribution helps us create resources, train chapter leaders, and reach more students.",
    image: "/images/get-involved/donate.jpg",
    link: "https://hcb.hackclub.com/donations/start/nextsteps",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const GetInvolvedPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    // Clear any pending fade out
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    
    // Set image and fade in
    setCurrentImage(opportunities[index].image);
    // Small delay to ensure image is set before fading in
    requestAnimationFrame(() => {
      setImageOpacity(0.5);
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    // Fade out first
    setImageOpacity(0);
    
    // Clear image after fade completes
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentImage(null);
    }, 600);
  };

  return (
    <PageTransition>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-screen py-16 md:py-24 overflow-hidden flex items-center">
          {/* Gradient sits below the pictures */}
          <div className="absolute inset-0 hero-overlay z-0 opacity-90" />
          
          {/* Background image that fades in/out smoothly */}
          <div 
            className="absolute inset-0 z-10 transition-opacity duration-[600ms] ease-in-out"
            style={{
              backgroundImage: currentImage ? `url(${currentImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: imageOpacity,
            }}
          />

          <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-2xl mb-8 md:mb-12 text-center mx-auto"
            >
              <p className="text-xs md:text-sm font-medium text-primary-foreground/80 uppercase tracking-wide mb-2 md:mb-3">
                Join Us in Making a Difference
              </p>
              <h1 className="text-3xl sm:text-xl md:text-display-xl font-display font-bold text-primary-foreground">
                Get Involved
              </h1>
              <p className="mt-3 md:mt-4 text-base md:text-xl text-primary-foreground/85 leading-relaxed">
                There are many ways to contribute to our mission. Choose how you'd like to make an impact.
              </p>
            </motion.div>

            {/* Opportunities - cards as buttons with hover effects */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-5xl"
            >
              {opportunities.map((opp, index) => (
                <a
                  key={opp.title}
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                    className="relative aspect-square p-4 md:p-8 rounded-lg bg-card border-2 border-border hover:border-primary transition-colors duration-300 cursor-pointer group flex flex-col items-center justify-center text-center"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div 
                      animate={hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 md:w-14 md:h-14 mb-2 md:mb-4 flex items-center justify-center"
                    >
                      <opp.icon className="w-10 h-10 md:w-14 md:h-14 text-primary" />
                    </motion.div>
                    <h3 className="font-sans font-semibold text-primary text-lg md:text-2xl group-hover:text-primary transition-colors duration-300">
                      {opp.title}
                    </h3>
                    
                    {/* Description that unfolds on hover */}
                    <div 
                      className="hidden md:grid transition-all duration-500 ease-in-out w-full"
                      style={{
                        gridTemplateRows: hoveredIndex === index ? '1fr' : '0fr',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-3 md:pt-4">
                          {opp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </a>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default GetInvolvedPage;
