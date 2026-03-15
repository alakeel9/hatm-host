import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./pages/Dashboard";
import AdminPortal from "./pages/AdminPortal";
import VendorPortal from "./pages/VendorPortal";
import CoordinatorPortal from "./pages/CoordinatorPortal";
import RSVPTracking from "./pages/RSVPTracking";
import ManualManagement from "./pages/ManualManagement";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/vendor" element={<VendorPortal />} />
          <Route path="/coordinator" element={<CoordinatorPortal />} />
          <Route path="/rsvp" element={<RSVPTracking />} />
          <Route path="/manual" element={<ManualManagement />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
