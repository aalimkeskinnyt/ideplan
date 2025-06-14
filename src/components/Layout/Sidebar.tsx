import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Building, BookOpen, Calendar, LogOut, Eye, Menu, X, GraduationCap, Home, Zap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { to: '/', icon: Home, label: 'Anasayfa', color: 'text-blue-600' },
    { to: '/subjects', icon: BookOpen, label: 'Dersler', color: 'text-indigo-600' },
    { to: '/teachers', icon: Users, label: 'Öğretmenler', color: 'text-blue-600' },
    { to: '/classes', icon: Building, label: 'Sınıflar', color: 'text-emerald-600' },
    { to: '/schedules', icon: Calendar, label: 'Program Oluştur', color: 'text-purple-600' },
    { to: '/auto-schedule', icon: Zap, label: 'Otomatik Program', color: 'text-purple-600' },
    { to: '/class-schedules', icon: GraduationCap, label: 'Sınıf Programları', color: 'text-emerald-600' },
    { to: '/all-schedules', icon: Eye, label: 'Öğretmen Programları', color: 'text-blue-600' },
    { to: '/pdf', icon: Calendar, label: 'PDF Çıktı', color: 'text-orange-600' }
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="btn-professional-secondary p-3 rounded-lg shadow-professional"
          aria-label="Menüyü aç/kapat"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        sidebar-professional fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-64
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="sidebar-header-professional">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <img 
                    src="https://cv.ide.k12.tr/images/ideokullari_logo.png" 
                    alt="İDE Okulları Logo"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-10 h-10 text-white flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>';
                      }
                    }}
                  />
                </div>
              </div>
              <h1 className="text-xl font-bold text-white">İDE Okulları</h1>
              <p className="text-sm text-blue-100 mt-1">Ders Programı Sistemi</p>
            </div>
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
              aria-label="Menüyü kapat"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav-professional">
          <ul className="nav-professional">
            {navItems.map(({ to, icon: Icon, label, color }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `nav-item-professional ${
                      isActive
                        ? 'active bg-blue-100 text-blue-800 border-r-4 border-blue-600 shadow-professional'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-professional'
                    }`
                  }
                >
                  <Icon 
                    size={22} 
                    className={`nav-icon-professional ${isActive ? 'text-blue-600' : color} transition-colors duration-200`}
                  />
                  <span className="flex-1 font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="sidebar-footer-professional">
          <button
            onClick={handleLogout}
            className="nav-item-professional w-full text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group rounded-lg"
          >
            <LogOut size={22} className="nav-icon-professional text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;