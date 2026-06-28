
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="about">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">About <span className="text-primary">ATL Fitness</span></h2>
            <p className="text-gray-600 mb-6">
              ATL Fitness is a new, modern gym built for people who want a clean, motivating, and fully equipped place to train. Our multi-floor facility brings together high-end strength machines, cardio equipment, functional training areas, and wellness amenities in one energetic fitness environment.
            </p>
            <p className="text-gray-600 mb-6">
              Whether your goal is to build muscle, improve endurance, lose weight, recover, or simply stay consistent, ATL Fitness is ready to support your health and fitness journey with personal training, nutrition guidance, group classes, aerobics, boxing, Tae-Bo, circuit training, sauna, and steam services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">Modern Facility</span>
                <span className="text-sm text-gray-500">A fresh multi-floor gym designed for focused training</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">High-End Equipment</span>
                <span className="text-sm text-gray-500">Strength, cardio, and functional training zones</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">Wellness Services</span>
                <span className="text-sm text-gray-500">Training, classes, nutrition, sauna, and steam</span>
              </div>
            </div>
            <Link to="/about">
              <Button className="rounded-full px-8">Learn More</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-on-scroll">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/about-strength-floor.png" 
                alt="ATL Fitness strength training floor" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md mt-8">
              <img 
                src="/lovable-uploads/about-cycle-studio.png" 
                alt="ATL Fitness cycling studio" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/about-free-weights.png" 
                alt="ATL Fitness free weights area" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md mt-8">
              <img 
                src="/lovable-uploads/about-training-floor.png" 
                alt="ATL Fitness training floor" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
