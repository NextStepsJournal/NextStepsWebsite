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
        <section className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
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

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                The NextSteps
                <br />
                <span className="relative">
                  Journal
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-white/40 rounded-full origin-left"
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                In-depth career research, professional interviews, and actionable insights 
                to help you navigate your future. Be the first to access our comprehensive 
                career exploration platform.
              </motion.p>

              {/* Waitlist Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
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
                        className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 font-semibold shadow-lg shadow-black/20"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me
                      </Button>
                    </div>
                    <p className="text-sm text-white/60">
                      Join 1,000+ students waiting for launch. No spam, ever.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
                    <p className="text-white/70">We'll notify you when the Journal launches.</p>
                  </motion.div>
                )}
              </motion.div>

              {/* Features preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-20 grid md:grid-cols-3 gap-6"
              >
                {[
                  {
                    icon: BookOpen,
                    title: "Research Articles",
                    description: "In-depth career research written by student volunteers"
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
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 text-left border border-border shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default JournalPage;
