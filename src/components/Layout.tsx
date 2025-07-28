// travel-app-task/src/components/Layout.tsx
"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';

// Define header menu items with icons
const headerItems = [
  { name: 'Home', path: '/', icon: '/home.png' },
  { name: 'Dashboard', path: '#', icon: '/dashboard.png' },
  { name: 'Wallet', path: '#', icon: '/wallet.png' },
  { name: 'Plan a trip', path: '#', icon: '/plan-a-trip.png' },
  { name: 'Commission for life', path: '#', icon: '/commission-fo-life.png' },
];

// Define sidebar menu items with icons
const sidebarItems = [
  { name: 'Activities', path: '/activity-search', icon: '/activities.png' },
  { name: 'Hotels', path: '/hotel-search', icon: '/hotels.png' },
  { name: 'Flights', path: '/flight-search', icon: '/flights.png' },
  { name: 'Study', path: '#', icon: '/study.png' },
  { name: 'Visa', path: '#', icon: '/visa.png' },
  { name: 'Immigration', path: '#', icon: '/immigration.png' },
  { name: 'Medical', path: '#', icon: '/medical.png' },
  { name: 'Vacation Packages', path: '#', icon: '/vacation.png' },
];

// Define right-side header items with icons
const headerRightItems = [
  { name: 'Notification', path: '#', icon: '/notification.png' },
  { name: 'Carts', path: '#', icon: '/carts.png' },
  { name: 'Create', path: '#', icon: '/create.png' },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at the top with white background, sticking to the top */}
      <header className="bg-white shadow p-4 flex items-center justify-between w-full sticky top-0 z-50">
        {/* Left section: Logo and Search */}
        <div className="flex items-center space-x-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logogo.png" alt="Logo" className="h-8 w-auto" />
          <div className="flex items-center bg-[#F0F2F5] rounded-sm p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/search-icon.png" alt="Search" className="h-4 w-4 mr-1" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm text-gray-600 focus:outline-none w-32 md:w-48"
            />
          </div>
        </div>

        {/* Center section: Navigation links with icons */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          {headerItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center text-xs ${currentPath === item.path ? 'text-[#0D6EFD] font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} alt={`${item.name} icon`} className="h-4 w-4 mb-1" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right section: Divider, Subscribe, Notification, Carts, Create, and Profile */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-px bg-gray-300"></div>
            <button className="bg-[#0D6EFD] text-white text-xs px-4 py-2 rounded-sm flex items-center space-x-1">
              <span>Subscribe</span>
            </button>
            {headerRightItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-600"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt={`${item.name} icon`} className="h-4 w-4 mb-1" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/passport.jpeg" alt="Profile" className="h-6 w-6 rounded-full" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dropdown-icon.png" alt="Dropdown" className="h-3 w-3" />
          </div>
        </div>
      </header>

      {/* Spacer between header and navbar with gray background */}
      <div className="bg-gray-200 h-2"></div>

      <div className="flex flex-1 relative">
        {/* Vertical navbar as sidebar, sticking to the left with independent scrolling */}
        <aside
          className={`bg-white text-gray-600 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:sticky md:top-[82px] w-56 border-r border-gray-200 md:w-48 absolute z-40 overflow-y-auto h-[calc(100vh-82px)] md:h-[calc(100vh-82px)]`}
        >
          <div className="p-4 flex flex-col h-full">
            <nav className="flex-1">
              <ul className="space-y-4">
                {sidebarItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className={`flex items-center p-2 rounded-lg transition-colors text-xs w-full ${
                        currentPath === item.path ? 'bg-[#E7F0FF] text-[#0D6EFD] font-semibold' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.icon} alt={`${item.name} icon`} className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto">
              <div className="bg-[#F0F2F5] p-2 flex items-center space-x-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/go.png" alt="Profile" className="h-8 w-8 rounded" />
                <div className="flex-1">
                  <p className="text-xs text-gray-800">Personal Account</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/updown.png" alt="Dropdown" className="h-3 w-3" />
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar close */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-100 opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto relative">{children}</main>
      </div>
    </div>
  );
};

export default Layout;