import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const [formState, setFormState] = useState<ContactFormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof ContactFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
      if (submitted) {
        setSubmitted(false);
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-12 lg:grid-cols-2 items-start"
            >
              <motion.div variants={itemVariants} className="space-y-8 max-w-xl">
                <p className="text-xl font-medium text-primary-foreground/80 tracking-wide"></p>
                <h1 className="text-4xl md:text-5xl font-display font-semibold text-primary-foreground leading-tight">
                  Let&apos;s talk
                </h1>
                <p className="text-primary-foreground/80 leading-relaxed text-lg">
                  Share a few details and our team will follow up. Whether you have questions, feedback, or partnership ideas, we&apos;d love to hear from you.
                </p>
                <ul className="space-y-4 text-primary-foreground/90">
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">Send a message</CardTitle>
                    <CardDescription>
                      Provide contact details and a short note. We&apos;ll get back to you as soon as we can!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange("name")}
                          required
                          autoComplete="name"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange("email")}
                          required
                          autoComplete="email"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange("message")}
                          required
                          minLength={10}
                          rows={5}
                          className="bg-background"
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Send Message
                      </Button>
                      {submitted && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-green-600 text-center"
                          role="status"
                          aria-live="polite"
                        >
                          Message received. We&apos;ll be in touch soon.
                        </motion.p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
