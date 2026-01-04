import { ChangeEvent, FormEvent, useState } from "react";
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

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-32 pb-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-16 lg:grid-cols-2 max-w-5xl mx-auto">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Contact
                  </p>
                  <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground">
                    Let's talk
                  </h1>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Share a few details and our team will follow up. Messages stay within this app and are processed without exposing email addresses in the client code.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li>General questions about chapters or partnerships</li>
                  <li>Press or speaking requests</li>
                  <li>Accessibility or privacy concerns</li>
                </ul>
              </div>
              
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Send a message</CardTitle>
                  <CardDescription>
                    Provide contact details and a short note.
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
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send
                    </Button>
                    {submitted && (
                      <p className="text-sm text-primary" role="status" aria-live="polite">
                        Message received. We'll be in touch soon.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
