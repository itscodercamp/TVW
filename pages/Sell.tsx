import React, { useState } from 'react';
import { 
  Car, MapPin, Calendar, User, FileText, ChevronRight, 
  ChevronLeft, CheckCircle, Gauge, Fuel, Settings, UserCheck, PlusCircle, Locate
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const Sell: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Form State
  const initialFormData = {
    // Step 1: Basic Details
    make: '',
    model: '',
    variant: '',
    regNumber: '',
    regYear: '',
    // Step 2: Specs & Location
    fuelType: 'Petrol',
    ownership: '1st',
    transmission: 'Manual',
    state: '',
    city: '',
    // Step 3: Condition & Address
    kmDriven: '',
    address: '',
    // Step 4: User & Schedule
    name: '',
    phone: '',
    scheduledDate: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using OpenStreetMap Nominatim for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
             const address = data.display_name;
             // Extract city and state if available to update previous steps if needed
             const city = data.address.city || data.address.town || data.address.village || '';
             const state = data.address.state || '';
             
             setFormData(prev => ({
                 ...prev,
                 address: address,
                 // Also update city/state if they are empty or to ensure accuracy
                 city: prev.city || city,
                 state: prev.state || state
             }));
             showToast('Location fetched successfully', 'success');
          } else {
             showToast('Could not fetch address details', 'error');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          showToast('Failed to fetch address from coordinates', 'error');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let msg = 'Unable to retrieve your location';
        if (error.code === error.PERMISSION_DENIED) {
            msg = 'Location permission denied. Please enable location services.';
        }
        showToast(msg, 'error');
        setLocationLoading(false);
      }
    );
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.make.trim() || !formData.model.trim() || !formData.variant.trim() || !formData.regNumber.trim() || !formData.regYear) {
          showToast('Please fill in all vehicle details.', 'error');
          return false;
        }
        return true;
      case 2:
        if (!formData.state.trim() || !formData.city.trim()) {
          showToast('Please provide your location details (State & City).', 'error');
          return false;
        }
        return true;
      case 3:
        if (!formData.kmDriven || !formData.address.trim()) {
          showToast('Please provide kilometers driven and inspection address.', 'error');
          return false;
        }
        return true;
      case 4:
        if (!formData.name.trim() || !formData.phone.trim() || !formData.scheduledDate) {
           showToast('Please provide all contact details.', 'error');
           return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
           showToast('Please enter a valid 10-digit phone number.', 'error');
           return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://apis.trustedvehicles.com/api/sell-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        showToast('Sell Request Submitted Successfully!', 'success');
        window.scrollTo(0, 0);
      } else {
        showToast('Failed to submit request. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Network error. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitted(false);
    window.scrollTo(0, 0);
  };

  // Helper to render steps
  const renderStepIndicator = () => {
    const steps = [
      { num: 1, title: 'Car Details' },
      { num: 2, title: 'Specs & City' },
      { num: 3, title: 'Condition' },
      { num: 4, title: 'Schedule' }
    ];

    return (
      <div className="flex items-center justify-between mb-8 px-2 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
        
        {steps.map((step) => (
          <div key={step.num} className="flex flex-col items-center z-10">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 ${
                currentStep >= step.num 
                  ? 'bg-green-500 border-green-200 text-white scale-110' 
                  : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {currentStep > step.num ? <CheckCircle className="w-6 h-6" /> : step.num}
            </div>
            <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${currentStep >= step.num ? 'text-green-600' : 'text-gray-400'} hidden sm:block`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center animate-fade-in">
        <div className="max-w-xl w-full px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you, <strong>{formData.name}</strong>. Your request to sell your <strong>{formData.make} {formData.model}</strong> has been submitted. Our inspection expert will call you shortly on <strong>{formData.phone}</strong>.
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleReset}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Submit Another Car
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 text-slate-700 font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
      <SEO 
        title="Sell Your Car Online - Instant Valuation" 
        description="Sell your car at the best price with Trusted Vehicles. Get an instant valuation, free doorstep inspection, and instant payment."
        keywords="sell car online, sell used car, car valuation, best price for car, sell car Nagpur, sell car India"
        canonicalUrl="/sell"
        type="service"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Sell Your Car</h1>
          <p className="text-gray-600">Get the best price in 4 simple steps.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
          {renderStepIndicator()}

          <form onSubmit={handleNext} className="space-y-6 relative">
            
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div key="step1" className="animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center mb-6">
                  <Car className="w-5 h-5 mr-2 text-green-600" /> Basic Vehicle Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Make</label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900 transition-colors"
                      placeholder="e.g. Maruti Suzuki"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900 transition-colors"
                      placeholder="e.g. Swift"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
                  <input
                    type="text"
                    name="variant"
                    value={formData.variant}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900 transition-colors"
                    placeholder="e.g. VXI / ZXI+"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                    <input
                      type="text"
                      name="regNumber"
                      value={formData.regNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900 uppercase transition-colors"
                      placeholder="MH 31 AB 1234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Year</label>
                    <input
                      type="number"
                      name="regYear"
                      min="2000"
                      max={new Date().getFullYear()}
                      value={formData.regYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900 transition-colors"
                      placeholder="e.g. 2018"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Specs & City */}
            {currentStep === 2 && (
              <div key="step2" className="animate-fade-in space-y-6">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center mb-6">
                  <Settings className="w-5 h-5 mr-2 text-green-600" /> Specifications & Location
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Fuel className="w-4 h-4 mr-1"/> Fuel Type</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="EV">EV</option>
                      <option value="Petrol + EV">Petrol + EV (Hybrid)</option>
                      <option value="Petrol + CNG">Petrol + CNG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><UserCheck className="w-4 h-4 mr-1"/> Ownership</label>
                    <select
                      name="ownership"
                      value={formData.ownership}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                    >
                      <option value="1st">1st Owner</option>
                      <option value="2nd">2nd Owner</option>
                      <option value="3rd">3rd Owner</option>
                      <option value="4th+">4th+ Owner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Settings className="w-4 h-4 mr-1"/> Transmission</label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                      placeholder="e.g. Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                      placeholder="e.g. Nagpur"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Condition & Address */}
            {currentStep === 3 && (
              <div key="step3" className="animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center mb-6">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" /> Condition & Address
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Gauge className="w-4 h-4 mr-1"/> Kilometers Driven</label>
                  <input
                    type="number"
                    name="kmDriven"
                    value={formData.kmDriven}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                    placeholder="e.g. 45000"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-sm font-medium text-gray-700">Pickup / Inspection Address</label>
                    <button 
                        type="button" 
                        onClick={handleGetLocation}
                        disabled={locationLoading}
                        className="text-xs text-green-600 font-bold hover:text-green-700 flex items-center transition-colors disabled:opacity-50"
                    >
                        {locationLoading ? (
                            <>Loading...</>
                        ) : (
                            <><Locate className="w-3 h-3 mr-1" /> Get Current Location</>
                        )}
                    </button>
                  </div>
                  <textarea
                    name="address"
                    rows={4}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                    placeholder="Enter full address where the car is available for inspection..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: User & Schedule */}
            {currentStep === 4 && (
              <div key="step4" className="animate-fade-in space-y-6">
                 <h2 className="text-xl font-bold text-slate-900 flex items-center mb-6">
                  <User className="w-5 h-5 mr-2 text-green-600" /> Contact & Schedule
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                      placeholder="Your Name"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><Calendar className="w-4 h-4 mr-1"/> Preferred Inspection Date</label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-slate-900"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                       * Our field executive will call you to confirm the exact time slot.
                    </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
              {currentStep > 1 ? (
                 <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-slate-700 font-bold hover:bg-gray-50 transition-colors flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg text-white font-bold transition-all shadow-lg flex items-center transform active:scale-95 ${
                  loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-green-600'
                }`}
              >
                {loading ? 'Submitting...' : currentStep === 4 ? 'Submit Request' : 'Next Step'}
                {!loading && currentStep !== 4 && <ChevronRight className="w-5 h-5 ml-1" />}
              </button>
            </div>
          </form>
        </div>
        
        {/* Safety Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
           <p className="flex items-center justify-center gap-2">
             <FileText className="w-4 h-4" /> 
             Your data is secure and will only be used for vehicle inspection purposes.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Sell;