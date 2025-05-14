
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CalendarDays, 
  Package, 
  Users, 
  PieChart, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "POS", icon: ShoppingCart, path: "/pos" },
  { title: "Reservas", icon: CalendarDays, path: "/reservations" },
  { title: "Inventario", icon: Package, path: "/inventory" },
  { title: "Personal", icon: Users, path: "/staff" },
  { title: "Reportes", icon: PieChart, path: "/reports" },
  { title: "Configuración", icon: Settings, path: "/settings" },
];

export default function AppSidebar() {
  const location = useLocation();
  
  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="px-6 py-5 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-restaurant-primary rounded-md p-1">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="font-semibold text-lg">RestaurantOS</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={isActivePage(item.path) ? "bg-primary/10 text-primary font-medium" : ""}
                  >
                    <Link to={item.path} className="flex items-center gap-3 w-full">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-6 py-4">
        <button className="flex items-center gap-3 w-full text-gray-600 hover:text-gray-900">
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
