
import { Bell, User, Search } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center lg:w-72">
          <h2 className="font-semibold text-lg text-gray-800">RestaurantOS</h2>
        </div>

        <div className="flex-1 px-6 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full md:max-w-xs bg-gray-50 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-semibold text-gray-800">Admin User</div>
              <div className="text-xs text-gray-500">Administrador</div>
            </div>
            <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
