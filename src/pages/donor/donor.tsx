import React, { useState } from 'react';

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  History,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  Droplet,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface NavItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
}

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  collapsed: boolean;
}

interface MainContentProps {
  activePage: string;
}

export default function DonorPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Profile', icon: User },
    { name: 'Donation History', icon: History },
    { name: 'Schedule Donation', icon: Calendar },
    { name: 'Educational Resources', icon: BookOpen },
  ];

  const bottomMenuItems = [{ name: 'Settings', icon: Settings }];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`flex flex-col backdrop-blur-lg bg-white/30 border-r border-white/20 shadow-lg transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header with toggle */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`flex items-center gap-2 overflow-hidden transition-all ${collapsed ? 'w-0' : 'w-auto'}`}>
            <Droplet className="text-red-600 flex-shrink-0" size={28} />
            <span className="text-xl font-bold text-red-600 whitespace-nowrap">BloodLine</span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/20 transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 mt-6 space-y-2">
          {menuItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={activePage === item.name}
              onClick={() => setActivePage(item.name)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Bottom items and Logout */}
        <div className="border-t border-white/20 p-3">
          {bottomMenuItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={activePage === item.name}
              onClick={() => setActivePage(item.name)}
              collapsed={collapsed}
            />
          ))}
          <div className="mt-3">
            <Tooltip text="Logout" collapsed={collapsed}>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-600/10 hover:text-red-700 transition"
              >
                <LogOut size={20} />
                {!collapsed && <span className="flex-1">Logout</span>}
              </button>
            </Tooltip>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <MainContent activePage={activePage} />
    </div>
  );
}

// Navigation Item
function NavItem({ item, isActive, onClick, collapsed }: NavItemProps) {
  return (
    <Tooltip text={item.name} collapsed={collapsed}>
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition ${
          isActive
            ? 'bg-red-600 text-white shadow-md'
            : 'text-gray-700 hover:bg-white/30 hover:text-red-600'
        }`}
      >
        <item.icon size={20} />
        {!collapsed && <span className="flex-1 text-left">{item.name}</span>}
      </button>
    </Tooltip>
  );
}

// Tooltip
function Tooltip({ children, text, collapsed }: TooltipProps) {
  if (!collapsed) return <>{children}</>;
  return (
    <div className="relative group">
      {children}
      <div
        className="absolute left-full rounded-md px-2 py-1 ml-3
        backdrop-blur-md bg-gray-900/80 text-white text-xs
        opacity-0 translate-x-[-10px] transition-all
        group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-20"
      >
        {text}
      </div>
    </div>
  );
}

// Main Content
function MainContent({ activePage }: MainContentProps) {
  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome, Donor!</h2>
            <p className="text-gray-600 mt-1">Here’s your donation activity summary.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-red-600">Next Appointment</h3>
                <p className="text-gray-800 mt-2">October 25, 2025</p>
              </div>
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-red-600">Total Donations</h3>
                <p className="text-gray-800 mt-2">12 Pints</p>
              </div>
              <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-red-600">Eligibility</h3>
                <p className="text-green-600 font-semibold mt-2">Eligible to donate</p>
              </div>
            </div>

            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg mt-6">
              <h3 className="font-bold text-red-600 mb-4">Donation History</h3>
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Donations",
                      data: [1, 2, 3, 2, 4, 5],
                      borderColor: "rgb(220,38,38)",
                      backgroundColor: "rgba(220,38,38,0.3)"
                    }
                  ]
                }}
              />
            </div>
          </div>
        );
      case 'My Profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <User size={40} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">Alex Chen</h2>
                <p className="text-gray-600">Donor ID: BL-2024-00123</p>
              </div>
            </div>

            {/* Core Information */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="mt-1 text-gray-900">Alex Chen</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Droplet className="text-red-600" size={20} />
                    <span className="text-gray-900 font-semibold">O+</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">alex.chen@email.com</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-gray-900">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-gray-900">New York, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Donation-Specific Details */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Donation</label>
                  <p className="mt-1 text-gray-900">March 15, 2024</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Eligibility</label>
                  <p className="mt-1 text-green-600 font-semibold">June 15, 2024</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                  <p className="mt-1 text-gray-900">Jane Chen - (555) 987-6543</p>
                </div>
              </div>
            </div>

            {/* Settings & Preferences */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">SMS Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Push Notifications</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>

            {/* Password & Security */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h3>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="space-y-6">
            {/* Account Management */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
              <div className="space-y-4">
                <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors">
                  Change Password
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">
                  Update Contact Info
                </button>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">
                  Deactivate Account
                </button>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Appointment Reminders (Push)</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Donation Eligibility (Push)</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Urgent Local Needs (Push)</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Appointment Reminders (Email)</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Donation Eligibility (Email)</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Urgent Local Needs (Email)</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Critical SMS Alerts</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>

            {/* Privacy & Data */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Data</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Location Services</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <a href="/privacy-policy" className="block text-red-600 hover:underline">
                  Privacy Policy
                </a>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors">
                  Download My Data
                </button>
              </div>
            </div>

            {/* Application */}
            <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 mb-1">Appearance</label>
                  <select className="w-full rounded border border-gray-300 p-2">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System Default</option>
                  </select>
                </div>
                <div>
                  <a href="/help" className="text-red-600 hover:underline block mb-2">Help & Support</a>
                  <a href="/about" className="text-red-600 hover:underline block">About (v1.0.0)</a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="backdrop-blur-lg bg-white/30 border border-white/20 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">{activePage}</h2>
            <p className="text-gray-600 mt-2">Content for {activePage} goes here.</p>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 p-6 md:p-10 overflow-y-auto">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">{activePage}</h1>
      </header>
      <div className="mt-8">{renderContent()}</div>
    </main>
  );
}
