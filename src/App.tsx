import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import TeamPage from "./pages/TeamPage";
import JournalPage from "./pages/JournalPage";
import PartnersPage from "./pages/PartnersPage";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const defaultTitle = "NextSteps | Career Exploration & Mentorship for Students";
    const titleMap: Record<string, string> = {
      "/": defaultTitle,
      "/team": "Leadership | NextSteps",
      "/journal": "Journal | NextSteps",
      "/partners": "Partners | NextSteps",
      "/get-involved": "Get Involved | NextSteps",
      "/contact": "Contact | NextSteps",
    };

    const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
    document.title = titleMap[normalizedPath] ?? defaultTitle;
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
