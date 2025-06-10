
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnimationObserver />
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4">Get in <span className="text-primary">Touch</span></h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or ready to start your fitness journey? Our team is here to help.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default Contact;
