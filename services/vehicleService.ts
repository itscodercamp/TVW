import { ApiVehicle, Car } from '../types';

const BASE_URL = 'https://apis.trustedvehicles.com';

// Helper to map API data to frontend Car model based on user provided parameters
const mapApiToCar = (apiVehicles: ApiVehicle[]): Car[] => {
  return apiVehicles.map(v => {
    // Determine image list. Prioritize 'images' array if exists, otherwise fallback to specific fields
    let gallery: string[] = [];
    if (v.images && Array.isArray(v.images) && v.images.length > 0) {
      gallery = v.images;
    } else {
      gallery = [
        v.mainImage,
        v.img_front,
        v.img_back,
        v.img_left,
        v.img_right,
        v.img_dashboard,
        v.img_interior_front
      ].filter((url): url is string => !!url && typeof url === 'string' && url.length > 0);
    }

    return {
      id: v.id || v._id || 'unknown',
      make: v.make,
      model: v.model,
      year: Number(v.year),
      price: v.price,
      // Map 'odometer' to mileage as per request spec
      mileage: typeof v.odometer === 'string' ? parseInt(v.odometer.replace(/[^0-9]/g, ''), 10) : (v.odometer || 0),
      fuelType: v.fuelType,
      transmission: v.transmission || 'Manual', // Default if not provided in list
      imageUrl: v.mainImage || 'https://via.placeholder.com/800x600.png?text=No+Image', // User specified mainImage
      imageUrls: gallery,
      featured: v.status === 'For Sale', // Logic for featured can be adjusted
      rtoState: v.rtoState,
      variant: v.variant
    };
  });
};

export const fetchVehicles = async (): Promise<Car[]> => {
  try {
    const url = `${BASE_URL}/api/marketplace/vehicles`;
    console.log(`Fetching vehicles from: ${url}`);
    
    // Headers as per request (Authorization would be added here if we had the token)
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}` // Uncomment if token logic is added
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();

    let vehicleList: ApiVehicle[] = [];

    // Robust check for array vs object response
    if (Array.isArray(data)) {
      vehicleList = data;
    } else if (data && Array.isArray(data.data)) {
      vehicleList = data.data;
    } else if (data && Array.isArray(data.vehicles)) {
      vehicleList = data.vehicles;
    } else {
      console.error("Unexpected API response format", data);
      throw new Error('Invalid Data Format');
    }

    return mapApiToCar(vehicleList);

  } catch (error) {
    console.error("API Fetch Failed:", error);
    // CRITICAL: Re-throw error so the UI shows "Maintenance" screen instead of fake data
    throw error;
  }
};

export const fetchVehicleById = async (id: string): Promise<Car | null> => {
  try {
    const url = `${BASE_URL}/api/marketplace/vehicles/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
       throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    // Handling potential wrappers for single object (data.data, data.vehicle, or just data)
    const vehicleData = Array.isArray(data) ? data[0] : (data.data || data.vehicle || data);

    if (!vehicleData) return null;

    const mapped = mapApiToCar([vehicleData]);
    return mapped[0];
  } catch (error) {
    console.error("Fetch vehicle by ID failed:", error);
    throw error;
  }
};

export const fetchFeaturedVehicles = async (): Promise<Car[]> => {
  // Just fetch all and slice, propagating errors if any
  const cars = await fetchVehicles();
  return cars.slice(0, 8);
};