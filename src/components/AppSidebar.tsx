
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  TreeDeciduous, 
  CalendarCheck, 
  CloudSun, 
  BarChart, 
  Settings, 
  ChevronLeft,
  ChevronRight 
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
  active?: boolean;
  to: string;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, to, collapsed }: SidebarItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-2 px-3 rounded-md mb-1 transition-colors",
        active 
          ? "bg-cashew-100 text-cashew-800" 
          : "text-cashew-700 hover:bg-cashew-50"
      )}
    >
      <Icon className="h-5 w-5 mr-2" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

const AppSidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-white border-r transition-all duration-300 flex flex-col h-screen",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex justify-end p-2">
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-6 w-6">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <SidebarItem icon={Home} label="Dashboard" active to="/" collapsed={collapsed} />
        <SidebarItem icon={TreeDeciduous} label="Trees" to="/trees" collapsed={collapsed} />
        <SidebarItem icon={CalendarCheck} label="Maintenance" to="/tasks" collapsed={collapsed} />
        <SidebarItem icon={CloudSun} label="Weather" to="/weather" collapsed={collapsed} />
        <SidebarItem icon={BarChart} label="Analytics" to="/analytics" collapsed={collapsed} />
      </nav>
      
      <div className="px-2 py-4 border-t">
        <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default AppSidebar;
