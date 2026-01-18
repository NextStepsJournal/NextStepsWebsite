import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import researchImg from "@/assets/activities/research.jpg";
import interviewsImg from "@/assets/activities/interviews.jpg";
import workshopsImg from "@/assets/activities/workshops.jpg";
import chaptersImg from "@/assets/activities/chapters.jpg";
import guideImg from "@/assets/activities/guide.jpg";

const activities = [
  {
    title: "Research",
    description:
      "Volunteers conduct in-depth research to create valuable career resources that benefit students exploring different paths.",
    image: researchImg,
  },
  {
    title: "Interviews",
    description:
      "Professional interviews with industry experts to support research and provide authentic career insights.",
    image: interviewsImg,
  },
  {
    title: "Workshops",
    description:
      "Online and in-person workshops and activities to help students develop skills, network and explore career options.",
    image: workshopsImg,
  },
  {
    title: "Chapters",
    description:
      "Student-led teams expanding access and creating impact in schools and communities worldwide.",
    image: chaptersImg,
  },
  {
    title: "Guide",
    description:
      "Structured resources, mentorship pathways, and actionable steps for students to explore careers.",
    image: guideImg,
  },
];

interface ActivityCardProps {
  activity: (typeof activities)[0];
  isActive: boolean;
}

const ActivityCard = ({ activity, isActive }: ActivityCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]"
        style={{
          backgroundImage: `url(${activity.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{
          y: isActive ? -20 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Purple tint overlay */}
      <div className="absolute inset-0 bg-primary/25 mix-blend-overlay" />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        <motion.h3
          className="font-display text-white text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {activity.title}
        </motion.h3>
        <motion.p
          className="text-white/90 text-lg md:text-xl leading-relaxed max-w-md drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {activity.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Activities = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative circles with parallax */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-20 right-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h2 className="text-display-lg font-display font-semibold text-primary-foreground">
            Our Activities
          </h2>
        </motion.div>

        {/* White box container for carousel */}
        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl">
          {/* Carousel with fade edges */}
          <div className="relative">
            {/* Left fade edge */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-card to-transparent z-20 pointer-events-none rounded-l-2xl" />
            
            {/* Right fade edge */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-card to-transparent z-20 pointer-events-none rounded-r-2xl" />

            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {activities.map((activity, index) => {
                  const isActive = current === index;
                  const distance = Math.abs(current - index);
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.7 : 0.4;

                  return (
                    <CarouselItem
                      key={activity.title}
                      className="pl-4 md:pl-8 basis-[85%] md:basis-[45%] lg:basis-[35%]"
                    >
                      <motion.div
                        animate={{
                          opacity,
                          scale: isActive ? 1 : 0.92,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ActivityCard
                          activity={activity}
                          isActive={isActive}
                        />
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="left-2 md:left-4 z-30 bg-primary/80 backdrop-blur-sm border-primary text-white hover:bg-primary hover:text-white" />
              <CarouselNext className="right-2 md:right-4 z-30 bg-primary/80 backdrop-blur-sm border-primary text-white hover:bg-primary hover:text-white" />
            </Carousel>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
