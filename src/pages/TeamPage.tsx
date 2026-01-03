import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useEffect } from "react";
import { Linkedin } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay opacity-95 z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Our Leadership
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80">
                Dedicated professionals and mentors committed to guiding youth toward their brightest futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Grid - 4 columns x 2 rows */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {leadershipRoles.map((role) => (
                <motion.div
                  key={role}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Placeholder Image */}
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-muted-foreground/20" />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {/* Name Placeholder */}
                        <div className="h-4 bg-muted-foreground/20 rounded w-24 mb-2" />
                        {/* Role */}
                        <p className="text-primary font-medium text-xs leading-tight">
                          {role}
                        </p>
                      </div>
                      
                      {/* LinkedIn Icon */}
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                    </div>
                    
                    {/* Bio Placeholder */}
                    <div className="mt-3 space-y-1.5">
                      <div className="h-2.5 bg-muted-foreground/10 rounded w-full" />
                      <div className="h-2.5 bg-muted-foreground/10 rounded w-4/5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Want to Join Our Leadership?
              </h2>
              <p className="text-muted-foreground mb-8">
                We're always looking for passionate individuals who want to make a difference in young people's lives.
              </p>
              <motion.a
                href="/get-involved"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                Get Involved
              </motion.a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default TeamPage;
