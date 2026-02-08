import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useEffect, useMemo } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { leadership } from "@/components/Leadership";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staffMembers = [
  { name: "Anusha Seth", role: "Operations Executive Assistant", department: "Operations" },
  { name: "Arnav Deshmukh", role: "Finance Staff", department: "Finance" },
  { name: "Arun Buttey", role: "Operations Staff", department: "Operations" },
  { name: "Atharvaa Velliyangiri", role: "Tech Support", department: "Technology" },
  { name: "Farida Abbas", role: "Operations Executive Assistant", department: "Operations" },
  { name: "Harry Honig", role: "Ops Executive Assistant", department: "Operations" },
  { name: "Juliana Cuyubamba", role: "Marketing Staff", department: "Marketing" },
  { name: "Kabya Naik", role: "Asia Chapter Head", department: "Chapters" },
  { name: "Neel Nabar", role: "Finance Staff", department: "Finance" },
  { name: "Nevish Uppala", role: "Outreach Staff", department: "Outreach" },
  { name: "Raghav Khandelia", role: "HR Executive Assistant", department: "Human Resources" },
  { name: "Rizky Febriyanto", role: "Graphic Designer", department: "Marketing" },
  { name: "Ryan Rawal", role: "Tech Executive Assistant", department: "Technology" },
  { name: "Vivakar Kumar", role: "E&R Executive Assistant", department: "Education & Research" },
  { name: "Tahlia Smith", role: "Operations Staff", department: "Operations" },
  { name: "Achyutam Bhaskar", role: "Tech Staff", department: "Technology" },
  { name: "Chloe", role: "North America Chapter Head", department: "Chapters" },
];

const TeamPage = () => {
  const staffByDepartment = useMemo(() => {
    const grouped = new Map<string, typeof staffMembers>();
    staffMembers.forEach((member) => {
      const existing = grouped.get(member.department) ?? [];
      existing.push(member);
      grouped.set(member.department, existing);
    });
    return Array.from(grouped.entries()).map(([department, members]) => ({
      department,
      members,
    }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay opacity-95 z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs tone="dark" className="mb-6" listClassName="w-full justify-center" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 md:mb-6">
                Our Team
              </h1>
              <p className="text-base md:text-lg lg:text-2xl text-primary-foreground/80">
                Dedicated directors and staff committed to guiding youth toward their brightest futures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Executives + Staff */}
        <section className="py-12 md:py-20">
          <div className="mx-auto w-full max-w-[1700px] px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <h2 className="text-display-lg font-display font-semibold text-foreground leading-tight">
                Executives
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-body-lg">
                Meet the leadership team driving NextSteps strategy, programs, and impact across regions and disciplines.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 lg:grid-cols-5 items-start gap-4 md:gap-6 xl:gap-8"
            >
              {leadership.map((person) => (
                <motion.div
                  key={person.name}
                  variants={itemVariants}
                  className="group self-start min-h-[230px] md:min-h-[270px] bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Photo */}
                  <div className="px-4 pt-5 md:pt-6 flex items-center justify-center">
                    <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="h-full w-full rounded-full object-cover border border-border/60"
                      />
                    </div>
                  </div>

                  {/* Name, role, LinkedIn, bio */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-start justify-between gap-2 min-h-[80px] md:min-h-[88px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-base md:text-lg font-semibold text-foreground mb-0.5 leading-tight [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                          {person.name}
                        </p>
                        <p className="text-primary font-medium text-sm md:text-[15px] leading-tight [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                          {person.role}
                        </p>
                      </div>
                      <motion.a
                        href={person.linkedin ?? "#"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </motion.a>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pr-1 max-h-[7.5rem] md:max-h-[8.5rem] overflow-y-auto">
                        {person.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-14 md:mt-20">
              <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
                <h2 className="text-display-lg font-display font-semibold text-foreground leading-tight">
                  Staff
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed text-body-lg">
                  Our staff supports day-to-day execution across operations, outreach, finance, marketing, and technology.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
                <div
                  className="max-h-80 overflow-y-auto overscroll-contain rounded-xl border border-border/60 bg-background"
                >
                  {staffByDepartment.map((departmentSection) => (
                    <div
                      key={departmentSection.department}
                      className="border-b border-border/60 last:border-b-0"
                    >
                      <div className="px-5 py-2 md:px-6 bg-primary/10">
                        <p className="text-[11px] md:text-xs font-semibold uppercase tracking-wide text-primary">
                          {departmentSection.department}
                        </p>
                      </div>

                      <ul className="divide-y divide-border/60">
                        {departmentSection.members.map((member) => (
                          <li key={`${member.name}-${member.role}`} className="px-5 py-3 md:px-6 md:py-4">
                            <p className="text-sm md:text-base font-medium text-foreground">{member.name}</p>
                            <p className="text-xs md:text-sm text-primary">{member.role}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 hero-overlay z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3 md:mb-4 md:text-display-lg">
                Want to Join Our Team?
              </h2>
              <p className="text-sm text-primary-foreground/80 mb-6 md:mb-8 md:text-xl">
                We're always looking for passionate individuals who want to make a difference in young people's lives.
              </p>
              <Button size="lg" variant="hero-primary" asChild>
                <a href="https://jobs.talenthr.io/nextstepsjournal" target="_blank" rel="noopener noreferrer">Take a look at our Careers</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default TeamPage;
