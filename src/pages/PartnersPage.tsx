import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

const partnershipTypes = [
  {
    title: "Mentorship Partnerships",
    description: "Individuals or organizations providing mentors, career coaches, or advisors."
  },
  {
    title: "Educational Partnerships",
    description: "Schools, universities, training programs, or bootcamps that align with career development."
  },
  {
    title: "Content Partnerships",
    description: "Groups that help create or share guides, workshops, prompts, or learning material."
  },
  {
    title: "Community & Youth Organizations",
    description: "Nonprofits, clubs, or programs serving similar age groups or communities."
  },
  {
    title: "Corporate Partnerships",
    description: "Companies supporting through funding, employee mentors, tools, or resources."
  },
  {
    title: "Sponsorships",
    description: "Financial support for programs, events, or platform features."
  },
  {
    title: "Referral Partnerships",
    description: "Mutual referrals between organizations with overlapping audiences."
  },
  {
    title: "Technology & Platform Partners",
    description: "Tools for scheduling, analytics, hosting, communication, or learning."
  },
  {
    title: "Research & Impact Partners",
    description: "Organizations helping with data, outcomes, or program evaluation."
  },
  {
    title: "Media & Outreach Partners",
    description: "Groups that help amplify the mission through newsletters, social media, or events."
  },
  {
    title: "Volunteer Partnerships",
    description: "Networks that supply volunteers, mentors, or facilitators."
  },
  {
    title: "Interviewees",
    description: "Individuals participating in NextSteps interviews, sharing experiences to support our journaling, career guidance, and mentoring work."
  }
];

const currentPartners = [
  { name: "Partner 1" },
  { name: "Partner 2" },
  { name: "Partner 3" },
  { name: "Partner 4" },
  { name: "Partner 5" },
  { name: "Partner 6" },
  { name: "Partner 7" },
  { name: "Partner 8" }
];

const benefits = [
  "Access to a diverse pool of motivated students",
  "Brand visibility across our platforms and events",
  "Opportunities to shape curriculum and content",
  "Direct engagement with under-resourced communities",
  "Recognition as a leader in educational equity",
  "Collaborative programming and workshop opportunities"
];

const PartnersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay z-0" />
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl z-10" />
          <div className="absolute bottom-1/3 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl z-10" />
          
          <div className="container relative z-20 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 md:mb-6 md:text-7xl">
                Building the Future Together
              </h1>
              <p className="text-base text-primary-foreground/80 mb-6 md:mb-8 md:text-2xl">
                We partner with organizations that share our commitment to empowering students from all backgrounds with career resources and opportunities.
              </p>
              <Button size="lg" variant="hero-primary" asChild>
                <a href="/get-involved">Become a Partner <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-display-lg font-bold text-foreground mb-3 md:mb-4">Partnership Opportunities</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you're a corporation, educational institution, or nonprofit, there's a way to make an impact with NextSteps.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {partnershipTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 py-3 border-b border-border/50"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{type.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground mt-1">{type.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Partners - Conveyor Belt */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-display-lg font-bold text-foreground mb-3 md:mb-4">Our Partners</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                These organizations are helping us create a more equitable future for students everywhere.
              </p>
            </motion.div>

            {/* Conveyor Belt */}
            <div className="relative overflow-hidden py-8">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity
                }}
                className="flex gap-8 items-center"
              >
                {[...currentPartners, ...currentPartners].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-muted rounded-2xl flex items-center justify-center border border-border"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-muted-foreground/20" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Partner With Us - Hero Gradient Background */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-display-lg font-bold text-primary-foreground mb-3 md:mb-4">Why Partner With Us?</h2>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 md:mb-8">
                  Partnering with NextSteps means joining a movement to democratize career exploration and make professional opportunities accessible to all students.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      </div>
                      <span className="text-lg text-primary-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-background rounded-3xl p-8 md:p-12"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Make an Impact?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  We'd love to discuss how we can work together to empower the next generation of professionals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <a href="/get-involved">Partner With Us</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="/contact">Contact Us</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 md:py-20 bg-foreground text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { value: "50+", label: "Partner Organizations" },
                { value: "10K+", label: "Students Reached" },
                { value: "25+", label: "States Covered" },
                { value: "100+", label: "Workshops Hosted" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm md:text-base text-primary-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default PartnersPage;
