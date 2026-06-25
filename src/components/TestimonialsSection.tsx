
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialProps) => (
  <Card className="rounded-2xl shadow-md bg-white hover-scale">
    <CardContent className="pt-6">
      <div className="mb-4">
        <svg className="h-8 w-8 text-primary opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>
      <p className="text-gray-600 mb-6">{quote}</p>
      <div>
        <h4 className="font-medium">{name}</h4>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </CardContent>
  </Card>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "The facilities at ATL Fitness are exceptional, but what truly sets them apart is the attention to detail and personalized service. My fitness journey has transformed since joining.",
      name: "Betelhem Tesfaye",
      role: "Premium Member",
    },
    {
      quote: "As a busy executive, I appreciate the efficient workouts designed by the trainers here. The ambiance provides the perfect balance of motivation and luxury.",
      name: "Nahom Bekele",
      role: "Elite Member",
    },
    {
      quote: "The nutrition guidance alongside personal training has completely changed my approach to fitness. The results speak for themselves - I've never felt better.",
      name: "Hiwot Alemayehu",
      role: "Premium Member",
    }
  ];

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Member <span className="text-primary">Testimonials</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our members have to say about their experience at ATL Fitness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
