import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

const featuredArticles = [
  {
    title: "Breaking Into Tech: A Software Engineer's Journey",
    category: "Technology",
    readTime: "8 min read",
    excerpt: "From coding bootcamp to FAANG: one engineer shares their unconventional path to success in the tech industry.",
    date: "Jan 5, 2026",
  },
  {
    title: "The Future of Healthcare Careers",
    category: "Healthcare",
    readTime: "6 min read",
    excerpt: "Exploring emerging roles in telemedicine, AI diagnostics, and personalized medicine.",
    date: "Jan 3, 2026",
  },
  {
    title: "Sustainable Careers: Working in Climate Tech",
    category: "Environment",
    readTime: "7 min read",
    excerpt: "How young professionals are building careers that combat climate change.",
    date: "Dec 28, 2025",
  },
];

const recentArticles = [
  {
    title: "Day in the Life: Investment Banking Analyst",
    category: "Finance",
    readTime: "5 min read",
  },
  {
    title: "From Intern to CEO: Leadership Lessons",
    category: "Business",
    readTime: "10 min read",
  },
  {
    title: "Creative Careers: Making It as a UX Designer",
    category: "Design",
    readTime: "6 min read",
  },
  {
    title: "The Path to Becoming a Doctor",
    category: "Healthcare",
    readTime: "8 min read",
  },
  {
    title: "Engineering Your Future: Civil Engineering",
    category: "Engineering",
    readTime: "7 min read",
  },
  {
    title: "Law School and Beyond: A Lawyer's Perspective",
    category: "Law",
    readTime: "9 min read",
  },
];

const categories = [
  "All",
  "Technology",
  "Healthcare",
  "Business",
  "Engineering",
  "Design",
  "Finance",
  "Law",
  "Education",
];

const JournalPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">NextSteps Journal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Career Insights & Stories
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                In-depth research, professional interviews, and actionable guidance to help you navigate your career journey.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer transition-shadow hover:shadow-xl"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Recent Articles</h2>
              <Button variant="outline" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentArticles.map((article, index) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border cursor-pointer hover:border-primary/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary font-medium">{article.category}</span>
                    <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                Get the latest career insights and professional interviews delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                />
                <Button variant="secondary" size="lg" className="rounded-full">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default JournalPage;
