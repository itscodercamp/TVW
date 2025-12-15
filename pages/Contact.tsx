import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://apis.trustedvehicles.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast('Message sent successfully! We will get back to you soon.', 'success');
        setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Network error. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Trusted Vehicles",
    "image": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    "telephone": "+91 84672 73110",
    "email": "support@trustedvehicles.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Civil Lines",
      "addressLocality": "Nagpur",
      "addressRegion": "MH",
      "postalCode": "440001",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Trusted Vehicles. Visit our Nagpur office, email us, or call for support regarding buying, selling, or valuing cars."
        keywords="contact trusted vehicles, customer support, car dealer contact, Nagpur office"
        canonicalUrl="/contact"
        schema={contactSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-12">Get in Touch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-900">Our HQ</h3>
                  <p className="text-gray-600">Nagpur, Maharashtra<br />India</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                  <p className="text-gray-600">+91 84672 73110</p>
                  <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-green-600 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <p className="text-gray-600">support@trustedvehicles.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="font-semibold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">FB</div>
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">TW</div>
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">IG</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900">
                  <option>General Inquiry</option>
                  <option>Buying a Car</option>
                  <option>Selling a Car</option>
                  <option>Dealer Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-lg text-white font-bold transition-colors shadow-lg ${loading ? 'bg-gray-400' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;