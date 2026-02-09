import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-students.jpg";
import ImageWithLoader from "@/components/ImageWithLoader";
import Breadcrumbs from "@/components/Breadcrumbs";

// University logos
import uclaLogo from "@/assets/universities/ucla.png";
import upennLogo from "@/assets/universities/upenn.png";
import mitLogo from "@/assets/universities/mit.png";
import michiganLogo from "@/assets/universities/michigan.png";
import northwesternLogo from "@/assets/universities/northwestern.png";
import uopeopleLogo from "@/assets/universities/uopeople.png";
const universities = [{
  name: "UCLA",
  logo: uclaLogo
}, {
  name: "UPenn",
  logo: upennLogo
}, {
  name: "MIT",
  logo: mitLogo
}, {
  name: "Michigan",
  logo: michiganLogo
}, {
  name: "Northwestern",
  logo: northwesternLogo
}, {
  name: "University of the People",
  logo: uopeopleLogo
}];
const stats = [{
}];
const LOGO_SCROLL_SPEED = 72;
const Hero = () => {
  const conveyorViewportRef = useRef<HTMLDivElement | null>(null);
  const conveyorTrackRef = useRef<HTMLDivElement | null>(null);
  const conveyorSetRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const xOffsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const [repeatCount, setRepeatCount] = useState(4);
  const repeatedSets = useMemo(() => Array.from({
    length: repeatCount
  }, (_, i) => i), [repeatCount]);

  useEffect(() => {
    const viewport = conveyorViewportRef.current;
    const track = conveyorTrackRef.current;
    const set = conveyorSetRef.current;
    if (!viewport || !track || !set) {
      return;
    }

    const measure = () => {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const setWidth = set.getBoundingClientRect().width;
      if (!viewportWidth || !setWidth) {
        return;
      }
      setWidthRef.current = setWidth;

      const neededSets = Math.max(4, Math.ceil(viewportWidth * 2 / setWidth) + 2);
      setRepeatCount(neededSets);

      while (xOffsetRef.current <= -setWidth) {
        xOffsetRef.current += setWidth;
      }
      while (xOffsetRef.current > 0) {
        xOffsetRef.current -= setWidth;
      }
      track.style.transform = `translate3d(${xOffsetRef.current}px, 0, 0)`;
    };

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const setWidth = setWidthRef.current;
      if (setWidth > 0) {
        xOffsetRef.current -= LOGO_SCROLL_SPEED * dt;
        while (xOffsetRef.current <= -setWidth) {
          xOffsetRef.current += setWidth;
        }
        track.style.transform = `translate3d(${xOffsetRef.current}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(viewport);
    resizeObserver.observe(set);

    measure();
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, []);

  return <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 hero-overlay z-0" />
      <div className="absolute inset-0 z-10">
        <ImageWithLoader src={heroImage} alt="Diverse students collaborating on career exploration projects" className="w-full h-full object-cover opacity-15" containerClassName="w-full h-full" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl z-10" />
      <div className="absolute bottom-1/3 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl z-10" />

      {/* Breadcrumbs */}
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="container mx-auto px-4 pt-20 md:pt-24">
          <Breadcrumbs tone="dark" hideOnHome />
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-20 mx-auto px-4 py-12 md:py-24 flex-1 flex items-center">
        <div className="max-w-4xl">
          {/* Badge */}
          

          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.1
        }} className="text-4xl sm:text-5xl md:text-[5.5rem] font-display font-semibold text-primary-foreground leading-[1.05] mb-6 md:mb-8">
            Helping Students Take Their{" "}
            <br className="hidden sm:block" />
            <span className="italic text-primary-foreground/90 font-serif font-bold">Next Steps</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.25
        }} className="text-base sm:text-xl md:text-2xl text-primary-foreground/80 mb-8 md:mb-12 leading-relaxed max-w-2xl">
            Career exploration through professional interviews and mentorship - prioritizing under-resourced communities.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.4
        }} className="flex flex-wrap gap-4">
            <Button variant="hero-primary" size="xl" className="group" asChild>
              <a href="/get-involved" className="inline-flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="hero-secondary" size="xl" className="group" asChild>
              <Link to="/journal" className="inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Read The Journal
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.7,
          delay: 0.7
        }} className="flex gap-6 sm:gap-12 mt-12 md:mt-20 pt-6 md:pt-10 border-t border-primary-foreground/20">
            {stats.map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.8 + index * 0.1
          }}>
                <div className="text-2xl sm:text-4xl md:text-5xl font-mono-nums font-semibold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-primary-foreground/60 mt-1 sm:mt-2 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </div>

      {/* University Conveyor Belt */}
      <div className="relative z-20 w-full overflow-hidden py-10">
        <motion.p initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1
      }} className="text-center text-base font-semibold text-primary-foreground/80 mb-6 tracking-wide uppercase">
          Backed by students accepted into
        </motion.p>
        
        <div className="bg-card/95 backdrop-blur-sm py-8 border-y border-border/50">
          <div ref={conveyorViewportRef} className="relative flex overflow-hidden fade-edges">
            <div ref={conveyorTrackRef} className="flex w-max items-center will-change-transform">
              {repeatedSets.map(copyIndex => <div key={`universities-copy-${copyIndex}`} ref={copyIndex === 0 ? conveyorSetRef : undefined} className="flex shrink-0 items-center gap-20 px-10">
                  {universities.map(uni => <div key={`${uni.name}-${copyIndex}`} className="flex-shrink-0 flex items-center justify-center h-16 w-36">
                      <img src={uni.logo} alt={`${uni.name} logo`} className="max-h-14 max-w-[130px] object-contain opacity-90 hover:opacity-100 transition-opacity duration-300" loading="eager" decoding="async" />
                    </div>)}
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
