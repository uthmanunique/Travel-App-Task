// travel-app-task/src/context/ItineraryContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface Hotel {
  hotel_id: string;
  name: string;
  address: string;
  city: string;
  review_score: number;
  review_count: number;
  main_photo_url: string;
  price_breakdown: { gross_price: number };
  currency: string;
  checkin_date: string;
  checkout_date: string;
}

interface ItineraryContextType {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  removeHotel: (index: number) => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const ItineraryProvider = ({ children }: { children: ReactNode }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const savedHotels = Cookies.get('hotels');
    if (savedHotels) {
      try {
        setHotels(JSON.parse(savedHotels));
      } catch (error) {
        console.error('Failed to parse saved hotels:', error);
      }
    }
  }, []);

  useEffect(() => {
    Cookies.set('hotels', JSON.stringify(hotels), { expires: 7 });
  }, [hotels]);

  const addHotel = (hotel: Hotel) => {
    setHotels((prev) => [...prev, hotel]);
  };

  const removeHotel = (index: number) => {
    setHotels((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ItineraryContext.Provider value={{ hotels, addHotel, removeHotel }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};
