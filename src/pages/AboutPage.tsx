import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 hero-overlay text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wide mb-3">
                About Us
              </p>
              <h1 className="text-display-lg font-display font-semibold mb-6">
                The Power of Student Leadership
              </h1>
              <p className="text-xl text-primary-foreground/85 leading-relaxed">
                NextSteps was created from a simple belief: too many students make life-defining 
                decisions without ever being shown what's truly possible.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
                What We Do
              </p>
              <h2 className="text-display-sm font-display font-semibold text-foreground">
                Our Activities
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Conduct interviews with professionals across diverse fields",
                "Publish digital and print journal editions",
                "Develop career and academic roadmaps",
                "Host workshops, panels, and virtual events",
                "Partner with schools, nonprofits, and professionals",
                "Establish and support student-led chapters",
              ].map((activity, i) => (
                <div key={i} className="p-5 rounded-lg bg-card border border-border">
                  <p className="text-foreground">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
