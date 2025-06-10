
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PackageFeature {
  name: string;
  included: boolean;
}

interface PackageProps {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: PackageFeature[];
  popular?: boolean;
}

const PackageCard = ({ name, price, duration, description, features, popular }: PackageProps) => (
  <Card className={`relative rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${popular ? 'border-primary border-2' : ''}`}>
    {popular && (
      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
        MOST POPULAR
      </div>
    )}
    <CardHeader className="text-center pb-2">
      <CardTitle className="text-2xl font-playfair">{name}</CardTitle>
      <CardDescription className="text-gray-500">{description}</CardDescription>
    </CardHeader>
    <CardContent className="text-center pb-6">
      <div className="mb-6">
        <span className="text-4xl font-semibold">{price}</span>
        <span className="text-gray-500 ml-2">/ {duration}</span>
      </div>
      <ul className="space-y-3 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className={`mr-2 mt-0.5 ${feature.included ? 'text-primary' : 'text-gray-400'}`}>
              <Check size={16} />
            </span>
            <span className={`${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>{feature.name}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full rounded-full">Select Package</Button>
    </CardFooter>
  </Card>
);

const Packages = () => {
  const allFeatures = [
    "Access to gym floor equipment",
    "Cardio zone access",
    "Locker room access",
    "Mobile app access",
    "Fitness assessment",
    "Group fitness classes",
    "Personal training sessions",
    "Recovery zone access",
    "Guest passes",
    "Nutrition consultation",
    "Priority class booking",
    "Exclusive events access",
    "VIP locker service",
    "Wellness services"
  ];

  const packages = [
    {
      name: "Basic",
      price: "$79",
      duration: "month",
      description: "Essential access for your fitness journey",
      features: allFeatures.map((feature, index) => ({
        name: feature,
        included: index < 5
      }))
    },
    {
      name: "Premium",
      price: "$129",
      duration: "month",
      description: "Enhanced experience with extra benefits",
      popular: true,
      features: allFeatures.map((feature, index) => ({
        name: feature,
        included: index < 11
      }))
    },
    {
      name: "Elite",
      price: "$199",
      duration: "month",
      description: "Comprehensive luxury fitness experience",
      features: allFeatures.map((feature, index) => ({
        name: feature,
        included: true
      }))
    }
  ];

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
      
      {/* Packages */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
            {packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>
          
          <div className="mt-16 text-center animate-on-scroll">
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
                <p className="font-medium">Starting at $65/session</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Nutrition Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Custom meal plans and nutritional guidance from our specialists.</p>
                <p className="font-medium">Starting at $89/consultation</p>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Recovery Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Massage therapy, cryotherapy, and other recovery modalities.</p>
                <p className="font-medium">Prices vary by service</p>
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
                <p className="text-gray-600">Yes, there is a one-time initiation fee of $99 for Basic, $75 for Premium, and $0 for Elite memberships. We often run promotions that reduce or waive this fee.</p>
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
