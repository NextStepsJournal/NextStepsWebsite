import { useState } from "react";
import { BookMarked, HandHeart, Mic2, PenTool } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const opportunities = [
  {
    icon: PenTool,
    title: "Start a Chapter",
    description: "Launch a NextSteps chapter at your school or community. Lead workshops, connect students with professionals, and make a lasting impact in your area.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop",
  },
  {
    icon: Mic2,
    title: "Be Interviewed",
    description: "Share your career journey with students. Your story could inspire the next generation and help them see possibilities they never knew existed.",
    image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=1200&auto=format&fit=crop",
  },
  {
    icon: BookMarked,
    title: "Partner",
    description: "Collaborate with NextSteps as an organization. Whether you're a school, company, or nonprofit, together we can expand access to career guidance.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop",
  },
  {
    icon: HandHeart,
    title: "Donate",
    description: "Support our mission to provide career clarity to students everywhere. Your contribution helps us create resources, train chapter leaders, and reach more students.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&auto=format&fit=crop",
  },
];

const GetInvolvedPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentBackground = hoveredIndex !== null 
    ? opportunities[hoveredIndex].image 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[80vh] py-24 overflow-hidden">
          {/* Constant gradient overlay - always visible */}
          <div className="absolute inset-0 hero-overlay z-[1]" />
          
          {/* Background image that fades in/out */}
          <div 
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: currentBackground ? `url(${currentBackground})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBackground ? 0.3 : 0,
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wide mb-3">
                Join the Movement
              </p>
              <h1 className="text-display-lg font-display font-semibold text-primary-foreground">
                Get Involved
              </h1>
              <p className="mt-4 text-xl text-primary-foreground/85 leading-relaxed">
                There are many ways to contribute to our mission. Choose how you'd like to make an impact.
              </p>
            </div>

            {/* SVG gradient definition for icons */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(262, 55%, 45%)" />
                  <stop offset="100%" stopColor="hsl(20, 70%, 50%)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Opportunities - cards as buttons with hover effects */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {opportunities.map((opp, index) => (
                <div
                  key={opp.title}
                  className={`relative aspect-square p-8 rounded-lg bg-card border-2 transition-all cursor-pointer group flex flex-col items-center justify-center text-center ${
                    hoveredIndex === index 
                      ? 'border-primary' 
                      : 'border-border hover:border-primary'
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <opp.icon className="w-12 h-12" style={{ stroke: 'url(#icon-gradient)' }} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-xl group-hover:text-primary transition-colors">
                    {opp.title}
                  </h3>
                  
                  {/* Description that unfolds on hover */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-out ${
                      hoveredIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {opp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolvedPage;
