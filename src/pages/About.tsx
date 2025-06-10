
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import { Button } from '@/components/ui/button';

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
              Discover our story, our mission, and what makes ATL Fitness the premium choice for discerning fitness enthusiasts.
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
                Founded in 2015 by fitness industry veterans with a vision to redefine the gym experience, ATL Fitness was created to fill a gap in the market for a truly premium fitness environment that combines luxury with results-driven training.
              </p>
              <p className="text-gray-600 mb-4">
                We began with a small boutique facility in downtown Atlanta, focusing on personalized service and exceptional equipment. The response was overwhelming, and within two years, we expanded to our current 20,000 square foot flagship location.
              </p>
              <p className="text-gray-600">
                Today, ATL Fitness serves a community of dedicated members who value quality, attention to detail, and evidence-based fitness practices in an elegant setting. Our commitment to excellence has established us as the benchmark for premium fitness facilities.
              </p>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-md animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075" 
                alt="Gym interior" 
                className="w-full h-full object-cover"
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
                src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2069" 
                alt="Training session" 
                className="w-full h-full object-cover"
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
              <Button className="rounded-full px-8">Join Now</Button>
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
              Tour our premium 20,000 square foot facility designed with attention to every detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" 
                alt="Strength zone" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070" 
                alt="Cardio zone" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070" 
                alt="Functional training area" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2067" 
                alt="Recovery zone" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973" 
                alt="Studio space" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=2070" 
                alt="Member lounge" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
