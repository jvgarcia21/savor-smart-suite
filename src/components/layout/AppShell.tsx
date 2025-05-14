
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-grow">
          <TopBar onMenuClick={toggleSidebar} />
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
