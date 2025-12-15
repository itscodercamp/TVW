import React from 'react';

export interface ApiVehicle {
  id: string;
  _id?: string;
  make: string;
  model: string;
  variant: string;
  price: number;
  year: number | string;
  status: string;
  
  // Specific fields from user requirement
  mainImage: string; // User specified 'mainImage'
  odometer: number | string; // User specified 'odometer'
  fuelType: string; // User specified 'fuelType'
  rtoState?: string; // User specified 'rtoState'
  
  // Optional extras that might come back
  verified?: boolean;
  transmission?: string;
  color?: string;
  reg_number?: string;
  
  // Gallery images if available (mapped or extras)
  images?: string[];
  img_front?: string;
  img_back?: string;
  img_left?: string;
  img_right?: string;
  img_dashboard?: string;
  img_interior_front?: string;
  
  [key: string]: any; 
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  imageUrl: string;
  imageUrls?: string[];
  featured?: boolean;
  rtoState?: string;
  variant?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}