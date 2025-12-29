import { BookOpen, Users, Lightbulb, Heart } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div>
              <span className="text-secondary font-semibold tracking-wide uppercase text-sm">
                About NextSteps
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mt-3 leading-tight handmade-border pb-4">
                Guiding Students Toward Meaningful Futures
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              NextSteps was created from a simple belief: too many students are expected to 
              make life-defining decisions without ever being shown what is truly possible.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              For students without access to professional networks, mentors, or clear guidance, 
              careers can feel abstract, intimidating, or out of reach. <strong className="text-foreground">NextSteps exists to change that.</strong>
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              By interviewing professionals, conducting research, and translating real-world 
              experiences into clear, actionable pathways, we help students gain access to 
              information that should never be limited by zip code, income, or background.
            </p>

            <div className="pt-4">
              <blockquote className="border-l-4 border-secondary pl-6 italic text-foreground font-display text-xl">
                "This work is not about telling students who to become—it is about giving 
                them the clarity and confidence to decide for themselves."
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground font-medium">
                — Landon Mahler, Founder & Executive Director
              </p>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="grid grid-cols-2 gap-5">
            <div className="card-elevated p-6 hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Publish Research
              </h3>
              <p className="text-sm text-muted-foreground">
                Student-led career and research journal featuring interviews with professionals
              </p>
            </div>

            <div className="card-elevated p-6 hover:shadow-glow transition-all duration-300 group mt-8">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Build Chapters
              </h3>
              <p className="text-sm text-muted-foreground">
                Establish student-led chapters to expand access and impact nationwide
              </p>
            </div>

            <div className="card-elevated p-6 hover:shadow-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Provide Guidance
              </h3>
              <p className="text-sm text-muted-foreground">
                Structured resources and mentorship pathways for students pursuing interests
              </p>
            </div>

            <div className="card-elevated p-6 hover:shadow-glow transition-all duration-300 group mt-8">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Prioritize Access
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribute educational content with priority to under-resourced schools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
