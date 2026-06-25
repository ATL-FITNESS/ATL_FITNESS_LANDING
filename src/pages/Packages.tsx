
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import PackagesSection from '@/components/PackagesSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Packages = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnimationObserver />
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4">Membership <span className="text-primary">Packages</span></h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect membership package to match your fitness goals and lifestyle preferences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Packages loaded from Supabase */}
      <PackagesSection showHeader={false} />

      <section className="pb-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center animate-on-scroll">
            <h3 className="text-2xl font-playfair font-semibold mb-4">Custom Corporate Packages</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              We offer customized corporate wellness programs designed to boost employee wellbeing and productivity. Contact us for a tailored solution for your organization.
            </p>
            <Button variant="outline" className="rounded-full px-8">Contact for Corporate Rates</Button>
          </div>
        </div>
      </section>
      
      {/* Additional Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Additional <span className="text-primary">Benefits</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your membership with these premium add-on services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Personal Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">One-on-one coaching with our certified trainers to accelerate your results.</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Nutrition Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Custom meal plans and nutritional guidance from our specialists.</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Recovery Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Massage therapy, cryotherapy, and other recovery modalities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
          </div>
          
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">What's included in the membership fee?</h3>
                <p className="text-gray-600">Each membership tier includes different amenities and services. All memberships include access to the main gym floor, cardio equipment, and locker rooms. Higher tiers add group classes, personal training, recovery services, and more.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Can I freeze my membership?</h3>
                <p className="text-gray-600">Yes, memberships can be frozen for up to 3 months per year with advance notice. A small maintenance fee may apply depending on your membership level.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a joining fee?</h3>
                <p className="text-gray-600">Any applicable registration fee is listed with the current membership packages. Please contact ATL Fitness for promotional offers.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Do you offer discounts for couples or families?</h3>
                <p className="text-gray-600">Yes, we offer household discounts of 10% for additional members living at the same address.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Can I try before I join?</h3>
                <p className="text-gray-600">Absolutely! We offer complimentary day passes for prospective members. Please contact us to schedule your visit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Packages;
