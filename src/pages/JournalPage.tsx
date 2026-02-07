import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";

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
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: {
                  duration: 80,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"
            />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Text Conveyor Belt - above title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mb-12 md:mb-16"
              >
                <div className="relative flex overflow-hidden">
                  <div className="marquee-track marquee-right [--marquee-duration:40s] flex items-center gap-8 whitespace-nowrap">
                    {[0, 1].map((copyIndex) => (
                      <div key={`journal-top-${copyIndex}`} className="flex items-center gap-8 pr-8 text-3xl md:text-4xl font-semibold text-primary-foreground">
                        <span>Research Articles</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                        <span>Professional Interviews</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                        <span>Student Stories</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                        <span>Career Guides</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <div className="mb-8 md:mb-10">
                <Breadcrumbs tone="dark" listClassName="w-full justify-center" />
              </div>
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
                      Join the waitlist - no spam, ever.
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

              {/* Text Conveyor Belt - below waitlist */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mt-12 md:mt-16"
              >
                <div className="relative flex overflow-hidden">
                  <div className="marquee-track marquee-left [--marquee-duration:40s] flex items-center gap-8 whitespace-nowrap">
                    {[0, 1].map((copyIndex) => (
                      <div key={`journal-bottom-${copyIndex}`} className="flex items-center gap-8 pr-8 text-3xl md:text-4xl font-semibold text-primary-foreground">
                        <span>Research Articles</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                        <span>Professional Interviews</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                        <span>Student Stories</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                        <span>Career Guides</span>
                        <span className="text-primary-foreground/50">&bull;</span>
                      </div>
                    ))}
                  </div>
                </div>
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
