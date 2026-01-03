import { Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";

// Custom TikTok icon (filled style)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Organization: ["About", "Mission", "Journal", "Leadership"],
    Resources: ["Career Guides", "Chapter Toolkit"],
    Involve: ["Start a Chapter", "Volunteer", "Partner", "Donate", "Careers"],
  };

  const socials = [
    { icon: Instagram, label: "Instagram", isSvg: false },
    { icon: TikTokIcon, label: "TikTok", isSvg: true },
    { icon: Linkedin, label: "LinkedIn", isSvg: false },
    { icon: Mail, label: "Email", isSvg: false },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <img src={logoWhite} alt="NextSteps" className="h-16 w-auto mb-4" />
            <p className="text-sm text-primary-foreground/60 max-w-xs mb-6">
              Career exploration through professional interviews and mentorship.
            </p>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  {social.isSvg ? (
                    <social.icon className="w-4 h-4" />
                  ) : (
                    <social.icon className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Organization</h4>
            <ul className="space-y-2">
              {links.Organization.map((link) => (
                <li key={link}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 3 }}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.Resources.map((link) => (
                <li key={link}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 3 }}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Get Involved</h4>
            <ul className="space-y-2">
              {links.Involve.map((link) => (
                <li key={link}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 3 }}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} NextSteps Journal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
