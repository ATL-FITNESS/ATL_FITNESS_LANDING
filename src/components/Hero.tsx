
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-semibold leading-tight mb-6 animate-fade-in">
          Elevate Your <span className="text-primary">Fitness</span> Journey
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Experience premium facilities, expert coaching, and a supportive community in an elegant, results-driven environment.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/packages">
            <Button size="lg" className="rounded-full px-8 py-6 text-base">
              Join Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base  text-gray-800 hover:bg-white/65">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
