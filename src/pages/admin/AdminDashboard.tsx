import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { 
  Users, 
  Heart, 
  Building, 
  AlertTriangle, 
  Activity,
  TrendingUp,
  Calendar,
  MapPin,
  Bell,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock data for charts
  const donationTrends = [
    { month: 'Jan', donations: 120 },
    { month: 'Feb', donations: 150 },
    { month: 'Mar', donations: 180 },
    { month: 'Apr', donations: 160 },
    { month: 'May', donations: 200 },
    { month: 'Jun', donations: 250 }
  ];

  const bloodGroupData = [
    { name: 'O+', value: 35, color: '#EF4444' },
    { name: 'A+', value: 28, color: '#F97316' },
    { name: 'B+', value: 20, color: '#EAB308' },
    { name: 'AB+', value: 8, color: '#22C55E' },
    { name: 'O-', value: 5, color: '#3B82F6' },
    { name: 'A-', value: 2, color: '#8B5CF6' },
    { name: 'B-', value: 1.5, color: '#EC4899' },
    { name: 'AB-', value: 0.5, color: '#6B7280' }
  ];

  const recentRequests = [
    { id: '1', hospital: 'City General Hospital', bloodGroup: 'O-', units: 3, urgency: 'critical', time: '5 mins ago' },
    { id: '2', hospital: 'Regional Medical Center', bloodGroup: 'A+', units: 2, urgency: 'high', time: '12 mins ago' },
    { id: '3', hospital: 'Emergency Care Unit', bloodGroup: 'B+', units: 1, urgency: 'medium', time: '25 mins ago' },
    { id: '4', hospital: 'Community Hospital', bloodGroup: 'AB+', units: 4, urgency: 'low', time: '1 hour ago' },
  ];

  const urgencyColors = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Donors"
            value="2,847"
            icon={Users}
            color="blue"
            trend={{ value: 12, isPositive: true }}
            description="Active registered donors"
          />
          <DashboardCard
            title="Blood Units"
            value="1,234"
            icon={Heart}
            color="red"
            trend={{ value: -5, isPositive: false }}
            description="Available units in stock"
          />
          <DashboardCard
            title="Hospitals"
            value="45"
            icon={Building}
            color="green"
            trend={{ value: 8, isPositive: true }}
            description="Partner hospitals"
          />
          <DashboardCard
            title="Critical Alerts"
            value="12"
            icon={AlertTriangle}
            color="yellow"
            description="Units expiring soon"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Donation Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Donation Trends</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>+15% from last period</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#EF4444', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Blood Group Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Blood Group Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bloodGroupData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bloodGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Distribution']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {bloodGroupData.map((group) => (
                <div key={group.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{group.name}: {group.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <div key={request.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{request.hospital}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</span>
                        <span className="text-sm text-gray-600">Units: {request.units}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{request.time}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${urgencyColors[request.urgency]}`}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              {[
                { icon: Users, title: 'Manage Donors', description: 'Add, edit, or verify donor profiles', color: 'bg-blue-100 text-blue-600' },
                { icon: Heart, title: 'Update Inventory', description: 'Add new blood units or update existing stock', color: 'bg-red-100 text-red-600' },
                { icon: Bell, title: 'Send Notifications', description: 'Alert donors and hospitals about critical needs', color: 'bg-yellow-100 text-yellow-600' },
                { icon: Activity, title: 'System Reports', description: 'Generate detailed analytics and reports', color: 'bg-green-100 text-green-600' },
              ].map((action, index) => (
                <button
                  key={action.title}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};