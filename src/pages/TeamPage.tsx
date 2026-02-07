import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useEffect } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { leadership } from "@/components/Leadership";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
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
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay opacity-95 z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs tone="dark" className="mb-6" listClassName="w-full justify-center" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 md:mb-6">
                Our Team
              </h1>
              <p className="text-base md:text-lg lg:text-2xl text-primary-foreground/80">
                Dedicated directors and staff committed to guiding youth toward their brightest futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
            >
              {leadership.map((person) => (
                <motion.div
                  key={person.name}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Photo */}
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  {/* Name, role, LinkedIn, bio */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground mb-1">{person.name}</p>
                        <p className="text-primary font-medium text-xs leading-tight">{person.role}</p>
                      </div>
                      <motion.a
                        href={person.linkedin ?? "#"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </motion.a>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">{person.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3 md:mb-4 md:text-display-lg">
                Want to Join Our Team?
              </h2>
              <p className="text-sm text-primary-foreground/80 mb-6 md:mb-8 md:text-xl">
                We're always looking for passionate individuals who want to make a difference in young people's lives.
              </p>
              <Button size="lg" variant="hero-primary" asChild>
                <a href="https://jobs.talenthr.io/nextstepsjournal" target="_blank" rel="noopener noreferrer">Take a look at our Careers</a>
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
