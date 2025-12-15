import React, { useState } from 'react';
import { Car } from '../types';
import { Fuel, Gauge, Settings, ChevronLeft, ChevronRight, Heart, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const CarCard: React.FC<{ car: Car }> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { showToast } = useToast();
  
  // Use imageUrls if available, otherwise fallback to single imageUrl
  const images = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];
  const minSwipeDistance = 50;

  // Price Category Logic
  const getPriceCategory = (price: number) => {
    if (price > 1000000) return { 
      label: 'Premium Car', 
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      cardBorder: 'border-purple-500 shadow-purple-100'
    };
    if (price > 400000) return { 
      label: 'Mid Range Car', 
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      cardBorder: 'border-blue-500 shadow-blue-100'
    };
    return { 
      label: 'Low Budget Car', 
      badgeColor: 'bg-green-100 text-green-700 border-green-200',
      cardBorder: 'border-green-500 shadow-green-100'
    };
  };

  const category = getPriceCategory(car.price);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      showToast(`${car.make} ${car.model} added to favorites`, 'success');
    } else {
      showToast('Removed from favorites', 'info');
    }
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-md border-2 ${category.cardBorder} hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full w-full select-none`}>
      {/* Image Container - Responsive Aspect Ratio */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-gray-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img 
          src={images[currentImageIndex]} 
          alt={`${car.year} ${car.make} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
          loading="lazy"
        />
        
        {/* Gradient Overlay for bottom visibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-0" />

        {/* Price Category Badge */}
        <div className={`absolute top-3 left-3 ${category.badgeColor} text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-md z-10 shadow-sm uppercase tracking-wide border flex items-center`}>
          <Tag className="w-3 h-3 mr-1.5" />
          {category.label}
        </div>

        {/* Carousel Navigation */}
        {images.length > 1 && (
          <>
            {/* Arrows: Large touch targets on mobile, visible by default on mobile, fade in on desktop hover */}
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 active:bg-black/80 text-white p-3 sm:p-2 rounded-full backdrop-blur-sm transition-all z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform active:scale-95 touch-manipulation"
              aria-label="Previous Image"
            >
              <ChevronLeft size={20} className="sm:w-5 sm:h-5 w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 active:bg-black/80 text-white p-3 sm:p-2 rounded-full backdrop-blur-sm transition-all z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform active:scale-95 touch-manipulation"
              aria-label="Next Image"
            >
              <ChevronRight size={20} className="sm:w-5 sm:h-5 w-4 h-4" />
            </button>
            
            {/* Dots Indicator: Larger touch area for dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 rounded-full items-center">
              {images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => goToImage(e, idx)}
                  className={`rounded-full transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    idx === currentImageIndex 
                      ? 'bg-white w-2.5 h-2.5 sm:w-2 sm:h-2 scale-110' 
                      : 'bg-white/50 w-2 h-2 sm:w-1.5 sm:h-1.5 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                  style={{ touchAction: 'manipulation' }} // Optimizes touch handling
                />
              ))}
            </div>
          </>
        )}

        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white active:bg-gray-100 p-2.5 sm:p-2 rounded-full shadow-sm z-10 transition-transform active:scale-90 touch-manipulation"
          aria-label="Toggle Favorite"
        >
          <Heart 
            size={20} 
            className={`transition-colors sm:w-[18px] sm:h-[18px] w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} 
          />
        </button>
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1 leading-snug">{car.year} {car.make} {car.model}</h3>
          <span className="text-lg sm:text-xl font-bold text-green-600 whitespace-nowrap">₹{car.price.toLocaleString('en-IN')}</span>
        </div>
        
        {/* Responsive Grid for Car Details */}
        <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-gray-500 mb-5 border-t border-b border-gray-100 py-3 mt-auto divide-x divide-gray-100">
          <div className="flex flex-col items-center justify-center text-center px-1">
            <Gauge className="w-4 h-4 sm:w-5 sm:h-5 mb-1.5 text-slate-400" />
            <span className="line-clamp-1">{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-1">
            <Fuel className="w-4 h-4 sm:w-5 sm:h-5 mb-1.5 text-slate-400" />
            <span className="line-clamp-1">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-1">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 mb-1.5 text-slate-400" />
            <span className="line-clamp-1">{car.transmission}</span>
          </div>
        </div>

        <Link 
          to={`/buy/${car.id}`}
          className="block w-full text-center bg-slate-900 text-white py-3.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 active:transform active:scale-[0.98] touch-manipulation"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;