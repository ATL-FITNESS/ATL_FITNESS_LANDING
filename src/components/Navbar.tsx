
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import TextType from './ui/TextType';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className="fixed w-full z-30 bg-gray-200/90 backdrop-blur-3xl shadow-sm transition-all duration-300"
    >
      <div className="container mx-auto py-2 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/public/lovable-uploads/1104d1e0-24f1-4ef4-b2dc-e75de2c093e5.png" 
                alt="ATL Fitness Logo" 
                className="h-12 w-14 md:h-24 md:w-28" 
              />
              <span className="sr-only">ATL Fitness</span>
            </Link>
            <TextType 
              className='text-lg md:text-4xl font-bold text-gray-700 ml-1 md:ml-1.5'
              text={["ATL GYM & FITNESS CENTER"]}
              typingSpeed={65}
              pauseDuration={1500}
              showCursor={false}
              cursorCharacter=""
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-balance font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-balance font-medium hover:text-primary transition-colors">About</Link>
            <Link to="/packages" className="text-balance font-medium hover:text-primary transition-colors">Packages</Link>
            <Link to="/team" className="text-balance font-medium hover:text-primary transition-colors">Team</Link>
            <Link to="/contact" className="text-balance font-medium hover:text-primary transition-colors">Contact</Link>
            <Link to="/login">
              <Button variant="outline" className="ml-4 hover:bg-primary hover:text-white hover:border-primary/80">
                LOGIN
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/packages" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Packages</Link>
              <Link to="/team" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Team</Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full  hover:bg-primary hover:text-white hover:border-primary/80">
                  LOGIN
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
