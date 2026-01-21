import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Bell, Sparkles, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

const JournalPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <PageTransition>
      <Header />
      <main className="min-h-screen hero-overlay">
        {/* Hero Waitlist Section */}
        <section className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-12 md:pb-16 px-4 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 80, repeat: Infinity, ease: "linear" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"
            />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Main heading - same animation as home hero */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 md:mt-10 text-4xl sm:text-5xl md:text-[5.5rem] font-display font-semibold text-primary-foreground leading-[1.05] mb-4 md:mb-6"
              >
                The NextSteps
                <br />
                <span className="italic text-primary-foreground/90 font-serif font-bold">Journal</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-4 md:mt-6 text-base sm:text-xl md:text-2xl text-primary-foreground/80 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto"
              >
                In-depth career research, professional interviews, and actionable insights 
                to help you navigate your future. Completely free. Be the first to access our comprehensive 
                career exploration platform.
              </motion.p>

              {/* Waitlist Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-md mx-auto"
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 rounded-xl px-4 font-semibold shadow-lg shadow-black/20"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me
                      </Button>
                    </div>
                    <p className="text-sm text-white/60">
                      Join the waitlist — no spam, ever.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-white mx-auto mb-0" />
                    <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
                    <p className="text-white/70">We'll notify you when the Journal launches.</p>
                  </motion.div>
                )}
              </motion.div>

              {/* Features preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3"
              >
                {[
                  {
                    icon: BookOpen,
                    title: "Research Articles",
                    description: "Career research written by students"
                  },
                  {
                    icon: Sparkles,
                    title: "Pro Interviews",
                    description: "Insights from professionals across diverse industries"
                  },
                  {
                    icon: Bell,
                    title: "Career Guides",
                    description: "Step-by-step guidance for your career journey"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-card/90 backdrop-blur-sm rounded-xl p-3 md:p-4 text-left border border-border shadow-lg"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                      <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-md text-muted-foreground line-clamp-2">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default JournalPage;
