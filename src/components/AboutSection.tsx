
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
              Founded in 2015, ATL Fitness has established itself as the premium destination for those who expect excellence in their fitness journey. We believe that a sophisticated environment, cutting-edge equipment, and expert guidance create the perfect formula for achieving exceptional results.
            </p>
            <p className="text-gray-600 mb-6">
              Our facility spans over 20,000 square feet of thoughtfully designed space, featuring distinct zones for strength training, cardiovascular exercise, functional movement, and recovery. Each area is equipped with state-of-the-art machines and tools selected for both effectiveness and aesthetic appeal.
            </p>
            <div className="flex space-x-4 mb-8">
              <div className="flex flex-col">
                <span className="text-4xl font-semibold text-primary">8+</span>
                <span className="text-sm text-gray-500">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold text-primary">20k</span>
                <span className="text-sm text-gray-500">Square Feet</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-semibold text-primary">12</span>
                <span className="text-sm text-gray-500">Expert Trainers</span>
              </div>
            </div>
            <Link to="/about">
              <Button className="rounded-full px-8">Learn More</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-on-scroll">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" 
                alt="Modern gym equipment" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md mt-8">
              <img 
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070" 
                alt="Personal training session" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2069" 
                alt="Yoga class" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md mt-8">
              <img 
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069" 
                alt="Gym interior" 
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
