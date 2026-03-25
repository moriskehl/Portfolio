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

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(2px)" }}
        transition={{ duration: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
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
      <ThemeProvider defaultTheme="dark">
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
