import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = {
    Organization: [{
      label: "About",
      href: "#about"
    }, {
      label: "Journal",
      href: "/journal"
    }, {
      label: "Leadership",
      href: "/team"
    }, {
      label: "Partners",
      href: "/partners"
    }, {
      label: "Contact",
      href: "/contact"
    }],
    Resources: [{
      label: "Chapter Toolkit",
      href: "/"
    }],
    Contribute: [{
      label: "Volunteer",
      href: "https://shortyhub.com/nextstepsjournal"
    }, {
      label: "Be Interviewed",
      href: "https://forms.gle/Px5PcUdWBRWdDsMRA"
    }, {
      label: "Partner",
      href: "https://forms.gle/Px5PcUdWBRWdDsMRA"
    }, {
      label: "Donate",
      href: "https://hcb.hackclub.com/donations/start/nextsteps"
    }, {
      label: "Careers",
      href: "/"
    }]
  };
  const socials = [{
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/nextstepsjournal",
    external: true
  }, {
    icon: FaTiktok,
    label: "TikTok",
    href: "https://tiktok.com/@nextstepsjournal",
    external: true
  }, {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://linkedin.com/company/next-steps-journal",
    external: true
  }, {
    icon: IoMail,
    label: "Contact",
    href: "/contact",
    external: false
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <motion.img initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} src={logoWhite} alt="NextSteps Journal" className="h-14 w-auto mb-6" />
            <p className="text-base text-primary-foreground/70 max-w-xs mb-8 leading-relaxed">
              Career exploration through professional interviews and mentorship, prioritizing under-resourced communities.
            </p>
            
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((social, index) => <motion.a key={social.label} href={social.href} target={social.external ? "_blank" : undefined} rel={social.external ? "noopener noreferrer" : undefined} aria-label={`Follow NextSteps Journal on ${social.label}`} whileHover={{
              y: -4,
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }} className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 bg-ring">
                  <social.icon className="w-4 h-4" />
                </motion.a>)}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => <motion.div key={title} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true
        }}>
              <h4 className="font-semibold text-sm mb-5 text-primary-foreground">{title}</h4>
              <ul className="space-y-3">
                {items.map(link => <motion.li key={link.label} variants={itemVariants}>
                    <a href={link.href} className="group text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors inline-flex items-center gap-1">
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </motion.li>)}
              </ul>
            </motion.div>)}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} NextSteps Journal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
              Privacy Policy
            </a>
            <a href="/" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;