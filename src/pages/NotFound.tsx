
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-8xl font-bold text-restaurant-primary mb-4">404</div>
        <h1 className="text-3xl font-semibold mb-4">Página no encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
        <Button asChild className="bg-restaurant-primary hover:bg-restaurant-primary/90">
          <Link to="/">Volver al Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
