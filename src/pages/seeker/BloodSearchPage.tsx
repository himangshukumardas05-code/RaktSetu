import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PlaceholdersAndVanishInput } from '../../components/ui/placeholders-and-vanish-input';
import { AnimatedTooltip } from '../../components/ui/animated-tooltip';
import { FollowerPointerCard } from '../../components/ui/following-pointer';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  Filter,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

interface BloodUnit {
  id: string;
  bloodGroup: string;
  unitsAvailable: number;
  location: string;
  distance: number;
  hospital: string;
  contact: string;
  lastUpdated: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface Donor {
  id: number;
  name: string;
  designation: string;
  image: string;
  bloodGroup: string;
  lastDonation: string;
}

export const BloodSearchPage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState<BloodUnit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const placeholders = [
    "Search for O+ blood near me...",
    "Find A- blood units in emergency...",
    "Locate B+ blood in City Hospital...",
    "Search AB- blood within 10km...",
    "Find compatible blood for surgery...",
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const recentDonors: Donor[] = [
    {
      id: 1,
      name: "John Smith",
      designation: "O+ Donor",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bloodGroup: "O+",
      lastDonation: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      designation: "A- Donor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bloodGroup: "A-",
      lastDonation: "1 week ago"
    },
    {
      id: 3,
      name: "Mike Chen",
      designation: "B+ Donor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bloodGroup: "B+",
      lastDonation: "3 days ago"
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "AB+ Donor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      bloodGroup: "AB+",
      lastDonation: "5 days ago"
    }
  ];

  const mockResults: BloodUnit[] = [
    {
      id: '1',
      bloodGroup: 'O+',
      unitsAvailable: 15,
      location: 'Downtown Medical Center',
      distance: 2.3,
      hospital: 'City General Hospital',
      contact: '+1 (555) 123-4567',
      lastUpdated: '2 hours ago',
      urgency: 'high'
    },
    {
      id: '2',
      bloodGroup: 'O+',
      unitsAvailable: 8,
      location: 'Regional Blood Bank',
      distance: 4.1,
      hospital: 'Regional Medical Center',
      contact: '+1 (555) 987-6543',
      lastUpdated: '1 hour ago',
      urgency: 'medium'
    },
    {
      id: '3',
      bloodGroup: 'O+',
      unitsAvailable: 3,
      location: 'Emergency Care Unit',
      distance: 6.7,
      hospital: 'Emergency Hospital',
      contact: '+1 (555) 456-7890',
      lastUpdated: '30 minutes ago',
      urgency: 'critical'
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const TitleComponent = ({ title, bloodGroup }: { title: string; bloodGroup: string }) => (
    <div className="flex items-center space-x-2">
      <Heart className="h-4 w-4 text-red-500" />
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">{bloodGroup}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Blood</h1>
              <p className="text-gray-600 mt-1">Search for available blood units near you</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Recent Donors</span>
              </div>
              <AnimatedTooltip items={recentDonors} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleSearch}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Blood Groups</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Locations</option>
              <option value="downtown">Downtown</option>
              <option value="uptown">Uptown</option>
              <option value="suburbs">Suburbs</option>
            </select>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
              <span className="text-gray-600">Searching for blood units...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !isLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Found {searchResults.length} blood units
              </h2>
              <div className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FollowerPointerCard
                    title={
                      <TitleComponent 
                        title={result.hospital} 
                        bloodGroup={result.bloodGroup}
                      />
                    }
                  >
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{result.hospital}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{result.location}</span>
                            <span className="text-sm text-gray-500">• {result.distance} km</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(result.urgency)}`}>
                          {result.urgency.charAt(0).toUpperCase() + result.urgency.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Blood Group:</span>
                          <span className="font-semibold text-red-600 text-lg">{result.bloodGroup}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Units Available:</span>
                          <span className="font-semibold text-green-600">{result.unitsAvailable}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Last Updated:</span>
                          <span className="text-sm text-gray-500">{result.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                          <Heart className="h-4 w-4" />
                          <span>Request Blood</span>
                        </button>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>Call</span>
                          </button>
                          <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>Directions</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </FollowerPointerCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Section */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-red-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Blood Request</h3>
              <p className="text-red-700 mb-4">
                Need blood urgently? Our emergency hotline is available 24/7 to help you find compatible blood units immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Emergency Hotline</span>
                </button>
                <button className="bg-white hover:bg-red-50 text-red-600 border border-red-300 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Submit Emergency Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};