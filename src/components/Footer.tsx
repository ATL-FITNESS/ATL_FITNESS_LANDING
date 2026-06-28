
import React from 'react';
import { Link } from 'react-router-dom';

const googleMapsUrl = 'https://maps.app.goo.gl/UkS3aUpvKqTmoqAA6?g_st=com.google.maps.preview.copy';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/public/lovable-uploads/1104d1e0-24f1-4ef4-b2dc-e75de2c093e5.png" 
                alt="ATL Fitness Logo" 
                className="h-10 mr-2" 
              />
              <h3 className="font-playfair text-xl font-semibold">ATL Fitness</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Elevate your fitness journey in a premium environment designed for results and well-being.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="text-gray-600 hover:text-primary transition-colors">Memberships</Link></li>
              <li><a href="/#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Monday - Friday: <span className="font-medium">5:00 AM - 11:00 PM</span></li>
              <li>Saturday: <span className="font-medium">6:00 AM - 10:00 PM</span></li>
              <li>Sunday: <span className="font-medium">7:00 AM - 9:00 PM</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <address className="not-italic text-gray-600 space-y-2">
              <p>CMC, Addis Ababa</p>
              <p>Near Yamed Market</p>
              <p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Open in Google Maps
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+251991838485" className="hover:text-primary transition-colors">
                  +251 991 838 485
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+251991868788" className="hover:text-primary transition-colors">
                  +251 991 868 788
                </a>
              </p>
              <p>Email: info@atlfitness.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} ATL Fitness. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm">
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
