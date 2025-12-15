import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Car as CarIcon, DollarSign, Shield, Banknote, ClipboardCheck, Gavel, Database, TrendingUp, Star, Rotate3D, X, ShieldCheck, Gauge, Zap, Layers, Armchair, FileCheck, Download, Info, Lightbulb, Wind, Droplet, Sparkles, ChevronLeft, ChevronRight as ChevronRightIcon, Loader2, ServerCrash } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import CarCard from '../components/CarCard';
import SEO from '../components/SEO';
import { Car } from '../types';
import { fetchFeaturedVehicles } from '../services/vehicleService';

const Home: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<{title: string, checks: string[]} | null>(null);
  const [showValuationPopup, setShowValuationPopup] = useState(false);
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [apiError, setApiError] = useState(false);
  
  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Fetch Featured Cars using Service
  useEffect(() => {
    const loadFeatured = async () => {
      setLoadingCars(true);
      setApiError(false);
      try {
        const data = await fetchFeaturedVehicles();
        setFeaturedCars(data);
      } catch (err) {
        console.error("Error in Home loadFeatured:", err);
        setApiError(true);
      } finally {
        setLoadingCars(false);
      }
    };
    loadFeatured();
  }, []);

  const totalCars = featuredCars.length;
  // Duplicate data to create seamless infinite loop effect, ONLY if we have more than 1 car
  const extendedCars = totalCars > 1 ? [...featuredCars, ...featuredCars] : featuredCars;

  // Auto Slide Logic
  useEffect(() => {
    if (totalCars <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500); // 3.5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, totalCars]);

  const handleNext = () => {
    if (totalCars <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (totalCars <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
        if (prev === 0) return totalCars - 1; 
        return prev - 1;
    });
  };

  // Handle seamless loop reset
  useEffect(() => {
    if (totalCars <= 1) return;
    if (currentIndex === totalCars) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); 

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalCars]);

  // Cast model-viewer to any to avoid TypeScript errors with custom elements
  const ModelViewer = 'model-viewer' as any;

  // Popup Timer Logic
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowValuationPopup(true);
    }, 2000); // Show after 2 seconds

    const hideTimer = setTimeout(() => {
      setShowValuationPopup(false);
    }, 10000); // Hide after 8 seconds (2s delay + 8s visible)

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Quick Access Service Cards for Hero Section
  const quickLinks = [
    { name: 'Buy Car', icon: <CarIcon size={20} />, link: '/buy', color: 'bg-blue-100 text-blue-700' },
    { name: 'Sell Car', icon: <DollarSign size={20} />, link: '/sell', color: 'bg-green-100 text-green-700' },
    { name: 'Insurance', icon: <Shield size={20} />, link: '/insurance', color: 'bg-purple-100 text-purple-700' },
    { name: 'Car Loan', icon: <Banknote size={20} />, link: '/car-loan', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'PDI Check', icon: <ClipboardCheck size={20} />, link: '/pdi', color: 'bg-orange-100 text-orange-700' },
    { name: 'Marketplace', icon: <Gavel size={20} />, link: '/services', color: 'bg-red-100 text-red-700' },
    { name: 'Dealer IMS', icon: <Database size={20} />, link: '/services', color: 'bg-cyan-100 text-cyan-700' },
  ];

  // Enhanced Inspection Data Structure
  const inspectionCategories = [
    { 
      id: 'engine', 
      category: "Engine & Technical", 
      score: 100,
      icon: <Gauge className="w-5 h-5 text-blue-600" />,
      checks: ["Engine Noise Level", "Oil Leakage Check", "Gear Shift Quality", "Coolant Condition", "Battery Voltage", "Exhaust Smoke"] 
    },
    { 
      id: 'exterior', 
      category: "Exterior & Structure", 
      score: 98,
      icon: <Layers className="w-5 h-5 text-orange-600" />,
      checks: ["Paint Thickness Test", "Frame Integrity", "Rust/Corrosion Check", "Panel Gaps Alignment", "Glass/Mirrors", "Bumper Condition"] 
    },
    { 
      id: 'interior', 
      category: "Interior & Electricals", 
      score: 100,
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
      checks: ["AC Cooling Efficiency", "Touchscreen Response", "Upholstery Condition", "Power Windows", "Instrument Cluster", "Audio System"] 
    },
    { 
      id: 'suspension', 
      category: "Tyres & Suspension", 
      score: 95,
      icon: <CarIcon className="w-5 h-5 text-red-600" />,
      checks: ["Tyre Tread Depth", "Shock Absorber Rebound", "Wheel Alignment", "Brake Pad Life", "Steering Play", "Axle Condition"] 
    },
    { 
      id: 'docs', 
      category: "Documents & History", 
      score: 100,
      icon: <FileCheck className="w-5 h-5 text-green-600" />,
      checks: ["RC Validity Check", "Insurance History", "Service Records Audit", "Chassis Match", "Hypothecation", "Owner Serial No"] 
    },
  ];
  
  const partDetails: Record<string, {title: string, checks: string[]}> = {
    engine: {
      title: "Engine Bay & Mechanics",
      checks: ["Engine Oil Levels Verified", "No Unusual Noise/Vibration", "Coolant Hoses Intact", "Battery Health > 90%", "Transmission Fluid Check"]
    },
    wheel: {
      title: "Tyres & Brakes",
      checks: ["Tyre Tread Depth > 5mm", "Alloy Wheels Scuff-free", "Brake Pad Thickness > 6mm", "ABS Sensor Functioning", "Wheel Balancing OK"]
    },
    interior: {
      title: "Interior Cabin",
      checks: ["Leather Seat Condition", "Dashboard Electronics", "AC Cooling Efficiency", "Infotainment Touch Response", "Sunroof Mechanism"]
    },
    lights: {
      title: "Headlights & Visibility",
      checks: ["LED Intensity Check", "Lens Clarity > 95%", "High/Low Beam Function", "Fog Lamp Alignment", "Indicator Sync"]
    },
    exhaust: {
      title: "Exhaust System",
      checks: ["Emission Standards (BS6)", "Muffler Condition", "No Leaks/Rust", "Catalytic Converter Check", "Sound Decibel Level"]
    },
    body: {
      title: "Paint & Body Shell",
      checks: ["Ceramic Coating Verified", "No Dent/Scratch > 2mm", "Panel Gap Uniformity", "Chassis Structural Integrity", "Original Paint Depth"]
    }
  };

  const handleHotspotClick = (part: string) => {
    setSelectedPart(partDetails[part]);
  };

  const renderCategoryTable = (cat: any) => (
    <div key={cat.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow">
      <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
           <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-slate-700">
             {cat.icon}
           </div>
           <div>
             <h4 className="font-bold text-slate-900 text-lg">{cat.category}</h4>
           </div>
        </div>
        <div className="flex items-center space-x-4">
             <div className="hidden sm:block w-24 bg-gray-200 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${cat.score >= 95 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${cat.score}%` }}></div>
             </div>
             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${cat.score >= 98 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {cat.score >= 98 ? 'Passed' : 'Good'}
             </span>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-600">
        <tbody>
          {cat.checks.map((check: string, idx: number) => (
            <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-3 font-medium text-slate-700 w-2/3">{check}</td>
              <td className="px-6 py-3 text-right">
                 <div className="inline-flex items-center text-green-600">
                   <CheckCircle className="w-4 h-4 mr-1.5" />
                   <span className="text-xs font-semibold">Verified</span>
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const leftColumnCategories = inspectionCategories.slice(0, 3);
  const rightColumnCategories = inspectionCategories.slice(3);

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Trusted Vehicles",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/buy?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="animate-fade-in">
      <SEO 
        title="India's #1 Automotive Platform" 
        description="Buy certified used cars, sell your car for the best price, get instant valuations, insurance, and car loans. India's most trusted automotive ecosystem."
        keywords="buy used cars India, sell cars online, car valuation, car insurance renewal, car loan, vehicle inspection, PDI check"
        canonicalUrl="/"
        schema={websiteSchema}
      />
      {/* Styles for animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes slow-bounce {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-slow-bounce {
          animation: slow-bounce 2s infinite ease-in-out;
        }
        :root {
          --carousel-items: 1;
        }
        @media (min-width: 640px) {
          :root { --carousel-items: 2; }
        }
        @media (min-width: 1024px) {
          :root { --carousel-items: 4; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-12">
        <div className="absolute inset-0 z-0">
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40 z-10" />
           {/* Fixed High Quality Hero Image */}
           <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Car Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pt-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              The Smartest Way to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Buy, Sell & Value</span> Cars
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Join India's most trusted automotive ecosystem. Get instant valuations, 
              certified vehicles, and seamless financing options in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center">
              <Link to="/buy" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition-all text-center shadow-lg shadow-green-900/20 flex items-center justify-center">
                <CarIcon className="mr-2 w-5 h-5" /> Browse Inventory
              </Link>
              
              <div className="relative w-full sm:w-auto">
                <Link to="/sell" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-slate-900 font-bold py-4 px-8 rounded-full transition-all text-center shadow-lg flex items-center justify-center">
                  <DollarSign className="mr-2 w-5 h-5" /> Sell For Best Price
                </Link>

                {/* Valuation Popup */}
                {showValuationPopup && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 sm:mb-4 w-64 bg-white text-slate-900 p-4 rounded-xl shadow-2xl border border-green-200 z-50 animate-slow-bounce">
                     <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white border-b border-r border-green-200 transform rotate-45"></div>
                     <div className="relative z-10 text-center">
                       <div className="flex items-center justify-center mb-1 text-green-600">
                         <Sparkles className="w-4 h-4 mr-1" />
                         <p className="font-bold text-sm uppercase tracking-wide">Get Free Valuation</p>
                       </div>
                       <p className="text-xs text-slate-600 font-medium leading-relaxed">
                         Check your car's price in just <span className="font-bold text-slate-900">4 simple steps</span>!
                       </p>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Service Cards - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 mt-8">
            {quickLinks.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.link}
                className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all rounded-xl p-3 flex flex-col items-center justify-center text-center group cursor-pointer shadow-lg"
              >
                <div className={`p-2.5 rounded-full mb-2 ${item.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white leading-tight">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Inventory Carousel */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Vehicles</h2>
              <p className="mt-2 text-gray-600">Hand-picked best value cars just for you.</p>
            </div>
            
            <div className="flex gap-2">
               <button 
                  onClick={handlePrev}
                  disabled={totalCars <= 1}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
               >
                 <ChevronLeft className="w-5 h-5 text-slate-600" />
               </button>
               <button 
                  onClick={handleNext}
                  disabled={totalCars <= 1}
                  className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
               >
                 <ChevronRightIcon className="w-5 h-5 text-slate-600" />
               </button>
            </div>
          </div>
          
          {loadingCars ? (
            <div className="flex justify-center py-12">
               <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
            </div>
          ) : apiError ? (
            <div className="bg-white rounded-xl p-8 text-center border border-red-100 shadow-sm">
               <ServerCrash className="w-12 h-12 text-red-500 mx-auto mb-3" />
               <h3 className="font-bold text-slate-900 text-lg">Server in Maintenance</h3>
               <p className="text-gray-500 text-sm mt-1">We are unable to load featured cars right now.</p>
               <button 
                 onClick={() => window.location.reload()} 
                 className="mt-4 text-sm text-green-600 hover:underline font-medium"
               >
                 Try Again
               </button>
            </div>
          ) : totalCars > 0 ? (
            /* Carousel Viewport */
            <div className="relative overflow-hidden w-full -mx-4 px-4 py-4">
               {/* The Track */}
              <div 
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{
                  transform: `translateX(calc(-100% / var(--carousel-items) * ${currentIndex}))`
                }}
              >
                 {extendedCars.map((car, idx) => (
                   <div 
                      key={`${car.id}-${idx}`} 
                      className="flex-shrink-0 px-3 md:px-4"
                      style={{ width: `calc(100% / var(--carousel-items))` }}
                   >
                      <CarCard car={car} />
                   </div>
                 ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
               No featured cars available at the moment.
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Link 
              to="/buy" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            >
              Visit Full Marketplace
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Inspection Report Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-4">
                <ShieldCheck className="w-4 h-4 mr-2" /> 200-Point Quality Check
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                We Don't Just Look.<br />
                <span className="text-indigo-600">We Inspect Every Detail.</span>
              </h2>
              <p className="text-lg text-gray-600">
                Every vehicle listed on Trusted Vehicles undergoes a rigorous examination by our certified engineers. 
                Below is a transparent breakdown of the checkpoints for a sample certified vehicle.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column of Tables */}
              <div>
                {leftColumnCategories.map(cat => renderCategoryTable(cat))}
              </div>

              {/* Right Column of Tables + Summary Card */}
              <div className="flex flex-col h-full">
                {rightColumnCategories.map(cat => renderCategoryTable(cat))}

                {/* Overall Summary Card */}
                <div className="bg-slate-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden flex-grow flex flex-col justify-center mt-2">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="text-2xl font-bold">Overall Quality Score</h3>
                           <div className="bg-white/10 p-2 rounded-lg">
                              <Star className="w-6 h-6 text-yellow-400 fill-current" />
                           </div>
                        </div>
                        
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-6xl font-bold text-green-400 tracking-tighter">9.8</span>
                            <span className="text-xl text-gray-400 mb-3 font-medium">/ 10</span>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                           <div className="flex items-center text-gray-300 text-sm">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                              <span>No Major Accidents</span>
                           </div>
                           <div className="flex items-center text-gray-300 text-sm">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                              <span>Original Paint (90%+)</span>
                           </div>
                           <div className="flex items-center text-gray-300 text-sm">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                              <span>Engine & Transmission Healthy</span>
                           </div>
                        </div>

                         <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg transition-colors flex items-center justify-center shadow-lg hover:shadow-green-900/20">
                            <Download className="w-5 h-5 mr-2" /> Download Full PDF Report
                        </button>
                    </div>
                    {/* Decorative Background Icon */}
                     <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                        <ShieldCheck className="w-64 h-64 text-white" />
                     </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* New Interactive 3D Model Section */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative border-t border-slate-900">
         {/* 3D Perspective Grid Background */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[200%] h-[200%] bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] origin-center"></div>
         </div>
         
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-bold mb-4 border border-green-500/20 backdrop-blur-sm">
                    <Rotate3D className="w-4 h-4 mr-2 animate-spin-slow" /> Interactive Examiner
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore Under the Hood</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Click on the glowing hotspots to simulate a real-time diagnostic scan.
                </p>
            </div>
            
            <div className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-b from-slate-900/50 to-black/50 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl backdrop-blur-sm">
                
                {/* Scanner Light Effect */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    <div className="w-full h-[2px] bg-green-400/80 shadow-[0_0_20px_rgba(74,222,128,0.8)] absolute top-0 animate-scan"></div>
                </div>

                <ModelViewer
                    src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/ferrari.glb" 
                    alt="3D Car Model"
                    auto-rotate
                    camera-controls
                    shadow-intensity="1.5"
                    exposure="0.8"
                    camera-orbit="45deg 65deg 4m"
                    style={{ width: '100%', height: '100%' }}
                    className="z-20 relative"
                >
                    {/* Hotspot: Engine (Front Hood for this model) */}
                    <button className="hotspot group cursor-pointer" slot="hotspot-engine" data-position="0 0.8 1.2" data-normal="0 1 0" onClick={() => handleHotspotClick('engine')}>
                        <div className="w-6 h-6 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full relative z-10 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                           <Gauge className="w-3 h-3 text-white" />
                        </div>
                    </button>
                    
                    {/* Hotspot: Wheel (Front Right) */}
                    <button className="hotspot group cursor-pointer" slot="hotspot-wheel" data-position="-0.75 0.35 1.3" data-normal="-1 0 0" onClick={() => handleHotspotClick('wheel')}>
                        <div className="w-6 h-6 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full relative z-10 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </button>

                    {/* Hotspot: Interior */}
                    <button className="hotspot group cursor-pointer" slot="hotspot-interior" data-position="0.4 0.8 0" data-normal="1 0 0" onClick={() => handleHotspotClick('interior')}>
                        <div className="w-6 h-6 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-6 h-6 bg-green-500 rounded-full relative z-10 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                           <Armchair className="w-3 h-3 text-white" />
                        </div>
                    </button>

                     {/* Hotspot: Headlights (Front Right approx) */}
                     <button className="hotspot group cursor-pointer" slot="hotspot-lights" data-position="0.7 0.55 1.6" data-normal="0 0 1" onClick={() => handleHotspotClick('lights')}>
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full relative z-10 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(59,130,246,0.8)]">
                           <Lightbulb className="w-3 h-3 text-white" />
                        </div>
                    </button>

                    {/* Hotspot: Exhaust (Rear approx) */}
                    <button className="hotspot group cursor-pointer" slot="hotspot-exhaust" data-position="0.3 0.3 -1.9" data-normal="0 0 -1" onClick={() => handleHotspotClick('exhaust')}>
                        <div className="w-6 h-6 bg-red-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-6 h-6 bg-red-500 rounded-full relative z-10 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(239,68,68,0.8)]">
                           <Wind className="w-3 h-3 text-white" />
                        </div>
                    </button>

                    {/* Hotspot: Paint/Body (Roof) */}
                    <button className="hotspot group cursor-pointer" slot="hotspot-body" data-position="0 1.05 0" data-normal="0 1 0" onClick={() => handleHotspotClick('body')}>
                        <div className="w-6 h-6 bg-orange-500 rounded-full animate-ping absolute opacity-75"></div>
                        <div className="w-6 h-6 bg-orange-500 rounded-full relative z-10 border-2 border-white flex items-center justify-center transition-transform group-hover:scale-125 shadow-[0_0_15px_rgba(249,115,22,0.8)]">
                           <Droplet className="w-3 h-3 text-white" />
                        </div>
                    </button>

                    <div slot="poster" className="flex items-center justify-center w-full h-full text-white bg-slate-900">
                        <div className="text-center">
                           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                           <p>Loading 3D Model...</p>
                        </div>
                    </div>
                </ModelViewer>

                {/* Floating Info Panel */}
                {selectedPart && (
                    <div className="absolute top-6 right-6 md:top-10 md:right-10 w-full max-w-xs md:max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in z-30">
                        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <Info className="w-5 h-5 text-green-400 mr-2" />
                                    {selectedPart.title}
                                </h3>
                                <p className="text-xs text-green-400 mt-1 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Status: Verified & Passed</p>
                            </div>
                            <button 
                                onClick={() => setSelectedPart(null)} 
                                className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <ul className="space-y-3">
                            {selectedPart.checks.map((check, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-200">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> 
                                    <span>{check}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                            <span>Last checked: 24 hrs ago</span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">100% Score</span>
                        </div>
                    </div>
                )}
                
                {/* Instructions Overlay */}
                {!selectedPart && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/10 pointer-events-none animate-pulse z-30">
                        <p className="text-sm font-medium flex items-center">
                            <Rotate3D className="w-4 h-4 mr-2" /> Drag to rotate • Click hotspots to scan
                        </p>
                    </div>
                )}
            </div>
         </div>
      </section>

      {/* Marketplace Intro Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-4">
                <Gavel className="w-4 h-4 mr-2" /> Live Auctions
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">The Marketplace</h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience the thrill of the bid. Our exclusive marketplace connects verified sellers with premium buyers. 
                Find unique, high-end, and vintage vehicles that you won't see on the regular market.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Real-time bidding system</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Verified history reports for all auction cars</span>
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Secure escrow payment protection</span>
                </li>
              </ul>
              <Link to="/services" className="inline-flex items-center bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-colors shadow-lg">
                Enter Marketplace <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-red-100 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80" 
                alt="Car Auction" 
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dealer IMS Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 skew-x-12 transform origin-top opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="IMS Dashboard Analytics" 
                className="rounded-xl shadow-2xl border border-slate-700"
              />
            </div>
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-900 text-cyan-400 text-sm font-bold mb-4 border border-cyan-800">
                <Database className="w-4 h-4 mr-2" /> Dealer Solutions
              </div>
              <h2 className="text-4xl font-bold mb-6">Advanced Inventory Management System (IMS)</h2>
              <p className="text-gray-400 text-lg mb-8">
                Empower your dealership with data-driven insights. Track stock, analyze market trends, 
                and manage leads from a single, powerful dashboard.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
                  <h4 className="font-bold mb-1">Smart Analytics</h4>
                  <p className="text-sm text-gray-500">Predictive pricing models based on real market data.</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <CheckCircle className="w-8 h-8 text-cyan-400 mb-3" />
                  <h4 className="font-bold mb-1">Auto-Syndication</h4>
                  <p className="text-sm text-gray-500">Publish inventory to multiple portals in one click.</p>
                </div>
              </div>

              <Link to="/services" className="inline-flex items-center bg-cyan-600 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-900/50">
                Request Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

       {/* Testimonials */}
       <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute top-4 right-4 flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-gray-600 italic mb-4 pt-6">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <span className="text-sm text-green-600">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;