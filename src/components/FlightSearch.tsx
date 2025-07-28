// travel-app-task/src/components/FlightSearch.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchFlights } from '../services/flightService';

const FlightSearch = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    fromId: 'BOM.AIRPORT',
    toId: 'DEL.AIRPORT',
    departDate: '2025-07-29',
    returnDate: '2025-07-30',
    stops: 'none' as 'none' | '0' | '1' | '2',
    pageNo: 1,
    adults: 1,
    children: '0,17',
    sort: 'BEST' as 'BEST' | 'CHEAPEST' | 'FASTEST',
    cabinClass: 'ECONOMY' as 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST',
    currency_code: 'AED',
  });
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [flights, setFlights] = useState<any[]>([]);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itinerary, setItinerary] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await searchFlights(searchParams);
      setFlights(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToItinerary = (flight: any) => {
    setItinerary([...itinerary, flight]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      {/* Header Placeholder - Handled by Layout */}
      <div className="relative w-full h-40 p-4 rounded-sm">
        <div className="absolute inset-4 rounded-sm">
          <div className="absolute inset-0 bg-[#E7F0FF] opacity-40 z-10 rounded-sm"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between w-full mt-4 px-6">
        {/* Left Content (2/3) */}
        <div className="flex flex-col w-full lg:w-2/3 pr-3">
          {/* Search Section */}
          <div className="flex items-center text-[#7A4504] px-0 py-0.5 rounded-sm mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/calendar-icon.png" alt="Calendar" className="h-4 w-4 mr-1.5" />
            <span className="text-xs">{searchParams.departDate} to {searchParams.returnDate}</span>
          </div>
          <h1 className="text-xl text-black font-bold mb-3">Flight Search</h1>
          <form onSubmit={handleSearch} className="bg-[#F0F2F5] p-6 rounded-sm shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From and To */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">From</label>
                <input
                  type="text"
                  placeholder="From (e.g., BOM.AIRPORT)"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.fromId}
                  onChange={(e) => setSearchParams({ ...searchParams, fromId: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">To</label>
                <input
                  type="text"
                  placeholder="To (e.g., DEL.AIRPORT)"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.toId}
                  onChange={(e) => setSearchParams({ ...searchParams, toId: e.target.value })}
                />
              </div>
              {/* Dates */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Depart Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.departDate}
                  onChange={(e) => setSearchParams({ ...searchParams, departDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Return Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.returnDate}
                  onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                />
              </div>
              {/* Stops */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Stops</label>
                <select
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.stops}
                  onChange={(e) => setSearchParams({ ...searchParams, stops: e.target.value as 'none' | '0' | '1' | '2' })}
                >
                  <option value="none">No Preference</option>
                  <option value="0">Non-Stop</option>
                  <option value="1">One-Stop</option>
                  <option value="2">Two-Stop</option>
                </select>
              </div>
              {/* Page No */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Page Number</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.pageNo}
                  onChange={(e) => setSearchParams({ ...searchParams, pageNo: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
              {/* Adults */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Adults</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.adults}
                  onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
              {/* Children */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Children (Age, e.g., 0,17)</label>
                <input
                  type="text"
                  placeholder="e.g., 0,17"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.children}
                  onChange={(e) => setSearchParams({ ...searchParams, children: e.target.value })}
                />
              </div>
              {/* Sort */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Sort By</label>
                <select
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.sort}
                  onChange={(e) => setSearchParams({ ...searchParams, sort: e.target.value as 'BEST' | 'CHEAPEST' | 'FASTEST' })}
                >
                  <option value="BEST">Best</option>
                  <option value="CHEAPEST">Cheapest</option>
                  <option value="FASTEST">Fastest</option>
                </select>
              </div>
              {/* Cabin Class */}
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Cabin Class</label>
                <select
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.cabinClass}
                  onChange={(e) => setSearchParams({ ...searchParams, cabinClass: e.target.value as 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST' })}
                >
                  <option value="ECONOMY">Economy</option>
                  <option value="PREMIUM_ECONOMY">Premium Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First</option>
                </select>
              </div>
              {/* Currency Code */}
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
              Search Flights
            </button>
          </form>

          {/* Results Section */}
          <div className="mt-6 bg-[#F0F2F5] p-4 rounded-sm">
            <h2 className="text-xl text-[#1D2433] font-bold mb-4">Flight Results</h2>
            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <div key={index} className="bg-white p-4 mb-2 rounded-sm flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#1D2433] font-semibold">
                      {flight.airlines?.[0]?.name || 'Unknown Airline'} - {flight.origin || 'N/A'} to {flight.destination || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-600">Price: {flight.minPrice?.units || 'N/A'} {flight.currency_code || 'AED'}</p>
                    <p className="text-xs text-gray-600">Duration: {flight.duration || 'N/A'}</p>
                  </div>
                  <button
                    className="bg-[#0D6EFD] text-white text-xs px-3 py-1 rounded-sm"
                    onClick={() => addToItinerary(flight)}
                  >
                    Add to Itinerary
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No flights found. Try adjusting your search.</p>
            )}
          </div>
        </div>
        {/* Right Content (1/3) */}
        <div className="flex flex-col w-full lg:w-1/3 pl-3 space-y-4 items-end mt-4 lg:mt-0">
          {/* Profile and More Icon */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-[#E7F0FF] rounded-sm h-8 w-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile-icon.png" alt="Profile" className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/more-icon.png" alt="More" className="h-4 w-4" />
            </div>
          </div>
          {/* Human Image and Settings Frame */}
          <div className="flex items-center justify-start space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-[#E7F0FF] rounded-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/human-image.png" alt="Human" className="h-8 w-8 rounded-full" />
              </div>
            </div>
            <div className="w-10 h-0.5 bg-[#E7F0FF]"></div>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#E7F0FF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/settings-icon.png" alt="Settings" className="h-4 w-4" />
            </div>
          </div>
          {/* Itinerary */}
          <div className="w-full bg-[#F0F2F5] p-4 rounded-sm">
            <h3 className="text-sm text-[#1D2433] font-semibold mb-2">Itinerary</h3>
            {itinerary.length > 0 ? (
              itinerary.map((flight, index) => (
                <div key={index} className="text-xs text-gray-600 mb-1">
                  {flight.airlines?.[0]?.name || 'Unknown'} - {flight.minPrice?.units || 'N/A'} {flight.currency_code || 'AED'}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-600">No flights in itinerary.</p>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
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

export default FlightSearch;