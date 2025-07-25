
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cashew-25 via-white to-cashew-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleSidebar} />
          <div className="relative">
            <AppSidebar collapsed={false} toggleSidebar={toggleSidebar} />
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        <AppHeader sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 w-full">
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8 max-w-[1400px] mx-auto w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-white/20 min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </main>
        
        <footer className="py-4 lg:py-6 px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-cashew-600 bg-white/50 backdrop-blur-sm border-t border-cashew-100/50">
          <div className="max-w-[1400px] mx-auto">
            <p className="font-medium">&copy; {new Date().getFullYear()} Aplikasi Pemeliharaan Jambu Mete. Semua hak dilindungi.</p>
            <p className="text-xs text-cashew-500 mt-1 hidden sm:block">Dikembangkan dengan teknologi modern untuk efisiensi maksimal</p>
          </div>
        </footer>
      </div>
      
      <Toaster />
      <SonnerToaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 165, 68, 0.2)',
            borderRadius: '12px',
          }
        }}
      />
    </div>
  );
};

export default AppLayout;
