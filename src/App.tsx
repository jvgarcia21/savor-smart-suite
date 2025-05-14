
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import POS from "./pages/POS";
import NotFound from "./pages/NotFound";

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
          {/* Rutas adicionales que se implementarán posteriormente */}
          <Route path="/reservations" element={<div>Próximamente: Módulo de Reservas</div>} />
          <Route path="/inventory" element={<div>Próximamente: Módulo de Inventario</div>} />
          <Route path="/staff" element={<div>Próximamente: Módulo de Personal</div>} />
          <Route path="/reports" element={<div>Próximamente: Módulo de Reportes</div>} />
          <Route path="/settings" element={<div>Próximamente: Módulo de Configuración</div>} />
          {/* Ruta 404 para manejar rutas no existentes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
