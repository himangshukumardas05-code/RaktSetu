import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import { 
  Building, 
  Heart, 
  Clock,
  Package,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BloodGroup } from '../../types';

export const HospitalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const recentRequests = [
    { 
      id: '1', 
      bloodGroup: 'O-' as BloodGroup, 
      units: 3, 
      urgency: 'critical', 
      status: 'pending',
      requestDate: '2024-01-28',
      patientId: 'P001',
      department: 'Emergency'
    },
    { 
      id: '2', 
      bloodGroup: 'A+' as BloodGroup, 
      units: 2, 
      urgency: 'high', 
      status: 'approved',
      requestDate: '2024-01-28',
      patientId: 'P002',
      department: 'Surgery'
    },
    { 
      id: '3', 
      bloodGroup: 'B+' as BloodGroup, 
      units: 1, 
      urgency: 'medium', 
      status: 'fulfilled',
      requestDate: '2024-01-27',
      patientId: 'P003',
      department: 'ICU'
    }
  ];

  const inventory = [
    { bloodGroup: 'A+' as BloodGroup, available: 12, reserved: 3, expiring: 1 },
    { bloodGroup: 'A-' as BloodGroup, available: 8, reserved: 1, expiring: 0 },
    { bloodGroup: 'B+' as BloodGroup, available: 15, reserved: 2, expiring: 2 },
    { bloodGroup: 'B-' as BloodGroup, available: 5, reserved: 0, expiring: 1 },
    { bloodGroup: 'AB+' as BloodGroup, available: 7, reserved: 1, expiring: 0 },
    { bloodGroup: 'AB-' as BloodGroup, available: 3, reserved: 0, expiring: 0 },
    { bloodGroup: 'O+' as BloodGroup, available: 20, reserved: 5, expiring: 3 },
    { bloodGroup: 'O-' as BloodGroup, available: 6, reserved: 2, expiring: 1 }
  ];

  const urgencyColors = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    fulfilled: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    fulfilled: Package,
    rejected: XCircle
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
              <p className="text-gray-600">City General Hospital - {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Request</span>
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Active Requests"
            value="8"
            icon={FileText}
            color="blue"
            trend={{ value: 12, isPositive: true }}
            description="Pending blood requests"
          />
          <DashboardCard
            title="Inventory Units"
            value="76"
            icon={Heart}
            color="red"
            trend={{ value: -3, isPositive: false }}
            description="Total blood units"
          />
          <DashboardCard
            title="Critical Alerts"
            value="4"
            icon={AlertTriangle}
            color="yellow"
            description="Low stock warnings"
          />
          <DashboardCard
            title="This Month"
            value="32"
            icon={Package}
            color="green"
            trend={{ value: 18, isPositive: true }}
            description="Units received"
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'requests', label: 'Blood Requests' },
                { id: 'inventory', label: 'Inventory' },
                { id: 'reports', label: 'Reports' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentRequests.slice(0, 3).map((request) => {
                  const StatusIcon = statusIcons[request.status];
                  return (
                    <div key={request.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Heart className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {request.bloodGroup} - {request.units} units
                            </h4>
                            <p className="text-sm text-gray-600">
                              {request.department} • Patient {request.patientId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${urgencyColors[request.urgency]}`}>
                            {request.urgency}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[request.status]}`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Inventory Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Blood Inventory</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {inventory.slice(0, 8).map((item) => (
                    <div key={item.bloodGroup} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{item.bloodGroup}</p>
                        <p className="text-sm text-gray-600">{item.available} available</p>
                      </div>
                      {item.expiring > 0 && (
                        <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {item.expiring} expiring
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'requests' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Blood Requests</h3>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  New Request
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-semibold text-red-600">{request.bloodGroup}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.units}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${urgencyColors[request.urgency]}`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[request.status]}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {request.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-4">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'inventory' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Blood Inventory Management</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {inventory.map((item) => (
                  <div key={item.bloodGroup} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-red-600">{item.bloodGroup}</h4>
                      {item.expiring > 0 && (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-medium">{item.available}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Reserved:</span>
                        <span className="font-medium">{item.reserved}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Expiring:</span>
                        <span className={`font-medium ${item.expiring > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {item.expiring}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};