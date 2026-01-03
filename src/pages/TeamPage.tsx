import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useEffect } from "react";

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Executive Director",
    bio: "With over 15 years in youth development, Sarah leads our mission to empower the next generation through mentorship and guidance.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Marcus Johnson",
    role: "Program Coordinator",
    bio: "Marcus designs and implements our mentorship programs, ensuring every participant receives personalized support.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Elena Rodriguez",
    role: "Youth Outreach Specialist",
    bio: "Elena connects with local schools and communities to bring our programs to those who need them most.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "David Chen",
    role: "Lead Mentor",
    bio: "A former program participant, David now guides youth through their educational and career journeys.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Aisha Williams",
    role: "Community Relations Manager",
    bio: "Aisha builds partnerships with local businesses and organizations to expand our impact and resources.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "James Thompson",
    role: "Volunteer Coordinator",
    bio: "James recruits, trains, and supports our amazing volunteer mentors who make our programs possible.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  }
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Meet Our Team
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Dedicated professionals and mentors committed to guiding youth toward their brightest futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
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
                Want to Join Our Team?
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
