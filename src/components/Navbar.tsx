import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import TextType from './ui/TextType';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Detect dashboard routes (starting with /dashboard, /app, or /member)
  const isDashboard = /^\/(dashboard|app|member)/.test(location.pathname);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      return;
    }

    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      navigate('/login');
    }
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Packages', href: '/packages' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className={`w-full fixed top-0 z-50 ${isDashboard ? 'bg-white shadow-sm' : 'bg-white/75 backdrop-blur-sm shadow-lg'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between ${isDashboard ? 'h-16' : 'h-20'}`}>
          {/* Logo - Always visible */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded"
              aria-label="ATL Fitness home"
            >
              <img 
                src="/lovable-uploads/atl-logo.png" 
                alt="ATL Fitness Logo" 
                className="h-16 w-24"
              />
              
            </Link>
            <TextType 
              className='text-lg text-font-primary md:text-2xl font-bold text-gray-700 ml-1 md:ml-1.5'
              text={["ATL FITNESS"]}
              typingSpeed={65}
              pauseDuration={1500}
              showCursor={false}
              cursorCharacter=""
            />
          </div>

          {/* Conditional Content */}
          {isDashboard ? (
            /* Dashboard: Only show Sign Out if authenticated, nothing if not authenticated */
            <div className="flex items-center">
              {isAuthenticated && (
                <Button 
                  onClick={handleSignOut} 
                  variant="outline" 
                  size="sm"
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="Sign out of your account"
                >
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  Sign Out
                </Button>
              )}
            </div>
          ) : (
            /* Home/Other Pages: Show full navigation */
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => {
                  const isActive = item.href === '/' ? location.pathname === '/' : location.pathname === item.href;
                  const isContactAnchor = item.href.includes('#');
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`text-gray-700 hover:text-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1 ${
                        isActive ? 'text-primary underline decoration-2' : ''
                      }`}
                      aria-current={isActive && !isContactAnchor ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  );
                })}
                
                {/* Auth Button */}
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button 
                      variant="outline"
                      className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      aria-label="Go to dashboard"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button 
                      className="bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      aria-label="Sign in to your account"
                    >
                      LOGIN
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 p-2 rounded"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                  {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation Menu - Only show when not on dashboard */}
      {!isDashboard && (
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? location.pathname === '/' : location.pathname === item.href;
              const isContactAnchor = item.href.includes('#');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded ${
                    isActive ? 'text-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive && !isContactAnchor ? 'page' : undefined}
                >
                  {item.name}
                </a>
              );
            })}
            
            {/* Mobile Auth Button */}
            <div className="px-3 py-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                >
                  <Button 
                    variant="outline" 
                    className="w-full focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label="Go to dashboard"
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    aria-label="Sign in to your account"
                  >
                    LOGIN
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
