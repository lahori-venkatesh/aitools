import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/not-found";
import CategoryTools from "./pages/CategoryTools";
import AllTools from "./pages/AllTools";
import Home from "@/pages/Home";
import ToolDetail from "@/pages/ToolDetail";
import SubmitTool from "@/pages/SubmitTool";
import Blog from "@/pages/Blog";
import Admin from './pages/Admin';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools" component={AllTools} />
      <Route path="/tool/:slug" component={ToolDetail} />
      <Route path="/submit" component={SubmitTool} />
      <Route path="/blog" component={Blog} />
      <Route path="/category/:slug" component={CategoryTools} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;