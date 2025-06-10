
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import PackagesSection from '@/components/PackagesSection';
import TeamSection from '@/components/TeamSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnimationObserver />
      <Navbar />
      <Hero />
      <AboutSection />
      <PackagesSection />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
