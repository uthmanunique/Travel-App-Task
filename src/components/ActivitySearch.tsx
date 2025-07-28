// travel-app-task/src/components/ActivitySearch.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchActivities } from '../services/activityService';

const ActivitySearch = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    city_id: '-2092174', // Example: New York
    date: '2025-07-29',
    adults: 1,
    currency_code: 'AED',
  });

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activities, setActivities] = useState<any[]>([]);
  
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itinerary, setItinerary] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await searchActivities(searchParams);
      setActivities(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToItinerary = (activity: any) => {
    setItinerary([...itinerary, activity]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <div className="relative w-full h-40 p-4 rounded-sm">
        <div className="absolute inset-4 rounded-sm">
          <div className="absolute inset-0 bg-[#E7F0FF] opacity-40 z-10 rounded-sm"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between w-full mt-4 px-6">
        <div className="flex flex-col w-full lg:w-2/3 pr-3">
          <div className="flex items-center text-[#7A4504] px-0 py-0.5 rounded-sm mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/calendar-icon.png" alt="Calendar" className="h-4 w-4 mr-1.5" />
            <span className="text-xs">{searchParams.date}</span>
          </div>
          <h1 className="text-xl text-black font-bold mb-3">Activity Search</h1>
          <form onSubmit={handleSearch} className="bg-[#F0F2F5] p-6 rounded-sm shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">City ID</label>
                <input
                  type="text"
                  placeholder="e.g., -2092174 (New York)"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.city_id}
                  onChange={(e) => setSearchParams({ ...searchParams, city_id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D2433] font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-sm text-sm text-gray-600 focus:outline-none"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>
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
              Search Activities
            </button>
          </form>
          <div className="mt-6 bg-[#F0F2F5] p-4 rounded-sm">
            <h2 className="text-xl text-[#1D2433] font-bold mb-4">Activity Results</h2>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="bg-white p-4 mb-2 rounded-sm flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#1D2433] font-semibold">{activity.name || 'Unknown Activity'}</p>
                    <p className="text-xs text-gray-600">
                      Price: {activity.price?.amount || 'N/A'} {activity.currency_code || 'AED'}
                    </p>
                    <p className="text-xs text-gray-600">Rating: {activity.rating || 'N/A'}</p>
                  </div>
                  <button
                    className="bg-[#0D6EFD] text-white text-xs px-3 py-1 rounded-sm"
                    onClick={() => addToItinerary(activity)}
                  >
                    Add to Itinerary
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No activities found. Try adjusting your search.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/3 pl-3 space-y-4 items-end mt-4 lg:mt-0">
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
          <div className="w-full bg-[#F0F2F5] p-4 rounded-sm">
            <h3 className="text-sm text-[#1D2433] font-semibold mb-2">Itinerary</h3>
            {itinerary.length > 0 ? (
              itinerary.map((activity, index) => (
                <div key={index} className="text-xs text-gray-600 mb-1">
                  {activity.name || 'Unknown'} - {activity.price?.amount || 'N/A'} {activity.currency_code || 'AED'}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-600">No activities in itinerary.</p>
            )}
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

export default ActivitySearch;
