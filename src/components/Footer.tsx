import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import privacyPolicyPdf from "@/assets/importantdocuments/NextSteps Journal PRIVACY POLICY.pdf";
import termsPdf from "@/assets/importantdocuments/NextSteps Journal GENERAL TERMS & CONDITIONS.pdf";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  const links = {
    Organization: [
      { label: "About", href: "/#about" },
      { label: "Journal", href: "/journal" },
      { label: "Team", href: "/team" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],

    Contribute: [
      {
        label: "Become a Volunteer",
        href: "https://shortyhub.com/nextstepsjournal",
        external: true,
      },
      {
        label: "Be Interviewed",
        href: "https://forms.gle/Px5PcUdWBRWdDsMRA",
        external: true,
      },
      {
        label: "Partner with Us",
        href: "https://forms.gle/Px5PcUdWBRWdDsMRA",
        external: true,
      },
      {
        label: "Donate",
        href: "https://hcb.hackclub.com/donations/start/nextsteps",
        external: true,
      },
      {
        label: "Careers",
        href: "https://jobs.talenthr.io/nextstepsjournal",
        external: true,
      },
    ],
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      return;
    }
    setIsNewsletterSubmitted(true);
    setNewsletterEmail("");
  };

  const socials = [
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://instagram.com/nextstepsjournal",
      external: true,
    },
    {
      icon: FaTiktok,
      label: "TikTok",
      href: "https://tiktok.com/@nextstepsjournal",
      external: true,
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      href: "https://linkedin.com/company/next-steps-journal",
      external: true,
    },
    { icon: IoMail, label: "Contact", href: "/contact", external: false },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 items-center justify-items-center">
          <div className="col-span-2 w-full max-w-sm mx-auto">
            <motion.img
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              src={logoWhite}
              alt="NextSteps Journal"
              className="h-14 w-auto mb-6"
            />
            <p className="text-base text-primary-foreground/70 max-w-xs mb-8 leading-relaxed">
              Career exploration through professional interviews and mentorship, prioritizing
              under-resourced communities.
            </p>

            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "me noopener noreferrer" : undefined}
                  aria-label={`Follow NextSteps Journal on ${social.label}`}
                  whileHover={{
                    y: -4,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 bg-ring"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <motion.div
              key={title}
              className="w-full max-w-[230px] mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
            >
              <h4 className="font-semibold text-sm mb-5 text-primary-foreground">{title}</h4>
              <ul className="space-y-3">
                {items.map((link) => (
                  <motion.li key={link.label} variants={itemVariants}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            className="col-span-2 w-full max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            {!isNewsletterSubmitted ? (
              <div className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-4 text-center">
                <h4 className="text-xl md:text-2xl font-display font-semibold text-primary-foreground">
                  Newsletter waitlist
                </h4>
                <p className="text-sm text-primary-foreground/85 leading-relaxed mt-1.5 max-w-lg mx-auto">
                  Join our waitlist for launch updates, featured interviews, and new career resources.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="mt-3 w-full max-w-md mx-auto flex flex-col gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-background/95 border border-primary-foreground/25 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg px-4 py-2.5 bg-ring text-primary-foreground text-sm font-semibold hover:bg-ring/90 transition-colors"
                  >
                    Join the Waitlist
                  </button>
                </form>
                <p className="text-xs text-primary-foreground/60 mt-2 leading-relaxed max-w-lg mx-auto">
                  We send occasional updates only. No spam.
                </p>
              </div>
            ) : (
              <div className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-4 text-center">
                <h4 className="text-xl md:text-2xl font-display font-semibold text-primary-foreground">
                  Newsletter Waitlist
                </h4>
                <p className="text-sm text-primary-foreground/85 leading-relaxed flex items-center justify-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                  You&apos;re on the waitlist.
                </p>
                <p className="text-xs text-primary-foreground/60 mt-2">
                  We&apos;ll notify you when new newsletter updates are available.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} NextSteps Journal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={privacyPolicyPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={termsPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
