
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PackageProps {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
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
            <span className="mr-2 text-primary mt-0.5">
              <Check size={16} />
            </span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full rounded-full">Select Package</Button>
    </CardFooter>
  </Card>
);

const PackagesSection = () => {
  const packages = [
    {
      name: "Basic",
      price: "$79",
      duration: "month",
      description: "Essential access for your fitness journey",
      features: [
        "Access to gym floor equipment",
        "Cardio zone access",
        "Locker room access",
        "Mobile app access",
        "Fitness assessment"
      ]
    },
    {
      name: "Premium",
      price: "$129",
      duration: "month",
      description: "Enhanced experience with extra benefits",
      features: [
        "All Basic features",
        "Group fitness classes",
        "1 personal training session/month",
        "Recovery zone access",
        "Guest passes (2/month)",
        "Nutrition consultation"
      ],
      popular: true
    },
    {
      name: "Elite",
      price: "$199",
      duration: "month",
      description: "Comprehensive luxury fitness experience",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Priority class booking",
        "Exclusive events access",
        "Nutritional planning",
        "Wellness services",
        "VIP locker service"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="packages">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Membership <span className="text-primary">Packages</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect membership package to match your fitness goals and lifestyle preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
