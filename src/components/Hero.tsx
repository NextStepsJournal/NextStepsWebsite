import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="text-display-lg font-display font-semibold text-primary-foreground mb-6">
            Helping Students Take Their{" "}
            <span className="italic">Next Steps</span>
          </h1>

          {/* Subheadline - tighter copy */}
          <p className="text-xl text-primary-foreground/85 mb-10 leading-relaxed max-w-xl">
            Career exploration through professional interviews and mentorship—prioritizing under-resourced communities.
          </p>

          {/* CTA - clear hierarchy */}
          <div className="flex flex-wrap gap-3">
            <Button variant="hero-primary" size="lg" className="group">
              Start a Chapter
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="hero-secondary" size="lg">
              Read the Journal
            </Button>
          </div>

          {/* Stats - using monospace for numbers */}
          <div className="flex gap-12 mt-16 pt-8 border-t border-primary-foreground/20">
            <div>
              <div className="text-3xl font-mono-nums font-medium text-primary-foreground">
                50+
              </div>
              <div className="text-sm text-primary-foreground/60 mt-1">
                Chapters
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono-nums font-medium text-primary-foreground">
                200+
              </div>
              <div className="text-sm text-primary-foreground/60 mt-1">
                Interviews
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono-nums font-medium text-primary-foreground">
                5,000+
              </div>
              <div className="text-sm text-primary-foreground/60 mt-1">
                Students
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
