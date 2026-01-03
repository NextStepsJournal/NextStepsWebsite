import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Values from "@/components/Values";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Activities />
          <Values />
          <GetInvolved />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
