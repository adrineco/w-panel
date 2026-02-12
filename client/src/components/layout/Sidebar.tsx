import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
  { name: 'Usuários', path: '/users', icon: <Users className="w-5 h-5" /> },
  { name: 'Relatórios', path: '/reports', icon: <BarChart3 className="w-5 h-5" /> },
  { name: 'Documentos', path: '/documents', icon: <FileText className="w-5 h-5" /> },
  { name: 'Configurações', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-border transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-foreground" />
        )}
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                active
                  ? 'bg-primary text-white'
                  : 'text-muted hover:bg-muted hover:text-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.name : ''}
            >
              {item.icon}
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
