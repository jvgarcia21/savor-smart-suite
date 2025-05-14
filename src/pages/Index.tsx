
import { ShoppingCart, Users, Calendar, Package } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/dashboard/StatCard";
import SalesChart from "@/components/dashboard/SalesChart";
import TableStatus from "@/components/dashboard/TableStatus";
import InventoryAlert from "@/components/dashboard/InventoryAlert";

const Dashboard = () => {
  return (
    <AppShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select className="border rounded-md px-3 py-1.5 text-sm bg-white">
            <option>Hoy</option>
            <option>Ayer</option>
            <option>Esta semana</option>
            <option>Este mes</option>
            <option>Personalizado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Ventas de hoy" 
          value="$12,456" 
          description="Total de ventas del día"
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
          trend="up"
          trendValue="15% vs. ayer"
        />
        <StatCard 
          title="Clientes" 
          value="128" 
          description="Visitas del día"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend="neutral"
          trendValue="2% vs. ayer"
        />
        <StatCard 
          title="Reservas" 
          value="24" 
          description="Para hoy"
          icon={<Calendar className="h-5 w-5 text-primary" />}
          trend="up"
          trendValue="8% vs. ayer"
        />
        <StatCard 
          title="Inventario" 
          value="4" 
          description="Alertas de stock"
          icon={<Package className="h-5 w-5 text-primary" />}
          trend="down"
          trendValue="2 menos que ayer"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
        <SalesChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TableStatus />
        <InventoryAlert />
      </div>
    </AppShell>
  );
};

export default Dashboard;
