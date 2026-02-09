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
import Breadcrumbs from "@/components/Breadcrumbs";
type ContactFormState = {
  name: string;
  email: string;
  message: string;
};
const ContactPage = () => {
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitContactForm = async () => {
    if (!supabaseAnonKey) {
      throw new Error("Missing VITE_SUPABASE_ANON_KEY for function authorization.");
    }
    const res = await fetch("https://agyctztnurqndhewqzjc.supabase.co/functions/v1/resend-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseAnonKey}`,
        apikey: supabaseAnonKey
      },
      body: JSON.stringify({
        name: formState.name.trim(),
        email: formState.email.trim(),
        message: formState.message.trim()
      })
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Unable to send your message.");
    }
  };
  const handleChange = (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (submitted) {
      setSubmitted(false);
    }
    if (submitError) {
      setSubmitError(null);
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitted(false);
    setIsSubmitting(true);
    try {
      await submitContactForm();
      setSubmitted(true);
      setFormState({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send your message.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7
      }
    }
  };
  return <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 hero-overlay pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs tone="dark" className="mb-6" />
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-8 md:gap-12 lg:grid-cols-2 items-start">
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 max-w-xl">
                <p className="text-xs md:text-sm font-medium text-primary-foreground/80 tracking-wide uppercase"></p>
                <h1 className="text-3xl sm:text-4xl font-display text-primary-foreground leading-tight font-bold md:text-6xl">
                  Let&apos;s talk
                </h1>
                <p className="text-primary-foreground/80 leading-relaxed text-base md:text-lg">
                  We'd love to hear from you! Whether you're interested in starting a chapter, exploring partnership opportunities, or have questions about our mission, our team is here to help.
                </p>
                <ul className="space-y-3 text-primary-foreground/70">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
                    General questions about chapters or partnerships
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
                    Press or speaking requests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
                    Accessibility or privacy concerns
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">Send a message</CardTitle>
                    <CardDescription>
                      Provide contact details and a short note. Connect this form to your backend or service of choice to
                      deliver messages securely.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={formState.name} onChange={handleChange("name")} required autoComplete="name" className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange("email")} required autoComplete="email" className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" value={formState.message} onChange={handleChange("message")} required minLength={10} rows={5} className="bg-background" />
                      </div>
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      {submitError && <motion.p initial={{
                      opacity: 0,
                      y: 10
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} className="text-sm text-destructive text-center" role="alert">
                          {submitError}
                        </motion.p>}
                      {submitted && <motion.p initial={{
                      opacity: 0,
                      y: 10
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} className="text-sm text-primary text-center" role="status" aria-live="polite">
                          Message received. We&apos;ll be in touch soon.
                        </motion.p>}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>;
};
export default ContactPage;
