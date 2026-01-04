import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { motion } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    Organization: ["About", "Journal", "Leadership", "Partners"],
    Resources: ["Chapter Toolkit"],
    Involve: ["Start a Chapter", "Volunteer", "Partner", "Donate", "Careers"],
  };

  const socials = [
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/nextstepsjournal", external: true },
    { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com/@nextstepsjournal", external: true },
    { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com/company/next-steps-journal", external: true },
    { icon: IoMail, label: "Contact", href: "/contact", external: false },
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
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
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
