import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Organization: ["About", "Journal", "Leadership"],
    Resources: ["Chapter Toolkit"],
    Involve: ["Start a Chapter", "Volunteer", "Partner", "Donate"],
  };

  const socials = [
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/nextstepsjournal", external: true },
    { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com/@nextstepsjournal", external: true },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com/company/next-steps-journal", external: true },
    { icon: IoMail, label: "Contact", href: "/contact", external: false },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <img src={logoWhite} alt="NextSteps" className="h-12 w-auto mb-6" />
            <p className="text-sm text-primary-foreground/60 max-w-xs mb-8 leading-relaxed">
              Career exploration through professional interviews and mentorship.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-5">
              Organization
            </h4>
            <ul className="space-y-3">
              {links.Organization.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {links.Resources.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary-foreground/50 mb-5">
              Get Involved
            </h4>
            <ul className="space-y-3">
              {links.Involve.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 py-6">
          <p className="text-xs text-primary-foreground/40">
            © {currentYear} NextSteps Journal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
