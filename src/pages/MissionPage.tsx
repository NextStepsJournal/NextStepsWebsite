import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Lightbulb, Shield, Eye } from "lucide-react";

const leadership = [
  {
    role: "Founder & Executive Director",
    name: "Landon Mahler",
    description: "Oversees operations, strategy, and external relations",
  },
  {
    role: "Vice President",
    name: "[Name]",
    description: "Assists the President and oversees chapters",
  },
  {
    role: "Head of Operations",
    name: "[Name]",
    description: "Maintains records and ensures smooth operations across departments",
  },
  {
    role: "Head of Outreach",
    name: "[Name]",
    description: "Recruits chapter founders and develops school partnerships",
  },
  {
    role: "Head of Marketing",
    name: "[Name]",
    description: "Manages social media and helps chapters with resources",
  },
  {
    role: "Head of Finances",
    name: "[Name]",
    description: "Manages finances, reporting, and fundraising across chapters",
  },
  {
    role: "Head of Technology",
    name: "[Name]",
    description: "Updates website with resources and articles",
  },
  {
    role: "Head of Human Resources",
    name: "[Name]",
    description: "Reviews applications and conducts interviews",
  },
];

const values = [
  { icon: Target, title: "Access", description: "Opportunity should not depend on background or connections" },
  { icon: Eye, title: "Curiosity", description: "Asking questions drives discovery" },
  { icon: Lightbulb, title: "Clarity", description: "Students deserve clear, realistic guidance" },
  { icon: Shield, title: "Integrity", description: "Accurate, ethical representation of professionals and careers" },
  { icon: Users, title: "Student Leadership", description: "Students lead, create, and grow the organization" },
];

const MissionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 hero-overlay text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wide mb-3">
                Our Mission
              </p>
              <h1 className="text-display-lg font-display font-semibold mb-6">
                Guiding Students Toward Meaningful Futures
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed">
                NextSteps helps high school students discover career interests through professional 
                interviews, research-based publications, and actionable guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Details */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                  Why We Exist
                </p>
                <h2 className="text-display-md font-display font-semibold text-foreground mb-6">
                  Closing the Opportunity Gap
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  NextSteps helps high school students discover career interests and academic 
                  passions through professional interviews, research-based publications, and 
                  actionable guidance—particularly serving students from under-resourced communities.
                </p>
                <p>
                  For students without access to professional networks, mentors, or clear guidance, 
                  careers can feel abstract, intimidating, or out of reach.
                </p>
                <p className="text-foreground font-medium">
                  We exist to change that.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                Our Foundation
              </p>
              <h2 className="text-display-sm font-display font-semibold text-foreground">
                Core Values
              </h2>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership / Our Team */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                Leadership
              </p>
              <h2 className="text-display-sm font-display font-semibold text-foreground">
                Our Team
              </h2>
              <p className="text-muted-foreground mt-4">
                NextSteps is governed by a Board of Directors and led by a team of dedicated officers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {leadership.map((person) => (
                <div 
                  key={person.role} 
                  className="p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
                    {person.role}
                  </p>
                  <h3 className="font-semibold text-foreground mb-2">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Model / Local Impact */}
        <section className="py-20 section-alt">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                  Local Impact
                </p>
                <h2 className="text-display-sm font-display font-semibold text-foreground mb-6">
                  Chapter Model
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  NextSteps chapters are student-led teams that interview professionals, 
                  write articles for the journal, create career guides, and support peers 
                  in exploring their interests.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Chapters operate locally or regionally but contribute to a shared national platform.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Chapter Leadership Positions</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { role: "Chapter President", desc: "Oversees operations, liaison to National" },
                    { role: "Vice President", desc: "Supports President, manages internal ops" },
                    { role: "Director of Interviews", desc: "Coordinates professional outreach" },
                    { role: "Director of Writing", desc: "Oversees article quality and research" },
                    { role: "Director of Outreach", desc: "Manages school and community partnerships" },
                  ].map((position) => (
                    <div key={position.role} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{position.role}</p>
                        <p className="text-xs text-muted-foreground">{position.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Letter */}
        <section className="py-20 hero-overlay text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wide mb-6">
                A Letter from the Founder
              </p>
              <blockquote className="text-xl leading-relaxed mb-8 italic font-display">
                "By interviewing professionals, conducting research, and translating real-world 
                experiences into clear, actionable pathways, you are helping students gain access 
                to information that should never be limited by zip code, income, or background."
              </blockquote>
              <p className="text-primary-foreground/70">
                — Landon Mahler, Founder & Executive Director
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MissionPage;
