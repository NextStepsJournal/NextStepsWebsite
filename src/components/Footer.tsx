import { Heart, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Organization: [
      { label: "About Us", href: "#about" },
      { label: "Our Mission", href: "#mission" },
      { label: "Impact", href: "#impact" },
      { label: "Leadership", href: "#" },
    ],
    Resources: [
      { label: "Read the Journal", href: "#" },
      { label: "Career Guides", href: "#" },
      { label: "Chapter Toolkit", href: "#" },
      { label: "Brand Guidelines", href: "#" },
    ],
    GetInvolved: [
      { label: "Start a Chapter", href: "#involved" },
      { label: "Volunteer", href: "#" },
      { label: "Partner", href: "#" },
      { label: "Donate", href: "#" },
    ],
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@nextstepsjournal.org", label: "Email" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img 
              src={logo} 
              alt="NextSteps Logo" 
              className="h-16 w-auto mb-6 brightness-110"
            />
            <p className="text-primary-foreground/70 mb-6 max-w-sm leading-relaxed">
              Empowering high school students to explore careers through professional 
              interviews, research-based publications, and actionable guidance.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Organization</h4>
            <ul className="space-y-3">
              {footerLinks.Organization.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.GetInvolved.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} NextSteps Journal. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-secondary" /> by students, for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
