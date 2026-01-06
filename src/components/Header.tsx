import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress from 0 to 1 over the first 80px of scroll
      const progress = Math.min(window.scrollY / 80, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Leadership", href: "/team" },
    { label: "Journal", href: "/" },
    { label: "Partners", href: "/" },
  ];

  // Interpolate values based on scroll progress
  const bgOpacity = scrollProgress;
  const isScrolled = scrollProgress > 0.5;

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'none',
      }}
    >
      {/* Background layer with progressive opacity */}
      <div 
        className="absolute inset-0 bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
        style={{
          opacity: bgOpacity,
          transition: 'opacity 0.1s ease-out',
        }}
      />
      
      <div className="container mx-auto px-4 relative">
        <nav className="flex items-center justify-between h-18">
          {/* Logo with crossfade */}
          <motion.a 
            href="/" 
            className="flex items-center relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* White logo (visible when transparent) */}
            <img 
              src={logoWhite} 
              alt="NextSteps Journal - Student Career Exploration" 
              className="h-12 w-auto absolute"
              style={{
                opacity: 1 - scrollProgress,
                transition: 'opacity 0.1s ease-out',
              }}
            />
            {/* Colored logo (visible when scrolled) */}
            <img 
              src={logo} 
              alt="NextSteps Journal - Student Career Exploration" 
              className="h-12 w-auto"
              style={{
                opacity: scrollProgress,
                transition: 'opacity 0.1s ease-out',
              }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium transition-colors link-underline"
                  style={{
                    color: `hsl(var(--muted-foreground) / ${0.8 + scrollProgress * 0.2})`,
                    opacity: 0.8 + scrollProgress * 0.2,
                    transition: 'color 0.1s ease-out, opacity 0.1s ease-out',
                    ...(scrollProgress < 0.5 && {
                      color: `hsl(var(--primary-foreground) / ${0.8 + (1 - scrollProgress) * 0.2})`,
                    }),
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <span
              className="text-sm font-medium px-4 py-2 cursor-pointer"
              style={{
                color: scrollProgress < 0.5 
                  ? 'hsl(var(--primary-foreground))' 
                  : 'hsl(var(--foreground))',
                opacity: 0.9,
                transition: 'color 0.2s ease-out',
              }}
            >
              <a 
                href="https://hcb.hackclub.com/donations/start/nextsteps" 
                target="_blank" 
                rel="noreferrer"
              >
                Donate
              </a>
            </span>
            <Button 
              variant={isScrolled ? "default" : "hero-primary"} 
              size="default" 
              asChild
              style={{
                transition: 'all 0.2s ease-out',
              }}
            >
              <a href="/get-involved">Get Involved</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              color: scrollProgress < 0.5 ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
              transition: 'color 0.2s ease-out',
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-card rounded-b-xl border-x border-b border-border"
            >
              <div className="py-6 px-4">
                <ul className="flex flex-col gap-1 mb-6">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        className="block py-3 px-4 rounded-lg text-foreground hover:bg-accent text-base font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full justify-center" asChild>
                    <a 
                      href="https://hcb.hackclub.com/donations/start/nextsteps" 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      Donate
                    </a>
                  </Button>
                  <Button variant="default" className="w-full" asChild>
                    <a href="/get-involved">Get Involved</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
