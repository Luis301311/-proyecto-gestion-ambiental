import { useState } from 'react';
import { Waves, Menu, X } from 'lucide-react';

const NavbarSTARX = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navItems = [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'simuladores', label: 'Simuladores', href: '#simuladores' },
    { id: 'equipo', label: 'Equipo', href: '#equipo' },
  ];

  return (
    <nav className="fixed w-full bg-slate-900/80 backdrop-blur-lg border-b border-cyan-500/20 z-50 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Nombre */}
          <div className="flex items-center gap-4 group cursor-pointer">
            {/* Logo con efecto de brillo */}
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <Waves className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Nombre y subtítulo */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-wider">
                STARX
              </h1>
              <p className="text-xs text-cyan-300/70 tracking-wide">
                Water Treatment Simulator
              </p>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 pb-1 ${
                  activeSection === item.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Botón Menú Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm font-medium transition-all duration-300 py-2 px-4 rounded-lg ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarSTARX;