import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Globe, Users, FileText, Monitor, 
  Gavel, Zap, Search, ShieldCheck, AlertTriangle, 
  Wrench, Car, Banknote, Shield, CheckCircle, ArrowRight,
  BarChart3, Layers, X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const Services: React.FC = () => {
  const { showToast } = useToast();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: '',
    phone: '',
    email: '',
    dealershipName: ''
  });

  const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDemoForm({ ...demoForm, [e.target.name]: e.target.value });
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://apis.trustedvehicles.com/api/dealer/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demoForm),
      });

      if (response.ok) {
        setIsDemoModalOpen(false);
        showToast('Demo request sent! Our team will contact you shortly.', 'success');
        setDemoForm({ name: '', phone: '', email: '', dealershipName: '' });
      } else {
        showToast('Failed to send demo request. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Network error. Please try again later.', 'error');
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Trusted Vehicles Dealer IMS",
    "serviceType": "Automotive Software",
    "description": "Advanced Inventory Management System (IMS) for used car dealerships, including stock tracking, website generation, and marketplace syndication.",
    "provider": {
        "@type": "Organization",
        "name": "Trusted Vehicles"
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <SEO 
        title="Dealer IMS & Automotive Marketplace Services" 
        description="India's leading Dealer Inventory Management System (IMS). Manage stock, syndicate to marketplace, and access dealer financing. Book a free demo today."
        keywords="Dealer IMS, automotive ERP, car dealer software, used car inventory management, auto marketplace India, dealer financing"
        canonicalUrl="/services"
        type="service"
        schema={serviceSchema}
      />
      
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            A 360° Automotive <span className="text-green-600">Ecosystem</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From advanced dealership software to consumer protection services. We provide the technology and trust that drives the industry forward.
          </p>
        </div>
      </section>

      {/* 1. Dealer IMS Section - Dark Theme */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800 skew-x-12 opacity-50 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-900/50 text-cyan-400 text-sm font-bold mb-6 border border-cyan-800">
                <Database className="w-4 h-4 mr-2" /> Dealer OS
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                The All-In-One <br/>
                <span className="text-cyan-400">Inventory Management System</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Empower your dealership with a fully integrated suite. Manage your entire business from a single dashboard—from stock acquisition to final billing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-cyan-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-white">Custom Brand Website</h4>
                    <p className="text-sm text-gray-400">We build a dedicated website for your brand. Your inventory on IMS syncs instantly to your site.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Monitor className="w-6 h-6 text-cyan-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-white">Live Inventory Sync</h4>
                    <p className="text-sm text-gray-400">Upload once, publish everywhere. Syncs with Trusted Vehicles Marketplace and your website.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-cyan-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-white">Staff & HR Management</h4>
                    <p className="text-sm text-gray-400">Track employee performance, manage roles, and handle payroll within the system.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="w-6 h-6 text-cyan-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold text-white">Billing & Reports</h4>
                    <p className="text-sm text-gray-400">Generate GST-compliant invoices and download detailed sales/stock reports.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="mt-10 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-cyan-900/50"
              >
                Request IMS Demo
              </button>
            </div>

            {/* Visual Representation of Dashboard */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-2xl relative">
                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                  <div>
                    <div className="text-xs text-gray-400">Total Revenue</div>
                    <div className="text-2xl font-bold text-white">₹2.4 Cr</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Active Listings</div>
                    <div className="text-2xl font-bold text-cyan-400">142</div>
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                      <Area type="monotone" dataKey="sales" stroke="#06b6d4" fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
                    <div className="bg-slate-700/50 p-2 rounded">New Leads: +45</div>
                    <div className="bg-slate-700/50 p-2 rounded">Pending PDI: 3</div>
                    <div className="bg-slate-700/50 p-2 rounded">Sold Today: 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Marketplace Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold tracking-wider uppercase text-sm">Revolutionizing Sales</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">India's First D2C Marketplace</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The only platform bridging the gap directly between <span className="font-semibold text-slate-900">Verified Dealers</span> and <span className="font-semibold text-slate-900">Genuine Buyers</span>. No brokers, no middlemen, no noise.
            </p>
          </div>

          {/* Verification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Smart Filtering */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Search className="w-32 h-32 text-red-600" />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                        <Zap className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Filtering</h3>
                    <p className="text-gray-600 mb-6">
                        Stop scrolling through irrelevant listings. Our advanced systems analyze buyer behavior and preferences to deliver <strong>Exact Matches</strong>.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>For Buyers:</strong> We filter out cars that don't match your specific needs (budget, mileage, condition).</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>For Dealers:</strong> Receive leads that are actually ready to buy, filtered by purchasing power and intent.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Verification Process */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <ShieldCheck className="w-32 h-32 text-red-600" />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                        <Gavel className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Stringent Dealer Verification</h3>
                    <p className="text-gray-600 mb-6">
                        We don't just let anyone list. We are India's first platform with a 100% physically verified dealer network.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>IMS Integration:</strong> Dealers must use our Inventory Management System. Stock is synced live—if it's sold in the showroom, it's removed from the app instantly.</span>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700"><strong>Physical Audits:</strong> Our field agents verify the existence and condition of dealership inventory regularly.</span>
                        </li>
                    </ul>
                </div>
            </div>
          </div>

          {/* Benefits Comparison */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-700">
                {/* For Buyers */}
                <div className="md:pr-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-green-400">
                        <Users className="mr-3" /> For Customers
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <div className="bg-slate-800 p-2 rounded-lg mr-4">
                                <ShieldCheck className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Zero Fake Listings</h4>
                                <p className="text-slate-400 text-sm">Every car you see is real and available. No "bait and switch" tactics.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-slate-800 p-2 rounded-lg mr-4">
                                <Search className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Direct Dealer Access</h4>
                                <p className="text-slate-400 text-sm">Chat directly with the showroom floor manager. Negotiate without middlemen.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-slate-800 p-2 rounded-lg mr-4">
                                <FileText className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Transparent Pricing</h4>
                                <p className="text-slate-400 text-sm">Advanced valuation tools show you the fair market price instantly.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* For Dealers */}
                <div className="pt-8 md:pt-0 md:pl-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-cyan-400">
                        <Database className="mr-3" /> For Dealers
                    </h3>
                    <ul className="space-y-4">
                         <li className="flex items-start">
                            <div className="bg-slate-800 p-2 rounded-lg mr-4">
                                <BarChart3 className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">High-Intent Leads</h4>
                                <p className="text-slate-400 text-sm">Our system filters out window shoppers. You get leads ready to make a purchase decision.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-slate-800 p-2 rounded-lg mr-4">
                                <Monitor className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">One-Click Live</h4>
                                <p className="text-slate-400 text-sm">Push inventory from your IMS directly to the marketplace. No manual re-entry.</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <div className="bg-slate-800 p-2 rounded-lg mr-4">
                                <Globe className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Nationwide Reach</h4>
                                <p className="text-slate-400 text-sm">Expand your customer base beyond your local city to the entire country.</p>
                            </div>
                        </li>
                    </ul>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. PDI Check Section - Orange Theme */}
      <section className="py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="md:w-1/2">
               <img 
                 src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80" 
                 alt="Mechanic Inspecting Car" 
                 className="rounded-2xl shadow-xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
               />
             </div>
             <div className="md:w-1/2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4 border border-orange-200">
                  <Wrench className="w-4 h-4 mr-2" /> Pre-Delivery Inspection
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Is Your "New" Car <br/> Actually New?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Avoid the "Test Drive" Trap</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        Showrooms sometimes deliver vehicles used for test drives as brand new. We check odometer tampering and tyre wear patterns.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Layers className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Hidden Dents & Repaints</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        Transport damage is often fixed and hidden. Our paint depth gauges detect if panels have been repainted or repaired.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <SettingsIcon className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Part Swapping Protection</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        We verify that batteries, tires, and accessories are original and haven't been swapped with older or unhealthy parts.
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/pdi" className="mt-8 inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                  Book a PDI Expert
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Financial Services (Insurance & Loans) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Financial Services</h2>
            <p className="text-gray-600">Complete peace of mind for your purchase.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Insurance Card */}
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="w-48 h-48 text-purple-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Insurance & Protection</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" /> Compare quotes from 20+ insurers</li>
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" /> Instant policy issuance</li>
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" /> Cashless claims assistance</li>
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-purple-500 mr-2" /> Zero-Depreciation add-ons</li>
                </ul>
                <Link to="/insurance" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Check Insurance Rates <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Loan Card */}
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Banknote className="w-48 h-48 text-yellow-600" />
              </div>
              <div className="relative z-10">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Banknote className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Car Financing</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-yellow-600 mr-2" /> 90-100% on-road funding</li>
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-yellow-600 mr-2" /> Interest rates starting @ 8.99%</li>
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-yellow-600 mr-2" /> Digital approval in 30 mins</li>
                  <li className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-yellow-600 mr-2" /> Flexible tenure up to 7 years</li>
                </ul>
                <Link to="/car-loan" className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Check Loan Eligibility <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your automotive experience?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Contact Sales
            </Link>
            <Link to="/buy" className="bg-white hover:bg-gray-100 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors">
              Explore Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
            >
              <X size={20} />
            </button>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-cyan-100 rounded-lg">
                    <Database className="w-6 h-6 text-cyan-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900">Get IMS Demo</h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm">Fill in your details to schedule a personalized walkthrough of our Dealer OS.</p>
              
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    required 
                    name="name" 
                    value={demoForm.name} 
                    onChange={handleDemoChange} 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900" 
                    placeholder="e.g. Rahul Sharma" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input 
                    required 
                    type="tel"
                    name="phone" 
                    pattern="[0-9]{10}"
                    value={demoForm.phone} 
                    onChange={handleDemoChange} 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900" 
                    placeholder="e.g. 9876543210" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    required 
                    type="email"
                    name="email" 
                    value={demoForm.email} 
                    onChange={handleDemoChange} 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900" 
                    placeholder="e.g. rahul@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Dealership Name <span className="text-gray-400 font-normal normal-case">(Optional)</span></label>
                  <input 
                    name="dealershipName" 
                    value={demoForm.dealershipName} 
                    onChange={handleDemoChange} 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-slate-900" 
                    placeholder="e.g. Sharma Motors" 
                  />
                </div>
                
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-200 transition-all transform active:scale-95 mt-2">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper icon component
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default Services;