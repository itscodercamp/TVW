import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { Search, ExternalLink, X, ShoppingBag, Loader2, AlertTriangle, ServerCrash } from 'lucide-react';
import SEO from '../components/SEO';
import { Car } from '../types';
import { fetchVehicles } from '../services/vehicleService';

const Buy: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false); // State for maintenance mode
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showAd, setShowAd] = useState(false);

  // Fetch Vehicles
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsMaintenance(false);
      try {
        const data = await fetchVehicles();
        setCars(data);
      } catch (err) {
        console.error("Critical error in loadData:", err);
        // Enable maintenance mode on error
        setIsMaintenance(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Logic to show ad after 5 seconds, only once per session
  useEffect(() => {
    const hasSeenAd = localStorage.getItem('hasSeenMarketplaceAd');
    if (!hasSeenAd && !isMaintenance) {
      const timer = setTimeout(() => {
        setShowAd(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMaintenance]);

  const handleCloseAd = () => {
    setShowAd(false);
    localStorage.setItem('hasSeenMarketplaceAd', 'true');
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || car.fuelType === filterType;
    return matchesSearch && matchesFilter;
  });

  // Maintenance Screen Component
  if (isMaintenance) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <SEO 
          title="Maintenance Mode" 
          description="Trusted Vehicles is currently undergoing scheduled maintenance."
        />
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
           <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <ServerCrash className="w-12 h-12 text-red-500" />
           </div>
           <h1 className="text-3xl font-bold text-slate-900 mb-4">Server is in Maintenance</h1>
           <p className="text-gray-600 mb-8 leading-relaxed">
             We are currently upgrading our systems to bring you a better experience. 
             Please check back in sometime.
           </p>
           <button 
             onClick={() => window.location.reload()}
             className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
           >
             Retry Connection
           </button>
        </div>
        <p className="mt-8 text-gray-400 text-sm">Error Code: API_UNREACHABLE</p>
      </div>
    );
  }

  const buySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Used Cars Inventory",
    "description": "Browse our collection of verified and inspected used cars.",
    "itemListElement": filteredCars.map((car, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": `${car.year} ${car.make} ${car.model}`,
        "description": `Certified ${car.year} ${car.make} ${car.model}, ${car.fuelType}, ${car.transmission}.`,
        "offers": {
          "@type": "Offer",
          "price": car.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 relative">
      <SEO 
        title="Buy Certified Used Cars" 
        description="Explore our wide range of 200-point inspected used cars. Get the best deals on second hand petrol, diesel, and electric vehicles in India."
        keywords="buy used cars, certified second hand cars, buy car online, verified used cars India, petrol cars, diesel cars, hybrid cars, electric cars"
        canonicalUrl="/buy"
        type="product"
        schema={buySchema}
      />

      {/* Promotional Ad Modal */}
      {showAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative border-t-4 border-green-600">
            <button 
              onClick={handleCloseAd}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
            >
              <X size={20} />
            </button>
            
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Looking for more?</h3>
              <p className="text-gray-600 mb-6">
                Explore our exclusive <strong>D2C Marketplace</strong> for a wider selection of verified vehicles directly from dealers.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleCloseAd}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
                <a 
                  href="https://marketplace.trustedvehicles.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleCloseAd}
                  className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center"
                >
                  Visit Marketplace <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-3 text-xs text-center text-gray-500 border-t border-gray-100">
              Trusted Vehicles • Direct to Consumer
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Browse Certified Cars</h1>
          <p className="text-gray-600 mb-6">Find your dream car from our verified collection.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            {['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filterType === type
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading inventory...</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && (
          <>
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl text-gray-500">No cars found matching your criteria.</h3>
              </div>
            )}
          </>
        )}

        {/* Marketplace Link Button at Bottom */}
        <div className="mt-16 text-center border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-8">Browse thousands more vehicles on our exclusive Dealer-to-Consumer platform.</p>
            <a 
              href="https://marketplace.trustedvehicles.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5 mr-2 text-green-400" />
              Visit D2C Marketplace
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Buy;