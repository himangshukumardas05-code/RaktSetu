import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut, Bell, Search, Settings, Home, BarChart3, Calendar, Users, Droplet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../public/logo.png';

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
    setIsDesktopSidebarOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsDesktopSidebarOpen(false);
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/donate', label: 'Donate Blood', icon: Droplet },
    { path: '/find-donors', label: 'Find Donors', icon: Users },
    { path: '/blood-banks', label: 'Blood Banks', icon: BarChart3 },
    { path: '/events', label: 'Events', icon: Calendar },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Improved sizing and spacing */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="rounded-lg transition-all duration-300 transform group-hover:scale-105">
                <img 
                  src={logo}
                  alt="RaktSetu Logo"
                  className="h-14 w-14 object-contain" 
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent group-hover:from-red-700 group-hover:to-red-800 transition-all duration-300">
                RaktSetu
              </span>
            </Link>

            {/* Desktop Navigation - Improved spacing */}
            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <>
                  <button className="p-3 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  <Link
                    to="/profile"
                    className="p-3 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <User className="h-6 w-6" />
                  </Link>
                </>
              )}
              
              <button
                onClick={() => setIsDesktopSidebarOpen(true)}
                className="p-3 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 ml-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile menu button - Improved spacing */}
            <div className="md:hidden flex items-center space-x-3">
              {user && (
                <button className="p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              )}
              
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Improved spacing and padding */}
        {isMobileOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-4 pt-3 pb-4 space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search donors, blood banks, events..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.path) 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
              
              {user ? (
                <>
                  <Link
                    to={`/${user.role}/dashboard`}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(`/${user.role}/dashboard`) 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  
                  <div className="px-4 py-3 border-t border-gray-200 mt-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-1.5 bg-red-100 rounded-full">
                        <User className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 capitalize mt-1 inline-block">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 mt-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 mt-3 pt-3 space-y-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200"
                  >
                    <Heart className="h-5 w-5 mr-2" fill="currentColor" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isDesktopSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isDesktopSidebarOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
          onClick={() => setIsDesktopSidebarOpen(false)}
        ></div>
        
        {/* Sidebar - Improved spacing */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out ${isDesktopSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            {/* Header with close button */}
            <div className="flex justify-between items-center pb-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsDesktopSidebarOpen(false)}
                className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* User info if logged in */}
            {user && (
              <div className="flex items-center space-x-3 py-6 border-b border-gray-200">
                <div className="p-2 bg-red-100 rounded-full">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            )}
            
            {/* Navigation links - Improved spacing */}
            <div className="mt-5 flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsDesktopSidebarOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.path) 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
              
              {user ? (
                <>
                  <Link
                    to={`/${user.role}/dashboard`}
                    onClick={() => setIsDesktopSidebarOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(`/${user.role}/dashboard`) 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/profile"
                    onClick={() => setIsDesktopSidebarOpen(false)}
                    className="flex items-center px-4 py-3.5 rounded-lg text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Profile Settings
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3.5 rounded-lg text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 mt-4"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 mt-4 space-y-3">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsDesktopSidebarOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsDesktopSidebarOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200"
                  >
                    <Heart className="h-5 w-5 mr-2" fill="currentColor" />
                    Register
                  </Link>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="pt-5 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                © {new Date().getFullYear()} RaktSetu. Saving lives together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};