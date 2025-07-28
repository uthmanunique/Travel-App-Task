// travel-app-task/src/components/LandingPage.tsx
"use client";

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { searchFlights } from '../services/flightService';

const FlightTicket = ({
  logo,
  airline,
  code,
  classType,
  depTime,
  depDate,
  arrTime,
  arrDate,
  from,
  to,
  price,
  duration,
  direct,
  facilities,
  progressBar,
}: {
  logo: string;
  airline: string;
  code: string;
  classType: string;
  depTime: string;
  depDate: string;
  arrTime: string;
  arrDate: string;
  from: string;
  to: string;
  price: string;
  duration: string;
  direct: string;
  facilities: { icon: string; label: string }[];
  progressBar: { left: string; width: string };
}) => (
  <div className="bg-white rounded-sm px-6 py-5 w-full mt-4 shadow-sm flex">
    {/* Main Ticket Content */}
    <div className="flex-1">
      <div className="flex items-center justify-between w-full">
        {/* Left Section: Logo, Airline, Code, Class, Times, Progress, Airports */}
        <div className="flex items-center w-full">
          {/* Logo & Airline */}
          <div className="flex items-center min-w-[110px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={airline} className="h-6 w-auto mr-2" />
            <div className="flex flex-col">
              <span className="text-sm text-[#1D2433] font-semibold">{airline}</span>
              <div className="flex space-x-2 mt-2">
                <span className="text-xs text-[#1D2433]">{code}</span>
                <span className="text-xs bg-[#0A369D] text-white px-2 py-0.5 rounded-sm">{classType}</span>
              </div>
            </div>
          </div>
          {/* Departure */}
          <div className="flex flex-col items-center mx-8 min-w-[80px]">
            <span className="text-lg text-[#1D2433] font-bold">{depTime}</span>
            <span className="text-xs text-gray-500">{depDate}</span>
          </div>
          {/* Progress Bar Section */}
          <div className="flex flex-col flex-1 items-center mx-1">
            <div className="flex items-center justify-center w-full mt-1">
              <span className="text-xs text-gray-600 mx-auto">{`Duration: ${duration}`}</span>
            </div>
            <div className="flex flex-col items-center w-full relative">
              <div className="flex items-center justify-between w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/takeoff.png" alt="Takeoff" className="h-4 w-4" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/landing.png" alt="Landing" className="h-4 w-4" />
              </div>
              <div className="flex-1 mx-2 relative h-2 w-full bg-[#E7F0FF] rounded-sm mt-1">
                <div
                  className="absolute h-2 bg-[#0D6EFD] rounded-sm"
                  style={{
                    left: progressBar.left,
                    width: progressBar.width,
                    top: 0,
                  }}
                ></div>
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <span className="text-sm text-[#1D2433] font-semibold">{from}</span>
                <span className="text-xs text-gray-500">{direct}</span>
                <span className="text-sm text-[#1D2433] font-semibold">{to}</span>
              </div>
            </div>
          </div>
          {/* Arrival */}
          <div className="flex flex-col items-center mx-8 min-w-[80px]">
            <span className="text-lg text-[#1D2433] font-bold">{arrTime}</span>
            <span className="text-xs text-gray-500">{arrDate}</span>
          </div>
          {/* Price */}
          <div className="flex flex-col items-end min-w-[120px]">
            <span className="text-lg font-bold text-[#1D2433]">₦{price}</span>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4 border-gray-200" />
      {/* Facilities */}
      <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
        <span className="text-xs text-[#1D2433] font-medium">Facilities:</span>
        {facilities.map((f, idx) => (
          <div key={idx} className="flex items-center space-x-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.icon} alt="" className="h-4 w-4" />
            <span className="text-xs text-gray-700">{f.label}</span>
          </div>
        ))}
      </div>
      {/* Divider */}
      <hr className="my-4 border-gray-200" />
      {/* Footer Actions */}
      <div className="flex items-center justify-between w-full">
        <div className="flex space-x-4">
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Flight details</span>
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Price details</span>
        </div>
        <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Edit details</span>
      </div>
    </div>
  </div>
);

