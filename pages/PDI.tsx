import React, { useState } from 'react';
import { ClipboardCheck, Calendar, MapPin, Car, User, Phone, FileText, AlertTriangle, CheckCircle, Download, ListChecks, Zap, Eye, Settings, Mail } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const PDI: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    make: '',
    model: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        make: formData.make,
        model: formData.model,
        scheduledDate: formData.date // Mapping date to scheduledDate as per API spec
      };

      const response = await fetch('https://apis.trustedvehicles.com/api/pdi/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast(`PDI Request Submitted! Confirmation email sent to ${formData.email}.`, 'success');
        setFormData({ name: '', email: '', phone: '', city: '', make: '', model: '', date: '' });
      } else {
        showToast('Failed to book PDI. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Network error. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const pdiSpecs = [
    { 
      title: "Exterior Body & Paint", 
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      details: ["Paint thickness verification (to detect repaints)", "Dent & scratch mapping", "Panel gaps & alignment check", "Glass & mirror condition"] 
    },
    { 
      title: "Interior & Features", 
      icon: <Settings className="w-6 h-6 text-purple-500" />,
      details: ["Seat upholstery & stitching quality", "Dashboard fit & finish", "Odometer verification", "Carpets & roof liner condition"] 
    },
    { 
      title: "Electrical Systems", 
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      details: ["All lights (Headlights, Indicators, Cabin)", "AC cooling performance check", "Infotainment & sound system", "Power windows & locks"] 
    },
    { 
      title: "Engine & Mechanical", 
      icon: <Settings className="w-6 h-6 text-red-500" />,
      details: ["Engine bay fluid levels (Oil, Coolant, Brake)", "Battery health & manufacturing date", "Abnormal noise or vibrations", "Exhaust smoke check"] 
    },
    { 
      title: "Tyres & Wheels", 
      icon: <Car className="w-6 h-6 text-slate-500" />,
      details: ["Tyre manufacturing date (DOT check)", "Tread depth measurement", "Alloy wheel scratches/bends", "Spare wheel verification"] 
    },
    { 
      title: "Documentation", 
      icon: <FileText className="w-6 h-6 text-green-500" />,
      details: ["VIN & Chassis number matching", "Invoice & road tax details", "Warranty booklet & owner's manual", "Duplicate key availability"] 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
      <SEO 
        title="Car Pre-Delivery Inspection (PDI) Services" 
        description="Don't buy a new car without a PDI. Our experts check 200+ points including paint thickness, odometer, engine, and electricals to detect hidden issues."
        keywords="PDI check, car inspection service, new car inspection, vehicle PDI, paint depth check, odometer fraud check"
        canonicalUrl="/pdi"
        type="service"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
            <ClipboardCheck className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Pre-Delivery Inspection (PDI)</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't accept your new car blindly. Verify it's genuinely new, defect-free, and road-ready with our expert inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Book Your Inspection</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Showroom Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                    placeholder="e.g. South Delhi, Honda Showroom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Make</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="make"
                      required
                      value={formData.make}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      placeholder="e.g. Tata"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="model"
                      required
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                      placeholder="e.g. Nexon"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all shadow-lg ${
                  loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-orange-600'
                }`}
              >
                {loading ? 'Scheduling...' : 'Confirm Booking'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Our expert will call you to confirm the time and location.
              </p>
            </form>
          </div>

          {/* Info & Report Section */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
              <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" /> Why PDI is Critical?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Spot Repainted Dents</strong>
                    <span className="text-gray-700 text-sm">Transport damage is often fixed cheaply by showrooms. We use digital paint depth gauges to catch this.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Odometer Fraud Check</strong>
                    <span className="text-gray-700 text-sm">Ensure your "new" car wasn't used as a test-drive vehicle for other customers.</span>
                  </div>
                </li>
                 <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Original Parts Verification</strong>
                    <span className="text-gray-700 text-sm">We check manufacturing dates on tyres and batteries to ensure no swapping of old parts.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FileText className="w-40 h-40 text-white" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Get Fully Detailed Report</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        You will receive a comprehensive 15-page digital report covering 200+ checkpoints including engine health, electricals, and cosmetic condition.
                    </p>
                    <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download Sample Report</span>
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
             <div className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-full mb-3">
                <ListChecks className="w-6 h-6 text-slate-700" />
             </div>
             <h2 className="text-3xl font-bold text-slate-900">Comprehensive PDI Specifications</h2>
             <p className="text-gray-600 mt-2">A breakdown of what our experts check to ensure your car is perfect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pdiSpecs.map((spec, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 mr-3">
                    {spec.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">{spec.title}</h4>
                </div>
                <ul className="space-y-3">
                  {spec.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDI;