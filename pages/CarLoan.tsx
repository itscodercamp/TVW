import React, { useState } from 'react';
import { Banknote, CheckCircle, Calculator, Percent } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const CarLoan: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    income: '',
    loanAmount: '',
    employment: 'salaried'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        employmentType: formData.employment // Mapping employment to employmentType as per API spec
      };

      const response = await fetch('https://apis.trustedvehicles.com/api/loan/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast('Application submitted! Our financial advisor will call you.', 'success');
        setFormData({ name: '', mobile: '', income: '', loanAmount: '', employment: 'salaried' });
      } else {
        showToast('Failed to submit application. Please try again.', 'error');
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
        title="Car Finance & Loans - Low Interest Rates" 
        description="Apply for car loans with interest rates starting at 8.99%. 100% on-road funding, fast approval, and minimal documentation."
        keywords="car loan, vehicle finance, used car loan, low interest car loan, auto finance India, quick car loan"
        canonicalUrl="/car-loan"
        type="service"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4">
            <Banknote className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Drive Your Dream Car Today</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Low interest rates, minimal documentation, and instant pre-approval.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Info Section */}
          <div className="space-y-8 order-2 lg:order-1">
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Percent className="w-5 h-5 mr-2 text-yellow-600" /> Loan Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-bold text-slate-900 mb-1">8.99%*</h4>
                    <p className="text-sm text-gray-600">Starting Interest Rate</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-bold text-slate-900 mb-1">100%</h4>
                    <p className="text-sm text-gray-600">On-Road Funding</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-bold text-slate-900 mb-1">7 Years</h4>
                    <p className="text-sm text-gray-600">Flexible Tenure</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-bold text-slate-900 mb-1">0%</h4>
                    <p className="text-sm text-gray-600">Foreclosure Charges*</p>
                  </div>
                </div>
             </div>

             <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-white">
               <h3 className="text-xl font-bold mb-4 flex items-center">
                 <Calculator className="w-5 h-5 mr-2" /> Simple EMI Example
               </h3>
               <p className="text-gray-400 mb-6">For a loan of ₹5,00,000 at 9% interest for 5 years:</p>
               <div className="flex justify-between items-end border-b border-gray-700 pb-4 mb-4">
                 <span className="text-gray-300">Monthly EMI</span>
                 <span className="text-3xl font-bold text-green-400">₹10,379</span>
               </div>
               <p className="text-xs text-gray-500">*Figures are indicative. Final rates depend on credit profile.</p>
             </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Check Eligibility</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`cursor-pointer text-center py-3 rounded-lg border transition-all ${formData.employment === 'salaried' ? 'bg-yellow-50 border-yellow-500 text-yellow-700 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    <input type="radio" name="employment" value="salaried" className="hidden" checked={formData.employment === 'salaried'} onChange={handleChange} />
                    Salaried
                  </label>
                  <label className={`cursor-pointer text-center py-3 rounded-lg border transition-all ${formData.employment === 'self' ? 'bg-yellow-50 border-yellow-500 text-yellow-700 font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    <input type="radio" name="employment" value="self" className="hidden" checked={formData.employment === 'self'} onChange={handleChange} />
                    Self Employed
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Net Monthly Income (₹)</label>
                <input
                  type="number"
                  name="income"
                  required
                  placeholder="e.g. 50000"
                  value={formData.income}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount Required (₹)</label>
                <input
                  type="number"
                  name="loanAmount"
                  required
                  placeholder="e.g. 800000"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all shadow-lg ${
                  loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-yellow-600'
                }`}
              >
                {loading ? 'Processing...' : 'Apply Now'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarLoan;