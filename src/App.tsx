
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import POS from "./pages/POS";
import NotFound from "./pages/NotFound";
import Inventory from "./pages/Inventory";
import Reservations from "./pages/Reservations";
import Staff from "./pages/Staff";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Authentication from "./pages/Authentication";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth" element={<Authentication />} />
          {/* Ruta 404 para manejar rutas no existentes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