const HotelCard = ({
  image,
  name,
  address,
  rating,
  roomType,
  price,
  totalPrice,
  duration,
  checkIn,
  checkOut,
  facilities,
}: {
  image: string;
  name: string;
  address: string;
  rating: string;
  roomType: string;
  price: string;
  totalPrice: string;
  duration: string;
  checkIn: string;
  checkOut: string;
  facilities: { icon: string; label: string }[];
}) => (
  <div className="bg-white rounded-sm px-6 py-5 w-full mt-4 shadow-sm flex">
    {/* Image Section */}
    <div className="relative w-48 h-48 mr-6">
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-sm"
      />
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/back-icon.png" alt="Back" className="h-6 w-6 bg-white rounded-full p-1 cursor-pointer" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/forward-icon.png" alt="Forward" className="h-6 w-6 bg-white rounded-full p-1 cursor-pointer" />
      </div>
    </div>
    {/* Main Content */}
    <div className="flex-1">
      <div className="flex justify-between">
        {/* Left: Hotel Details */}
        <div className="flex flex-col">
          <span className="text-lg text-[#1D2433] font-bold">{name}</span>
          <span className="text-sm text-gray-600 mt-1">{address}</span>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/map-icon.png" alt="Map" className="h-4 w-4" />
              <span className="text-xs text-[#0D6EFD] cursor-pointer">Show in map</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/star-icon.png" alt="Rating" className="h-4 w-4" />
              <span className="text-xs text-[#1D2433]">{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/room-icon.png" alt="Room" className="h-4 w-4" />
              <span className="text-xs text-[#1D2433]">{roomType}</span>
            </div>
          </div>
        </div>
        {/* Right: Price Details */}
        <div className="flex flex-col items-end">
          <span className="text-xl text-[#1D2433] font-bold">₦{price}</span>
          <span className="text-sm text-gray-600 mt-1">Total Price: {totalPrice}</span>
          <span className="text-xs text-gray-500 mt-1">{duration}</span>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4 border-gray-200" />
      {/* Facilities and Check-in/Check-out */}
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
          <span className="text-xs text-[#1D2433] font-medium">Facilities:</span>
          {facilities.map((f, idx) => (
            <div key={idx} className="flex items-center space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.icon} alt={f.label} className="h-4 w-4" />
              <span className="text-xs text-gray-700">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/check-inout.png" alt="Check In" className="h-4 w-4" />
            <span className="text-xs text-[#1D2433]">Check In: {checkIn}</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/check-inout.png" alt="Check Out" className="h-4 w-4" />
            <span className="text-xs text-[#1D2433]">Check Out: {checkOut}</span>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4 border-gray-200" />
      {/* Footer Actions */}
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Hotel details</span>
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Price details</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Edit details</span>
        </div>
      </div>
    </div>
  </div>
);

const ActivityCard = ({
  image,
  name,
  description,
  rating,
  duration,
  price,
  schedule,
  day,
  count,
  inclusions,
}: {
  image: string;
  name: string;
  description: string;
  rating: string;
  duration: string;
  price: string;
  schedule: string;
  day: string;
  count: number;
  inclusions: string;
}) => (
  <div className="bg-white rounded-sm px-6 py-5 w-full mt-4 shadow-sm flex">
    {/* Image Section */}
    <div className="relative w-48 h-48 mr-6">
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-sm"
      />
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/back-icon.png" alt="Back" className="h-6 w-6 bg-white rounded-full p-1 cursor-pointer" />
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/forward-icon.png" alt="Forward" className="h-6 w-6 bg-white rounded-full p-1 cursor-pointer" />
      </div>
    </div>
    {/* Main Content */}
    <div className="flex-1">
      <div className="flex justify-between">
        {/* Left: Activity Details */}
        <div className="flex flex-col">
          <span className="text-lg text-[#1D2433] font-bold">{name}</span>
          <span className="text-sm text-gray-600 mt-1">{description}</span>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/map-icon.png" alt="Directions" className="h-4 w-4" />
              <span className="text-xs text-[#0D6EFD] cursor-pointer">Directions</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/star-icon.png" alt="Rating" className="h-4 w-4" />
              <span className="text-xs text-[#1D2433]">{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/clock-icon.png" alt="Duration" className="h-4 w-4" />
              <span className="text-xs text-[#1D2433]">{duration}</span>
            </div>
          </div>
        </div>
        {/* Right: Price and Schedule */}
        <div className="flex flex-col items-end">
          <span className="text-xl text-[#1D2433] font-bold">₦{price}</span>
          <span className="text-sm text-gray-600 mt-1">{schedule}</span>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4 border-gray-200" />
      {/* Inclusions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
          <span className="text-xs text-[#1D2433] font-medium">What`s Included: {inclusions}</span>
          <span className="text-xs text-[#0D6EFD] cursor-pointer">See more</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white bg-[#0A369D] px-2 py-1 rounded-sm">{day} - ({count})</span>
          <div className="flex flex-col space-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/up-icon.png" alt="Increase" className="h-4 w-4 cursor-pointer" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/down-icon.png" alt="Decrease" className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4 border-gray-200" />
      {/* Footer Actions */}
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Activity details</span>
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Price details</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium text-[#0D6EFD] cursor-pointer">Edit details</span>
        </div>
      </div>
    </div>
  </div>
);

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const LandingPage = ({ children }: { children: ReactNode }) => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [flights, setFlights] = useState<any[]>([]);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const [hotels] = useState<any[]>([
    {
      image: '/hotel-image.png',
      name: 'Rivera Resort, Lekki',
      address: '18, Demo Street, Lagos',
      rating: '8.5 (436)',
      roomType: 'King size room',
      price: '123,450.00',
      totalPrice: 'NGN 560,000',
      duration: '1 room x 10 nights incl. taxes',
      checkIn: '20-04-2024',
      checkOut: '29-04-2024',
      facilities: [
        { icon: '/pool-icon.png', label: 'Pool' },
        { icon: '/bar-icon.png', label: 'Bar' },
      ],
    },
  ]);

//eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activities] = useState<any[]>([
    {
      image: '/activity-image.png',
      name: 'The Museum of Modern Art',
      description: 'Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant',
      rating: '4.5 (436)',
      duration: '1 hour',
      price: '123,450.00',
      schedule: '10:30 AM on Mar 19',
      day: 'Day 1',
      count: 2,
      inclusions: 'Admission to the Empire State Building',
    },
  ]);


  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchFlights = async () => {
    try {
      const data = await searchFlights({
        fromId: 'BOM.AIRPORT',
        toId: 'DEL.AIRPORT',
        departDate: '2025-07-29',
        returnDate: '2025-07-30',
        stops: 'none',
        pageNo: 1,
        adults: 1,
        children: '0,17',
        sort: 'BEST',
        cabinClass: 'ECONOMY',
        currency_code: 'AED',
      });
      setFlights(data);
    } catch (error) {
      console.error('Failed to fetch flights:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      {/* Header */}
      <div className="relative w-full h-40 p-4 rounded-sm">
        <div className="absolute inset-4 rounded-sm">
          <Image
            src="/banner.png"
            alt="Banner"
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
            onError={(e) => (e.currentTarget.src = '/fallback-banner.png')}
            priority
          />
          <div className="absolute inset-0 bg-opacity-40 z-10 rounded-sm"></div>
        </div>
      </div>

      {/* Main Content: Left 2/3 and Right 1/3 */}
      <div className="flex flex-col lg:flex-row justify-between w-full mt-4 px-6">
        {/* Left Content (2/3) */}
        <div className="flex flex-col w-full lg:w-2/3 pr-3">
          {/* Calendar */}
          <div className="flex items-center text-[#7A4504] px-0 py-0.5 rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/calendar-icon.png" alt="Calendar" className="h-4 w-4 mr-1.5" />
            <span className="text-xs">21 March 2024</span>
            <span className="mx-1.5 text-xs">&#8594;</span>
            <span className="text-xs">21 April 2024</span>
          </div>
          {/* Trip Title */}
          <h1 className="text-xl text-black font-bold mt-3">Bahamas Family Trip</h1>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-600">New York, United States of America</span>
            <span className="mx-2 h-3 w-px bg-gray-300"></span>
            <span className="text-xs text-gray-600">Solo Trip</span>
          </div>
          {/* Cards */}
          <div className="flex flex-col space-y-3 mt-4 lg:flex-row lg:space-x-3 lg:space-y-0">
            {/* Activities Card */}
            <div className="flex flex-col justify-between bg-[#000031] text-white p-3 rounded-sm w-full lg:w-48 h-36">
              <div>
                <h2 className="text-sm font-semibold">Activities</h2>
                <p className="text-xs mt-1">Build, personalize, and optimize your itineraries.</p>
              </div>
              <button className="bg-[#0D6EFD] text-white text-xs px-3 py-2 mt-2 w-full rounded-sm">
                Add Activities
              </button>
            </div>
            {/* Hotels Card */}
            <div className="flex flex-col justify-between bg-[#E7F0FF] text-gray-800 p-3 rounded-sm w-full lg:w-48 h-36">
              <div>
                <h2 className="text-sm font-semibold">Hotels</h2>
                <p className="text-xs mt-1">Build, personalize, and optimize your itineraries.</p>
              </div>
              <Link href="/hotel-search">
                <button className="bg-[#0D6EFD] text-white text-xs px-3 py-2 mt-2 w-full rounded-sm">
                  Add Hotels
                </button>
              </Link>
            </div>
            {/* Flights Card */}
            <div className="flex flex-col justify-between bg-[#0D6EFD] text-white p-3 rounded-sm w-full lg:w-48 h-36">
              <div>
                <h2 className="text-sm font-semibold">Flights</h2>
                <p className="text-xs mt-1">Build, personalize, and optimize your itineraries.</p>
              </div>
              <Link href="/flight-search">
                <button className="bg-white text-[#0D6EFD] text-xs px-3 py-2 mt-2 w-full rounded-sm">
                  Add Flights
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Right Content (1/3) */}
        <div className="flex flex-col w-full lg:w-1/3 pl-3 space-y-4 items-end">
          {/* Profile and More Icon */}
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
          {/* Human Image and Settings Frame */}
          <div className="flex items-center justify-start space-x-2">
            <div className="relative">
              <Image
                src="/human-image.png"
                alt="Human"
                width={40}
                height={40}
                className="rounded-full border-2 border-[#E7F0FF]"
              />
            </div>
            <div className="w-10 h-0.5 bg-[#E7F0FF]"></div>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#E7F0FF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/settings-icon.png" alt="Settings" className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      {/* Trip Itineraries Section */}
      <div className="w-full px-6 mt-9">
        <div className="mt-8">
          <h2 className="text-xl text-[#1D2433] font-bold">Trip Itineraries</h2>
          <p className="text-sm text-gray-600 mt-1">Your trip itineraries are placed here</p>
        </div>
        {/* Flights Section */}
        <div className="bg-[#F0F2F5] p-4 rounded-sm mt-6 py-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/flight.png" alt="Flights" className="h-4 w-4" />
              <span className="text-sm text-[#1D2433] font-semibold">Flights</span>
            </div>
            {flights.length > 0 && (
              <Link href="/flight-search">
                <button className="bg-white text-[#0D6EFD] text-xs px-6 py-2 rounded-sm shadow-sm hover:bg-gray-50 transition">
                  Add Flight
                </button>
              </Link>
            )}
          </div>
          <div className="flex flex-col mt-1 space-y-0">
            {flights.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded-sm py-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/no-flight.png" alt="Flight Icon" className="h-12 w-24 mb-4" />
                <span className="text-sm text-[#1D2433] font-semibold mb-4">No Request Yet</span>
                <Link href="/flight-search">
                  <button className="bg-[#0D6EFD] text-white text-xs px-8 py-3 rounded-sm shadow-sm hover:bg-[#0b5ed7] transition">
                    Add Flight
                  </button>
                </Link>
              </div>
            ) : (
              flights.map((flight, index) => (
                <FlightTicket
                  key={index}
                  logo={flight.airlines?.[0]?.logoUrl || '/default-logo.png'}
                  airline={flight.airlines?.[0]?.name || 'Unknown Airline'}
                  code={flight.airlines?.[0]?.iataCode || 'N/A'}
                  classType={flight.cabinClass || 'Economy'}
                  depTime={'N/A'}
                  depDate={'2025-07-29'}
                  arrTime={'N/A'}
                  arrDate={'2025-07-30'}
                  from={'BOM.AIRPORT'}
                  to={'DEL.AIRPORT'}
                  price={flight.minPrice?.units?.toString() || '0.00'}
                  duration={'N/A'}
                  direct={flight.stops === 0 ? 'Direct' : 'With Stops'}
                  facilities={[
                    { icon: '/immigration.png', label: 'Baggage: N/A' },
                  ]}
                  progressBar={{ left: '25%', width: '50%' }}
                />
              ))
            )}
          </div>
        </div>
        {/* Hotels Section */}
        <div className="bg-[#344054] p-4 rounded-sm mt-6 py-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hotel-icon.png" alt="Hotels" className="h-4 w-4" />
              <span className="text-sm text-white font-semibold">Hotels</span>
            </div>
            {hotels.length > 0 && (
              <Link href="/hotel-search">
                <button className="bg-white text-[#0D6EFD] text-xs px-6 py-2 rounded-sm shadow-sm hover:bg-gray-50 transition">
                  Add Hotel
                </button>
              </Link>
            )}
          </div>
          <div className="flex flex-col mt-1 space-y-0">
            {hotels.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded-sm py-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hottelli.png" alt="Hotel Icon" className="h-12 w-24 mb-4" />
                <span className="text-sm text-[#1D2433] font-semibold mb-4">No Request Yet</span>
                <Link href="/hotel-search">
                  <button className="bg-[#0D6EFD] text-white text-xs px-8 py-3 rounded-sm shadow-sm hover:bg-[#0b5ed7] transition">
                    Add Hotel
                  </button>
                </Link>
              </div>
            ) : (
              hotels.map((hotel, index) => (
                <HotelCard
                  key={index}
                  image={hotel.image}
                  name={hotel.name}
                  address={hotel.address}
                  rating={hotel.rating}
                  roomType={hotel.roomType}
                  price={hotel.price}
                  totalPrice={hotel.totalPrice}
                  duration={hotel.duration}
                  checkIn={hotel.checkIn}
                  checkOut={hotel.checkOut}
                  facilities={hotel.facilities}
                />
              ))
            )}
          </div>
        </div>
        {/* Activities Section */}
        <div className="bg-[#0054E4] p-4 rounded-sm mt-6 py-8 w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/activity-icon.png" alt="Activities" className="h-4 w-4" />
              <span className="text-sm text-white font-semibold">Activities</span>
            </div>
            {activities.length > 0 && (
              <Link href="/activity-search">
                <button className="bg-white text-[#0D6EFD] text-xs px-6 py-2 rounded-sm shadow-sm hover:bg-gray-50 transition">
                  Add Activity
                </button>
              </Link>
            )}
          </div>
          <div className="flex flex-col mt-1 space-y-0">
            {activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded-sm py-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/activityy.png" alt="Activity Icon" className="h-24 w-24 mb-4" />
                <span className="text-sm text-[#1D2433] font-semibold mb-4">No Request Yet</span>
                <Link href="/activity-search">
                  <button className="bg-[#0D6EFD] text-white text-xs px-8 py-3 rounded-sm shadow-sm hover:bg-[#0b5ed7] transition">
                    Add Activity
                  </button>
                </Link>
              </div>
            ) : (
              activities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  image={activity.image}
                  name={activity.name}
                  description={activity.description}
                  rating={activity.rating}
                  duration={activity.duration}
                  price={activity.price}
                  schedule={activity.schedule}
                  day={activity.day}
                  count={activity.count}
                  inclusions={activity.inclusions}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;