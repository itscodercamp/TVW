import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <div className="mb-4 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-slate-100 transition-colors">
        {item.icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
      <Link 
        to={item.link} 
        className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
      >
        Learn More <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;
