
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';

const facilityImages = [
  {
    src: '/lovable-uploads/gym-main-floor.jpg',
    alt: 'ATL Fitness main strength floor',
  },
  {
    src: '/lovable-uploads/gym-cardio-row.jpg',
    alt: 'ATL Fitness cardio treadmills',
  },
  {
    src: '/lovable-uploads/gym-free-weights-wall.jpg',
    alt: 'ATL Fitness free weights area',
  },
  {
    src: '/lovable-uploads/gym-dumbbell-zone.jpg',
    alt: 'ATL Fitness dumbbell zone',
  },
  {
    src: '/lovable-uploads/gym-training-floor-wide.jpg',
    alt: 'ATL Fitness open training floor',
  },
  {
    src: '/lovable-uploads/gym-brand-screen.jpg',
    alt: 'ATL Fitness branded training area',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnimationObserver />
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4">About <span className="text-primary">ATL Fitness</span></h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A modern fitness space built with care, quality equipment, and a simple goal: helping people train with confidence.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                ATL Fitness was created with a humble purpose: to give our community a clean, modern, and welcoming place to work on their health. We know every fitness journey starts differently, so we built a space where beginners, regular members, and serious lifters can all feel comfortable showing up.
              </p>
              <p className="text-gray-600 mb-4">
                Our gym brings together high-end equipment, thoughtful training areas, and wellness amenities that support both hard work and recovery. From strength training and cardio to group classes, boxing, sauna, and steam, the experience is designed to make consistency easier.
              </p>
              <p className="text-gray-600">
                We are still growing, listening, and improving. What matters most to us is serving people well, keeping the environment motivating, and helping each member move closer to their health and fitness goals.
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-md animate-on-scroll">
              <img 
                src="/lovable-uploads/gym-training-floor-wide.jpg" 
                alt="ATL Fitness training floor" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-md animate-on-scroll">
              <img 
                src="/lovable-uploads/gym-dumbbell-zone.jpg" 
                alt="ATL Fitness dumbbell and strength area" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            
            <div className="order-1 lg:order-2 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At ATL Fitness, our mission is to provide an exceptional fitness experience that seamlessly blends luxury amenities with effective training methodologies. We believe that when you elevate the environment, you elevate the results.
              </p>
              <p className="text-gray-600 mb-4">
                We are committed to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                <li>Creating a sophisticated space where members feel inspired and motivated</li>
                <li>Providing expert guidance from highly qualified fitness professionals</li>
                <li>Offering state-of-the-art equipment that delivers optimal results</li>
                <li>Fostering a community of like-minded individuals who value health and wellness</li>
                <li>Continuously evolving our offerings to reflect the latest advancements in fitness science</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Facility */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Our <span className="text-primary">Facility</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at the real training spaces, equipment zones, and gym details our members use every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {facilityImages.map((image) => (
              <div key={image.src} className="aspect-video rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
