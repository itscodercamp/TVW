import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Loader2, ChevronLeft, ChevronRight, Share2, Heart, 
  MapPin, Gauge, Fuel, Settings, Calendar, ShieldCheck, 
  Phone, AlertTriangle, ExternalLink, ShoppingBag 
} from 'lucide-react';
import { Car } from '../types';
import { fetchVehicleById } from '../services/vehicleService';
import SEO from '../components/SEO';
import { useToast } from '../context/ToastContext';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    const loadCar = async () => {
      setLoading(true);
      setError(false);
      try {
        if (id) {
          const data = await fetchVehicleById(id);
          setCar(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Vehicle Not Found</h2>
        <p className="text-gray-600 mb-6">The vehicle you are looking for may have been sold or removed.</p>
        <Link to="/buy" className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold">Back to Inventory</Link>
      </div>
    );
  }

  const images = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.year} ${car.make} ${car.model}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'success');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      <SEO 
        title={`${car.year} ${car.make} ${car.model}`}
        description={`Buy this ${car.year} ${car.make} ${car.model} for ₹${car.price.toLocaleString('en-IN')}. Certified Used Car with ${car.mileage}km.`}
        image={car.imageUrl}
        type="product"
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/buy" className="hover:text-green-600">Buy Car</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-medium truncate">{car.make} {car.model}</span>
          </div>
        </div>
      </div>

      {/* Marketplace Alert Banner */}
      <div className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-sm sm:text-base">Find more options on our D2C Marketplace!</span>
              </div>
              <a 
                href="https://marketplace.trustedvehicles.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs sm:text-sm font-bold bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full transition-colors"
              >
                Visit Full Marketplace <ExternalLink className="w-3 h-3 ml-1.5" />
              </a>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-8">
             <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-gray-100 group">
                   <img 
                     src={images[activeImage]} 
                     alt={`${car.make} ${car.model}`} 
                     className="w-full h-full object-cover"
                   />
                   
                   {/* Navigation Arrows */}
                   {images.length > 1 && (
                     <>
                        <button 
                            onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                     </>
                   )}

                    <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={handleShare} className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm text-slate-700 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="p-4 flex gap-2 overflow-x-auto">
                        {images.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-green-500 ring-2 ring-green-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
             </div>

             {/* Vehicle Overview */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Vehicle Overview</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm flex items-center"><Calendar className="w-4 h-4 mr-1"/> Year</span>
                        <span className="font-bold text-slate-900">{car.year}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm flex items-center"><Gauge className="w-4 h-4 mr-1"/> Kilometers</span>
                        <span className="font-bold text-slate-900">{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm flex items-center"><Fuel className="w-4 h-4 mr-1"/> Fuel Type</span>
                        <span className="font-bold text-slate-900">{car.fuelType}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-500 text-sm flex items-center"><Settings className="w-4 h-4 mr-1"/> Transmission</span>
                        <span className="font-bold text-slate-900">{car.transmission}</span>
                    </div>
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-gray-100">
                     <h4 className="font-bold text-slate-900 mb-4">Inspection Report</h4>
                     <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                        <ShieldCheck className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Trusted Certified</p>
                            <p className="text-gray-600 text-sm mt-1">This vehicle has passed our rigorous 200-point quality inspection. Engine, transmission, and suspension are in excellent condition.</p>
                        </div>
                     </div>
                 </div>
             </div>
          </div>

          {/* Right Column: Key Info & CTA */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <div className="mb-1">
                    <span className="text-gray-500 text-sm font-medium">{car.make}</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{car.model} {car.variant}</h1>
                
                {car.rtoState && (
                    <div className="flex items-center text-gray-500 text-sm mb-6">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{car.rtoState} Registration</span>
                    </div>
                )}

                <div className="mb-8">
                    <span className="text-3xl font-bold text-green-600">₹{car.price.toLocaleString('en-IN')}</span>
                    <span className="text-gray-400 text-sm ml-2">Fixed Price</span>
                </div>

                <div className="space-y-3">
                    <Link to="/contact" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-center hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                        I'm Interested
                    </Link>
                    <Link to="/car-loan" className="block w-full bg-white border border-slate-200 text-slate-900 font-bold py-4 rounded-xl text-center hover:bg-gray-50 transition-colors">
                        Check Loan Eligibility
                    </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>Need help? Call <strong>+91 84672 73110</strong></span>
                    </div>
                </div>
             </div>

             <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                 <h3 className="font-bold text-lg mb-2">7-Day Money Back Guarantee</h3>
                 <p className="text-blue-100 text-sm mb-4">Love it or return it. No questions asked for the first 7 days.</p>
                 <ShieldCheck className="w-12 h-12 text-white/20 absolute bottom-4 right-4" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;