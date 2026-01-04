import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/" },
    { label: "Leadership", href: "/team" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-18">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src={logo} 
              alt="NextSteps" 
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation - Editorial minimal style */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm tracking-wide transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA - Single primary action */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Donate
            </a>
            <Button variant="default" size="default" asChild>
              <a href="/get-involved">Get Involved</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <ul className="flex flex-col gap-1 mb-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-3 text-foreground text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <a href="#" className="text-sm text-muted-foreground py-2">
                Donate
              </a>
              <Button variant="default" className="w-full" asChild>
                <a href="/get-involved">Get Involved</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
