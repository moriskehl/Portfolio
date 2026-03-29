import { Route, Switch, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Achievements from "./pages/Achievements";
import Impressum from "./pages/Impressum";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
};

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo({ top: 0 })}
    >
      <motion.div
        key={location}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", overflowX: "hidden", width: "100%", position: "relative" }}
      >
        <Switch location={location}>
          <Route path={"/"} component={Home} />
          <Route path={"/cv"} component={Resume} />
          <Route path={"/achievements"} component={Achievements} />
          <Route path={"/projects"} component={Projects} />
          <Route path={"/impressum"} component={Impressum} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Navbar />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
