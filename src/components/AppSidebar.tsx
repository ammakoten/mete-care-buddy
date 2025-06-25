
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TreeDeciduous, 
  CalendarCheck, 
  CloudSun, 
  BarChart, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  badge?: string | number;
}

const SidebarItem = ({ icon: Icon, label, to, collapsed, badge }: SidebarItemProps) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-3 px-4 rounded-xl mb-2 transition-all duration-200 relative group hover:shadow-md",
        active 
          ? "bg-gradient-to-r from-cashew-500 to-cashew-600 text-white font-semibold shadow-lg transform scale-105" 
          : "text-cashew-700 hover:bg-gradient-to-r hover:from-cashew-100 hover:to-cashew-50 hover:text-cashew-800 hover:transform hover:scale-105"
      )}
    >
      <Icon className={cn(
        "h-6 w-6 transition-all duration-200", 
        collapsed ? "" : "mr-4",
        active ? "text-white" : "text-cashew-600 group-hover:text-cashew-700"
      )} />
      
      {!collapsed && (
        <span className="transition-all duration-200 font-medium">{label}</span>
      )}
      
      {/* Enhanced tooltip for collapsed sidebar */}
      {collapsed && (
        <div className="absolute left-full ml-3 px-3 py-2 bg-gradient-to-r from-cashew-800 to-cashew-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-xl border border-cashew-600 z-50">
          {label}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-cashew-800 rotate-45"></div>
        </div>
      )}
      
      {/* Enhanced badge */}
      {badge && !collapsed && (
        <span className="ml-auto bg-gradient-to-r from-cashew-600 to-cashew-700 text-white text-xs rounded-full px-3 py-1 font-semibold min-w-[24px] text-center shadow-md">
          {badge}
        </span>
      )}
      
      {/* Badge for collapsed state */}
      {badge && collapsed && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
          {badge}
        </span>
      )}
    </Link>
  );
};

const AppSidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-white/95 backdrop-blur-md border-r border-cashew-100/50 transition-all duration-300 flex flex-col h-screen shadow-xl sticky top-0 z-30",
        collapsed ? "w-20" : "w-72"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-cashew-100/50 bg-gradient-to-r from-cashew-50/50 to-transparent">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-cashew-500 to-cashew-600 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-cashew-800">Menu Utama</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar} 
          className="h-10 w-10 text-cashew-600 hover:bg-cashew-100 hover:text-cashew-800 rounded-xl transition-all duration-200 hover:shadow-md"
          title={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className={cn(
        "px-4 py-3 text-xs font-bold uppercase tracking-wider",
        collapsed ? "text-center text-cashew-400" : "text-left text-cashew-500"
      )}>
        {collapsed ? "•••" : "Navigasi Aplikasi"}
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <SidebarItem icon={Home} label="Beranda" to="/" collapsed={collapsed} />
        <SidebarItem icon={TreeDeciduous} label="Pohon" to="/trees" collapsed={collapsed} badge={12} />
        <SidebarItem icon={CalendarCheck} label="Pemeliharaan" to="/tasks" collapsed={collapsed} badge={5} />
        <SidebarItem icon={CloudSun} label="Cuaca" to="/weather" collapsed={collapsed} />
        <SidebarItem icon={BarChart} label="Analitik" to="/analytics" collapsed={collapsed} />
      </nav>
      
      <div className="px-4 pt-4 pb-6 border-t border-cashew-100/50 space-y-1 bg-gradient-to-b from-transparent to-cashew-25/30">
        <div className={cn(
          "text-xs font-bold uppercase tracking-wider mb-3",
          collapsed ? "text-center text-cashew-400" : "text-left text-cashew-500"
        )}>
          {collapsed ? "•••" : "Pengaturan"}
        </div>
        <SidebarItem icon={Settings} label="Pengaturan" to="/settings" collapsed={collapsed} />
        <SidebarItem icon={HelpCircle} label="Bantuan" to="/settings?tab=help" collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default AppSidebar;
