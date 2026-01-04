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
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4 max-w-xl">
                <p className="text-sm font-medium text-primary">Contact</p>
                <h1 className="text-4xl font-display font-semibold text-foreground">Let&apos;s talk</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Share a few details and our team will follow up. Messages stay within this app and are processed
                  without exposing email addresses in the client code.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• General questions about chapters or partnerships</li>
                  <li>• Press or speaking requests</li>
                  <li>• Accessibility or privacy concerns</li>
                </ul>
              </div>
              <Card className="shadow-lg border-border/60">
                <CardHeader>
                  <CardTitle>Send a message</CardTitle>
                  <CardDescription>
                    Provide contact details and a short note. Connect this form to your backend or service of choice to
                    deliver messages securely.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
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
                      <p className="text-sm text-green-600" role="status" aria-live="polite">
                        Message received. We&apos;ll be in touch soon.
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
