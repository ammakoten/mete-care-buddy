
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
  HelpCircle
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
        "flex items-center py-2.5 px-3 rounded-lg mb-1 transition-all duration-150 relative group",
        active 
          ? "bg-cashew-100 text-cashew-800 font-medium" 
          : "text-cashew-700 hover:bg-cashew-50 hover:text-cashew-800"
      )}
    >
      <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
      
      {!collapsed && (
        <span className="transition-opacity duration-200">{label}</span>
      )}
      
      {/* Tooltip for collapsed sidebar */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-cashew-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
          {label}
        </div>
      )}
      
      {/* Badge */}
      {badge && !collapsed && (
        <span className="ml-auto bg-cashew-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
          {badge}
        </span>
      )}
      
      {/* Badge for collapsed state */}
      {badge && collapsed && (
        <span className="absolute top-0 right-0 bg-cashew-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
        "bg-white border-r border-cashew-100 transition-all duration-300 flex flex-col h-screen shadow-sm sticky top-0 z-20",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-end p-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar} 
          className="h-8 w-8 text-cashew-600 hover:bg-cashew-50"
          title={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className={cn(
        "px-3 py-4 mb-2 text-xs font-medium uppercase text-cashew-500",
        collapsed ? "text-center" : "text-left"
      )}>
        {collapsed ? "Menu" : "Navigasi Utama"}
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1">
        <SidebarItem icon={Home} label="Beranda" to="/" collapsed={collapsed} />
        <SidebarItem icon={TreeDeciduous} label="Pohon" to="/trees" collapsed={collapsed} badge={12} />
        <SidebarItem icon={CalendarCheck} label="Pemeliharaan" to="/tasks" collapsed={collapsed} badge={5} />
        <SidebarItem icon={CloudSun} label="Cuaca" to="/weather" collapsed={collapsed} />
        <SidebarItem icon={BarChart} label="Analitik" to="/analytics" collapsed={collapsed} />
      </nav>
      
      <div className="px-3 pt-4 pb-6 border-t border-cashew-100 space-y-1">
        <SidebarItem icon={Settings} label="Pengaturan" to="/settings" collapsed={collapsed} />
        <SidebarItem icon={HelpCircle} label="Bantuan" to="#" collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default AppSidebar;
