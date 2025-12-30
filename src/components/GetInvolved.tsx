import { BookMarked, HandHeart, Mic2, PenTool } from "lucide-react";

const opportunities = [
  {
    icon: PenTool,
    title: "Start a Chapter",
    href: "#",
  },
  {
    icon: Mic2,
    title: "Be Interviewed",
    href: "#",
  },
  {
    icon: BookMarked,
    title: "Partner",
    href: "#",
  },
  {
    icon: HandHeart,
    title: "Donate",
    href: "#",
  },
];

const GetInvolved = () => {
  return (
    <section id="involved" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            Join the Movement
          </p>
          <h2 className="text-display-md font-display font-semibold text-foreground">
            Get Involved
          </h2>
        </div>

        {/* Opportunities - cards as buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {opportunities.map((opp) => (
            <a
              key={opp.title}
              href={opp.href}
              className="p-8 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group flex flex-col items-center justify-center text-center"
            >
              <opp.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                {opp.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;