import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useEffect } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const leadershipRoles = [
  "Founder",
  "Associate Founder & Director of Technology",
  "Director of Operations",
  "Director of Outreach",
  "Director of Marketing",
  "Director of Finances",
  "Director of Human Resources",
  "Director of Editorial & Research"
];

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 hero-overlay z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">
                The Team
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground mb-6">
                Our Leadership
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Dedicated professionals and mentors committed to guiding youth toward their brightest futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipRoles.map((role, index) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-background border border-border hover:border-primary/20 transition-colors overflow-hidden"
                >
                  {/* Placeholder Image */}
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-muted-foreground/10" />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-lg font-medium text-foreground mb-1">Name</p>
                        <p className="text-primary text-sm">
                          {role}
                        </p>
                      </div>
                      
                      <a
                        href="#"
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </a>
                    </div>
                    
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Bio</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-24 bg-accent">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-4">
                Want to Join Our Leadership?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're always looking for passionate individuals who want to make a difference in young people's lives.
              </p>
              <Button variant="default" size="lg" asChild>
                <a href="/get-involved">Get Involved</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default TeamPage;
