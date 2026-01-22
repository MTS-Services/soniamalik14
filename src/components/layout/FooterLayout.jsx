import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import Container from './Container';

const FooterLayout = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-white py-12">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Subscribe Our Newsletters
            </h2>
            <form onSubmit={handleSubscribe} className="relative w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="px-6 py-3.5 pr-32 rounded-lg bg-[#E7F1F1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 w-full lg:w-[500px]"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-white rounded-md font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <img 
                src="/footerLogo.png" 
                alt="Essa Hub" 
                className="h-12 mb-4"
              />
              <p className="text-gray-600 max-w-sm leading-relaxed">
                We believe in creating a harmonious balance between beauty, nature, and well-being
              </p>
            </div>

            {/* Collections */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Collections</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-teal-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/teams" className="text-gray-600 hover:text-teal-600 transition">
                    Find Teams
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-600 hover:text-teal-600 transition">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-600 hover:text-teal-600 transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace" className="text-gray-600 hover:text-teal-600 transition">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/confidence-zone" className="text-gray-600 hover:text-teal-600 transition">
                    Confidence Zone
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-teal-600 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-teal-600 transition">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link to="/safeguarding" className="text-gray-600 hover:text-teal-600 transition">
                    Safeguarding
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section - Copyright and Social Media */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600">
                2025 Essa hub
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-teal-600 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default FooterLayout;
