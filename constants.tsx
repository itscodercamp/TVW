import React from 'react';
import { ServiceItem, Testimonial } from './types';
import { Shield, Banknote, Gavel, Car as CarIcon, Database, DollarSign } from 'lucide-react';

// MOCK_CARS removed as per request to only show live data or maintenance error.

export const SERVICES: ServiceItem[] = [
  {
    id: 'sell',
    title: 'Sell Your Car',
    description: 'Get the best value for your car instantly. Data-driven valuation.',
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
    link: '/sell',
  },
  {
    id: 'buy',
    title: 'Buy Certified Cars',
    description: 'Browse our collection of inspected and certified pre-owned vehicles.',
    icon: <CarIcon className="w-8 h-8 text-blue-600" />,
    link: '/buy',
  },
  {
    id: 'insurance',
    title: 'Insurance Renewal',
    description: 'Hassle-free car insurance renewal with competitive rates.',
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    link: '/insurance',
  },
  {
    id: 'loan',
    title: 'Car Loans',
    description: 'Quick loan approvals with low interest rates for your dream car.',
    icon: <Banknote className="w-8 h-8 text-yellow-600" />,
    link: '/car-loan',
  },
  {
    id: 'auction',
    title: 'Auction Marketplace',
    description: 'Participate in exclusive auctions for high-value vehicles.',
    icon: <Gavel className="w-8 h-8 text-red-600" />,
    link: '/services',
  },
  {
    id: 'ims',
    title: 'Dealer IMS',
    description: 'Advanced Inventory Management System for trusted dealers.',
    icon: <Database className="w-8 h-8 text-cyan-600" />,
    link: '/services',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Happy Seller",
    text: "Trusted Vehicles gave me a price 15% higher than local dealers. The market valuation was spot on!",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "New Car Owner",
    text: "The buying process was seamless. The car condition was exactly as described.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Dealer Partner",
    text: "Their IMS system has revolutionized how I manage my inventory. Highly recommended.",
  },
];