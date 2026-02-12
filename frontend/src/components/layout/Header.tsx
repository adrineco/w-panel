import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, LogOut, User, Settings, ChevronDown } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Lock className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">W-Panel</h1>
        </div>

        {/* User Area */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted">{user?.email}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-20">
                <div className="p-2">
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 text-muted" />
                    <span className="text-sm text-foreground">Meu Perfil</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-muted" />
                    <span className="text-sm text-foreground">Configurações</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors text-left"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">Sair</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
