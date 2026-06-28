
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const googleMapsUrl = 'https://maps.app.goo.gl/UkS3aUpvKqTmoqAA6?g_st=com.google.maps.preview.copy';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Form submitted! This would connect to your backend in production.');
  };

  return (
    <section className="py-20 bg-gray-50 scroll-mt-24" id="contact">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">Get in <span className="text-primary">Touch</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to start your fitness journey? Contact our team for personalized assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-on-scroll">
          <Card className="shadow-md rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <iframe 
                src="https://www.google.com/maps?q=2VG3%2BC62%20Yamed%20Market%20%7C%20Bakery%20%26%20Pastry%20%7C%20CMC%2C%20Addis%20Ababa&output=embed" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Gym Location"
              ></iframe>
              
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-primary mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <address className="not-italic text-gray-600">
                        CMC, Addis Ababa<br />
                        Near Yamed Market
                      </address>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-primary mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <div className="space-y-1 text-gray-600">
                        <p>
                          <a href="tel:+251991838485" className="hover:text-primary transition-colors">
                            +251 991 838 485
                          </a>
                        </p>
                        <p>
                          <a href="tel:+251991868788" className="hover:text-primary transition-colors">
                            +251 991 868 788
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-primary mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">info@atlfitness.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-primary mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-medium">Hours</h4>
                      <p className="text-gray-600">Mon-Fri: 5:00 AM - 11:00 PM</p>
                      <p className="text-gray-600">Sat: 6:00 AM - 10:00 PM</p>
                      <p className="text-gray-600">Sun: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <Card className="shadow-md rounded-2xl">
              <CardContent className="pt-6">
                <h3 className="text-xl font-playfair font-semibold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Message subject" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      className="min-h-[120px]"
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full rounded-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
