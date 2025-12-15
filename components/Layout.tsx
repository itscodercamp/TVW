import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('Locating...');
  const location = useLocation();

  // Point to the local logo file. 
  // User should place 'logo.png' in the public/ folder.
  // Fallback to a blue TV avatar if image fails to load.
  const LOGO_SRC = "/logo.png";
  const LOGO_FALLBACK = "https://ui-avatars.com/api/?name=TV&background=transparent&color=3b82f6&size=128&bold=true&font-size=0.5";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = LOGO_FALLBACK;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy Car', path: '/buy' },
    { name: 'Sell Car', path: '/sell' },
    { name: 'Services', path: '/services' },
    { name: 'Book PDI', path: '/pdi' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding to get City/State
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.address;
            
            // Prioritize City > Town > Village > County, then State
            const city = address.city || address.town || address.village || address.county;
            const state = address.state;

            if (city && state) {
              setUserLocation(`${city}, ${state}`);
            } else if (state) {
              setUserLocation(state);
            } else {
              setUserLocation('Location Verified');
            }
          } catch (error) {
            console.error('Error fetching location name:', error);
            setUserLocation('Location Detected');
          }
        },
        (error) => {
          console.warn('Geolocation error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setUserLocation('Location Denied');
          } else {
            setUserLocation('Location Unavailable');
          }
        }
      );
    } else {
      setUserLocation('Not Supported');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={LOGO_SRC}
                onError={handleImageError}
                alt="Trusted Vehicles Logo" 
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-none mb-0.5 text-white">Trusted Vehicles</span>
                <span className="text-[10px] text-green-400 font-medium tracking-wide uppercase">Buy • Sell • Insure</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-green-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Location Indicator (Desktop) */}
              <div className="flex items-center text-gray-400 text-xs border border-slate-700 rounded-full px-3 py-1 bg-slate-800">
                <MapPin className="h-3 w-3 mr-1 text-green-500" />
                <span>{userLocation}</span>
              </div>

              <Link
                to="/contact"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Location Indicator (Mobile) */}
              <div className="px-3 py-2 text-gray-400 flex items-center text-sm border-b border-slate-700 mb-2">
                 <MapPin className="h-4 w-4 mr-2 text-green-500" />
                 <span>{userLocation}</span>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-slate-900 text-green-500'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700 mt-4"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={LOGO_SRC} 
                onError={handleImageError}
                alt="Trusted Vehicles Logo" 
                className="h-10 w-auto object-contain" 
              />
              <span className="font-bold text-lg text-white">Trusted Vehicles</span>
            </div>
            <p className="text-sm text-gray-400">
              Your one-stop destination for all automobile needs. Buying, selling, insurance, and loans made easy and trusted.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buy" className="hover:text-green-400">Buy a Car</Link></li>
              <li><Link to="/sell" className="hover:text-green-400">Sell Your Car</Link></li>
              <li><Link to="/services" className="hover:text-green-400">Our Services</Link></li>
              <li><Link to="/services" className="hover:text-green-400">Dealer IMS</Link></li>
              <li><Link to="/careers" className="hover:text-green-400 flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span> Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-green-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-green-400">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-green-400">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Nagpur, Maharashtra, India</li>
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +91 84672 73110</li>
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> support@trustedvehicles.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Trusted Vehicles. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;