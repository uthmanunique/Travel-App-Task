// travel-app-task/src/components/HotelSearch.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { searchHotels } from '../services/hotelService';
import { useItinerary } from '../context/ItineraryContext';

const HotelSearch = () => {
  const router = useRouter();
  const { addHotel } = useItinerary();
  const [searchParams, setSearchParams] = useState({
    dest_id: '-2092174', // Mumbai
    checkin_date: '2025-07-28',
    checkout_date: '2025-07-31',
    adults_number: 1,
    currency_code: 'AED',
    children_age: '0,17',
    room_qty: 1,
    page_number: 1,
  });
  
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hotels, setHotels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await searchHotels(searchParams);
      setHotels(data);
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Search failed:', error);
      setError(error.message || 'Failed to fetch hotels. Please try again.');
    }
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToItinerary = (hotel: any) => {
    addHotel({
      hotel_id: hotel.hotel_id,
      name: hotel.property.name,
      main_photo_url: hotel.property.photoUrls[0] || '/hotel-image.png',
      address: hotel.property.wishlistName || 'N/A', // Fallback, as address not directly available
      city: hotel.property.wishlistName || 'N/A',
      review_score: hotel.property.reviewScore || 0,
      review_count: hotel.property.reviewCount || 0,
      price_breakdown: {
        gross_price: hotel.property.priceBreakdown.grossPrice.value || 0,
      },
      currency: hotel.property.currency || 'AED',
      checkin_date: hotel.property.checkinDate || searchParams.checkin_date,
      checkout_date: hotel.property.checkoutDate || searchParams.checkout_date,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <div className="relative w-full h-40 p-4 rounded-sm">
        <div className="absolute inset-4 rounded-sm">
          <Image
            src="/banner.png"
            alt="Banner"
            fill
            style={{ objectFit: 'cover' }}
            className="z-0 rounded-sm"
            onError={(e) => (e.currentTarget.src = '/fallback-banner.png')}
          />
          <div className="absolute inset-0 bg-[#E7F0FF] opacity-40 z-10 rounded-sm"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full mt-4 px-6">
        <div className="flex flex-col w-full lg:w-2/3 pr-3">
          <div className="flex items-center text-[#7A4504] px-0 py-0.5 rounded-sm mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/calendar-icon.png" alt="Calendar" className="h-4 w-4 mr-1.5" />
            <span className="text-xs">{searchParams.checkin_date} to {searchParams.checkout_date}</span>
          </div>
          <h1 className="text-xl text-black font-bold mb-3">Hotel Search</h1>
          <form onSubmit={handleSearch} className="bg-[#F0F2F5] p-6 rounded-sm shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Destination ID</label>
                <input
                  type="text"
                  placeholder="e.g., -2092174 (Mumbai)"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.dest_id}
                  onChange={(e) => setSearchParams({ ...searchParams, dest_id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Check-in Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.checkin_date}
                  onChange={(e) => setSearchParams({ ...searchParams, checkin_date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Check-out Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.checkout_date}
                  onChange={(e) => setSearchParams({ ...searchParams, checkout_date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Adults</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.adults_number}
                  onChange={(e) => setSearchParams({ ...searchParams, adults_number: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Currency</label>
                <input
                  type="text"
                  placeholder="e.g., AED"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.currency_code}
                  onChange={(e) => setSearchParams({ ...searchParams, currency_code: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#0D6EFD] text-white text-xs px-6 py-2 rounded-sm mt-4 w-full md:w-auto"
            >
              Search Hotels
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-6 bg-[#F0F2F5] p-4 rounded-sm">
            <h2 className="text-xl text-[#1D2433] font-bold mb-4">Hotel Results</h2>
            {hotels.length > 0 ? (
              //eslint-disable-next-line @typescript-eslint/no-unused-vars
              hotels.map((hotel, index) => (
                <div key={hotel.hotel_id} className="bg-white p-4 mb-2 rounded-sm flex justify-between items-center">
                  <div className="flex items-center">
                    <Image
                      src={hotel.property.photoUrls[0] || '/hotel-image.png'}
                      alt={hotel.property.name || 'Hotel'}
                      width={100}
                      height={100}
                      className="rounded-sm mr-4"
                    />
                    <div>
                      <p className="text-sm text-[#1D2433] font-semibold">
                        {hotel.property.name || 'Unknown Hotel'} - {hotel.property.wishlistName || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600">
                        Price: {hotel.property.priceBreakdown.grossPrice.value || 'N/A'} {hotel.property.currency || 'AED'}
                      </p>
                      <p className="text-xs text-gray-600">
                        Rating: {hotel.property.reviewScore || 'N/A'} ({hotel.property.reviewCount || 0} reviews)
                      </p>
                    </div>
                  </div>
                  <button
                    className="bg-[#0D6EFD] text-white text-xs px-3 py-1 rounded-sm"
                    onClick={() => handleAddToItinerary(hotel)}
                  >
                    Add to Itinerary
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No hotels found. Try adjusting your search.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/3 pl-3 space-y-4 items-end mt-4 lg:mt-0">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-[#E7F0FF] rounded-sm h-8 w-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profilee-icon.png" alt="Profile" className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/more-icon.png" alt="More" className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-start space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-[#E7F0FF] rounded-full flex items-center justify-center">
                <Image src="/human-image.png" alt="Human" width={32} height={32} className="rounded-full" />
              </div>
            </div>
            <div className="w-10 h-0.5 bg-[#E7F0FF]"></div>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#E7F0FF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/settings-icon.png" alt="Settings" className="h-4 w-4" />
            </div>
          </div>
          <div className="w-full bg-[#F0F2F5] p-4 rounded-sm">
            <h3 className="text-sm text-[#1D2433] font-semibold mb-2">Itinerary</h3>
            <p className="text-xs text-gray-600">Itinerary hotels will appear on the home page.</p>
          </div>
        </div>
      </div>
      <div className="px-6 mt-4 mb-6">
        <button
          className="bg-[#0D6EFD] text-white text-xs px-6 py-2 rounded-sm"
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default HotelSearch;
