import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import Container from './Container';
import Title from '../ui/Title';

const FooterLayout = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className=" bg-white">
      {/* Newsletter Section */}
      <div className="bg-white py-5 lg:py-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-300 pb-3 lg:pb-12 lg:flex-row">
            <Title>Subscribe Our Newsletters</Title>
            <form onSubmit={handleSubscribe} className="relative w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-secondary w-full rounded px-6 py-2.5 lg:py-4 pr-32 focus:ring-2 focus:ring-btn-primary focus:outline-none lg:w-125"
                required
              />
              <button
                type="submit"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-white px-3 lg:px-6 py-1 lg:py-2 font-medium text-gray-900 transition hover:bg-gray-50 text-sm lg:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <div className="py-2 lg:py-6">
        <Container className={''}>
          <div className="flex lg:flex-row flex-col lg:justify-between gap-5 lg:gap-6 ">
            {/* Brand Section */}
            <div className="mb-3">
              <img src="/footerLogo.png" alt="Essa Hub" className="mb-4 h-10" />
              <p className="max-w-md leading-tight lg:leading-relaxed text-gray-600">
                We believe in creating a harmonious balance between beauty, nature, and well-being
              </p>
            </div>

            {/* Collections */}
            <div className='flex justify-between items-start gap-15'>
              <div className="">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Collections</h3>
                <ul className="lg:space-y-3 space-y-1">
                  <li>
                    <Link to="/" className="text-gray-600 transition hover:text-btn-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/teams" className="text-gray-600 transition hover:text-btn-primary">
                      Find Teams
                    </Link>
                  </li>
                  <li>
                    <Link to="/community" className="text-gray-600 transition hover:text-btn-primary">
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="text-gray-600 transition hover:text-btn-primary">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/marketplace"
                      className="text-gray-600 transition hover:text-btn-primary"
                    >
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/confidence-zone"
                      className="text-gray-600 transition hover:text-btn-primary"
                    >
                      Confidence Zone
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
                <ul className="lg:space-y-3 space-y-1">
                  <li>
                    <Link to="/privacy" className="text-gray-600 transition hover:text-btn-primary">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-600 transition hover:text-btn-primary">
                      Terms of use
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/safeguarding"
                      className="text-gray-600 transition hover:text-btn-primary"
                    >
                      Safeguarding
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright and Social Media */}
          <div className="mt-5 lg:mt-10 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-gray-600">2025 Essa hub</p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-btn-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-btn-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-btn-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-btn-primary"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-teal-600"
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
