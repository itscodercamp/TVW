import React, { useState } from 'react';
import { Shield, CheckCircle, Car, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const Insurance: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    regNumber: '',
    name: '',
    mobile: '',
    policyType: 'comprehensive',
    expiryDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://apis.trustedvehicles.com/api/insurance/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast('Quote request submitted! Our agent will contact you shortly.', 'success');
        setFormData({ regNumber: '', name: '', mobile: '', policyType: 'comprehensive', expiryDate: '' });
      } else {
        showToast('Failed to submit quote request. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Network error. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
      <SEO 
        title="Car Insurance Renewal & Quotes" 
        description="Get the best car insurance quotes in India. Save up to 70% on premiums with comprehensive, third-party, and zero-depreciation plans."
        keywords="car insurance renewal, vehicle insurance online, cheap car insurance, zero dep insurance, car insurance quotes India"
        canonicalUrl="/insurance"
        type="service"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Secure Your Drive</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant quotes from top insurers. Compare plans, save money, and renew in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get Your Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration Number</label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="regNumber"
                    required
                    placeholder="DL 01 AB 1234"
                    value={formData.regNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 uppercase text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
                <select
                  name="policyType"
                  value={formData.policyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900"
                >
                  <option value="comprehensive">Comprehensive Plan</option>
                  <option value="third-party">Third-Party Only</option>
                  <option value="zero-dep">Zero Depreciation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Policy Expiry (Optional)</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all shadow-lg ${
                  loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-purple-700'
                }`}
              >
                {loading ? 'Processing...' : 'View Quotes'}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By clicking submit, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-purple-600" /> Why Insure with Us?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Lowest Premiums Guarantee:</strong> Save up to 70% on car insurance premiums.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Cashless Claims:</strong> Network of 5000+ garages across the country.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Instant Policy:</strong> Digital issuance in less than 5 minutes. No paperwork.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>24/7 Support:</strong> Dedicated claim assistance team available round the clock.</span>
                </li>
              </ul>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold text-slate-900">Michael R.</h4>
                  <p className="text-xs text-gray-500">BMW X5 Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The claims process was incredibly smooth. My car was picked up, repaired, and delivered back within 3 days. Highly recommended!"</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Insurance;