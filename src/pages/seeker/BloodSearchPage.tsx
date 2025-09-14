import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Filter, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { BloodGroup } from '../../types';
import { PlaceholdersAndVanishInput } from '../../components/ui/placeholders-and-vanish-input';
import { AnimatedTooltip } from '../../components/ui/animated-tooltip';
import { FollowerPointerCard } from '../../components/ui/following-pointer';

export const BloodSearchPage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    bloodGroup: '' as BloodGroup | '',
    location: '',
    urgency: '',
    radius: '10'
  });

  const [searchResults, setSearchResults] = useState([
    { 
      id: '1', 
      bloodGroup: 'O+', 
      units: 5, 
      location: 'City General Hospital', 
      distance: '2.3 km',
      contact: '+1-234-567-8901',
      availability: 'Immediate',
      lastUpdated: '5 mins ago'
    },
    { 
      id: '2', 
      bloodGroup: 'O+', 
      units: 3, 
      location: 'Regional Blood Bank', 
      distance: '4.1 km',
      contact: '+1-234-567-8902',
      availability: 'Within 2 hours',
      lastUpdated: '15 mins ago'
    },
    { 
      id: '3', 
      bloodGroup: 'O+', 
      units: 2, 
      location: 'Community Health Center', 
      distance: '6.7 km',
      contact: '+1-234-567-8903',
      availability: 'Same day',
      lastUpdated: '1 hour ago'
    },
  ]);

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const urgencyLevels = [
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' }
  ];

  const placeholders = [
    "Search for O+ blood in your area...",
    "Find A- blood units near me...",
    "Emergency B+ blood needed...",
    "Locate AB- blood donors...",
    "Search blood banks in city center...",
  ];

  const recentDonors = [
    {
      id: 1,
      name: "John Smith",
      designation: "O+ Donor",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      designation: "A+ Donor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      name: "Mike Davis",
      designation: "B- Donor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      name: "Emily Chen",
      designation: "AB+ Donor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const handleSearch = () => {
    // Simulate search - in real app this would call an API
    console.log('Searching with filters:', searchFilters);
  };

  const handleEmergencyRequest = (result: any) => {
    // Handle emergency blood request
    alert(`Emergency request sent to ${result.location} for ${result.bloodGroup} blood`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search query:', e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl font-bold mb-4">Find Blood When You Need It</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Search for available blood units near you. Get real-time information and make emergency requests instantly.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mt-8">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
            </div>

            {/* Recent Donors */}
            <div className="mt-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Users className="h-5 w-5" />
                <span className="text-lg font-medium">Recent Donors</span>
              </div>
              <AnimatedTooltip items={recentDonors} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Search for Blood</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group *
              </label>
              <select
                value={searchFilters.bloodGroup}
                onChange={(e) => setSearchFilters({ ...searchFilters, bloodGroup: e.target.value as BloodGroup })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select blood group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter city or zip code"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                value={searchFilters.urgency}
                onChange={(e) => setSearchFilters({ ...searchFilters, urgency: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select urgency</option>
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Radius
              </label>
              <select
                value={searchFilters.radius}
                onChange={(e) => setSearchFilters({ ...searchFilters, radius: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="25">Within 25 km</option>
                <option value="50">Within 50 km</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSearch}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search Blood Units</span>
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              🚨 Emergency Request
            </button>
          </div>
        </motion.div>

        {/* Search Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Available Blood Units ({searchResults.length} results)
            </h3>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <Filter className="h-4 w-4" />
              <span>Filter Results</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {searchResults.map((result, index) => (
              <FollowerPointerCard
                key={result.id}
                title={
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{result.bloodGroup} Available</span>
                  </div>
                }
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                          <Heart className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{result.location}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{result.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{result.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Blood Group</p>
                          <p className="text-lg font-semibold text-red-600">{result.bloodGroup}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Units Available</p>
                          <p className="text-lg font-semibold text-gray-900">{result.units}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Availability</p>
                          <p className="text-lg font-semibold text-green-600">{result.availability}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact</p>
                          <a href={`tel:${result.contact}`} className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                            {result.contact}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => handleEmergencyRequest(result)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Request Now</span>
                      </button>
                      <button className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </FollowerPointerCard>
            ))}
          </div>
        </div>

        {/* Enhanced Emergency Contact */}
        <FollowerPointerCard
          title={
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚨</span>
              <span>Emergency Blood Request</span>
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Need Emergency Blood?</h3>
            <p className="text-lg opacity-90 mb-6">
              For critical emergencies, call our 24/7 hotline for immediate assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:911"
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                🚨 Call 911
              </a>
              <a
                href="tel:+1234567890"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
              >
                📞 Blood Hotline
              </a>
            </div>
          </motion.div>
        </FollowerPointerCard>
      </div>
    </div>
  );
};
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{result.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Blood Group</p>
                        <p className="text-lg font-semibold text-red-600">{result.bloodGroup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Units Available</p>
                        <p className="text-lg font-semibold text-gray-900">{result.units}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Availability</p>
                        <p className="text-lg font-semibold text-green-600">{result.availability}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <a href={`tel:${result.contact}`} className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                          {result.contact}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => handleEmergencyRequest(result)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Request Now</span>
                    </button>
                    <button className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Need Emergency Blood?</h3>
          <p className="text-lg opacity-90 mb-6">
            For critical emergencies, call our 24/7 hotline for immediate assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:911"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              🚨 Call 911
            </a>
            <a
              href="tel:+1234567890"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              📞 Blood Hotline
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};