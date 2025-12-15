import React from 'react';
import { Clock, Rocket, Briefcase, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Careers: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-20 animate-fade-in relative overflow-hidden">
      <SEO 
        title="Careers at Trusted Vehicles" 
        description="Join the team revolutionizing the automotive ecosystem. Hiring starts January 2026."
        keywords="careers, jobs in automotive, work at Trusted Vehicles, hiring"
        canonicalUrl="/careers"
      />
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-4 bg-slate-900 rounded-2xl mb-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <Rocket className="w-10 h-10 text-green-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Trusted Vehicles</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          We are preparing to build a world-class team to revolutionize the automotive ecosystem. 
          The road to innovation starts here.
        </p>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 max-w-2xl mx-auto relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
           
           <div className="mb-6">
             <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100 mb-4">
               Future Opportunities
             </span>
             <h2 className="text-4xl font-bold text-slate-900 mb-2">Coming Soon</h2>
             <p className="text-gray-500">We are currently setting up our HR infrastructure.</p>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
             <div className="flex items-center bg-slate-50 px-6 py-4 rounded-xl border border-gray-200 w-full md:w-auto">
               <Calendar className="w-6 h-6 text-slate-700 mr-3" />
               <div className="text-left">
                 <p className="text-xs text-gray-500 uppercase font-bold">Hiring Starts From</p>
                 <p className="text-lg font-bold text-slate-900">January 2026</p>
               </div>
             </div>
           </div>

           <p className="text-sm text-gray-500 italic">
             "Great things take time. We can't wait to meet you soon."
           </p>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-slate-600 hover:text-green-600 font-medium transition-colors flex items-center justify-center gap-2">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;