import { useEffect } from "react";
import { motion } from "framer-motion";
import { Handshake, Building2, GraduationCap, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

const partnerTypes = [
  {
    icon: Building2,
    title: "Corporate Partners",
    description: "Companies committed to investing in the next generation of talent through mentorship and resources.",
  },
  {
    icon: GraduationCap,
    title: "Educational Partners",
    description: "Schools and universities working with us to bring career exploration to students.",
  },
  {
    icon: Heart,
    title: "Nonprofit Partners",
    description: "Organizations aligned with our mission to democratize career access.",
  },
];

const currentPartners = [
  { name: "Partner Organization 1", type: "Corporate" },
  { name: "Partner Organization 2", type: "Educational" },
  { name: "Partner Organization 3", type: "Nonprofit" },
  { name: "Partner Organization 4", type: "Corporate" },
  { name: "Partner Organization 5", type: "Educational" },
  { name: "Partner Organization 6", type: "Nonprofit" },
];

const benefits = [
  "Access to a diverse pool of motivated students",
  "Brand visibility across our platforms and events",
  "Opportunities to shape curriculum and content",
  "Direct engagement with under-resourced communities",
  "Recognition as a leader in educational equity",
  "Collaborative programming and workshop opportunities",
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
        <section className="pt-32 pb-20 bg-gradient-to-b from-accent/10 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6">
                <Handshake className="w-4 h-4" />
                <span className="text-sm font-medium">Our Partners</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Building the Future Together
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                We partner with organizations that share our commitment to empowering students from all backgrounds with career resources and opportunities.
              </p>
              <Button size="lg" asChild>
                <a href="/get-involved">Become a Partner <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Partnership Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you're a corporation, educational institution, or nonprofit, there's a way to make an impact with NextSteps.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card rounded-2xl border border-border p-8 text-center transition-shadow hover:shadow-xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <type.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{type.title}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Partners */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Partners</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These organizations are helping us create a more equitable future for students everywhere.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {currentPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mb-3" />
                  <span className="text-xs text-muted-foreground text-center">{partner.type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">Why Partner With Us?</h2>
                <p className="text-muted-foreground mb-8">
                  Partnering with NextSteps means joining a movement to democratize career exploration and make professional opportunities accessible to all students.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Make an Impact?</h3>
                <p className="text-muted-foreground mb-6">
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
        <section className="py-20 bg-foreground text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50+", label: "Partner Organizations" },
                { value: "10K+", label: "Students Reached" },
                { value: "25+", label: "States Covered" },
                { value: "100+", label: "Workshops Hosted" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/70">{stat.label}</div>
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
