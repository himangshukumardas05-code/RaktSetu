import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PlaceholdersAndVanishInput } from '../../components/ui/placeholders-and-vanish-input';
import { AlertCircle, Phone } from 'lucide-react';

// Types
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

interface BloodRequest {
  id: string;
  bloodGroup: string;
  units: number;
  status: 'Pending' | 'Approved' | 'Fulfilled';
  requestedAt: string;
}

// Constants
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
    urgency: 'high',
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
    urgency: 'medium',
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
    urgency: 'critical',
  },
];

// Reusable Badge
const UrgencyBadge: React.FC<{ urgency: BloodUnit['urgency'] }> = ({ urgency }) => {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${
        colors[urgency] || 'bg-gray-100 text-gray-800 border-gray-200'
      }`}
    >
      {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
    </span>
  );
};

// Main Component
export const BloodSeekerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState<BloodUnit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- Request State ---
  const [neededBloodGroup, setNeededBloodGroup] = useState('');
  const [neededUnits, setNeededUnits] = useState(1);
  const [myRequests, setMyRequests] = useState<BloodRequest[]>([]);

  // Search Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };

  // Blood Request Handler
  const handleRequestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!neededBloodGroup || neededUnits <= 0) return;

    const newRequest: BloodRequest = {
      id: Date.now().toString(),
      bloodGroup: neededBloodGroup,
      units: neededUnits,
      status: 'Pending',
      requestedAt: new Date().toLocaleString(),
    };

    setMyRequests([newRequest, ...myRequests]); // add on top
    setNeededBloodGroup('');
    setNeededUnits(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name || 'Blood Seeker'}
            </h1>
            <p className="text-gray-600 mt-1">Manage your blood search and requests here</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-sm text-gray-500">Total Requests</h3>
            <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-sm text-gray-500">Pending Requests</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {myRequests.filter((r) => r.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="text-sm text-gray-500">Urgent Nearby</h3>
            <p className="text-2xl font-bold text-red-600">1</p>
          </div>
        </div>

        {/* Emergency Section */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span>Emergency Request</span>
          </h2>
          <p className="text-red-700 mb-4">
            Need blood urgently? Use the hotline or create a quick request.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Hotline</span>
            </button>
            <button className="bg-white hover:bg-red-50 text-red-600 border border-red-300 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>Submit Emergency Request</span>
            </button>
          </div>
        </div>

        {/* Request Blood Form */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Request Blood</h2>
          <form onSubmit={handleRequestSubmit} className="flex flex-col md:flex-row gap-4">
            <select
              value={neededBloodGroup}
              onChange={(e) => setNeededBloodGroup(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={neededUnits}
              min={1}
              onChange={(e) => setNeededUnits(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-32"
              placeholder="Units"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* My Requests */}
        {myRequests.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">My Active Requests</h2>
            <div className="space-y-4">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex justify-between items-center border-b pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium">
                      {req.bloodGroup} • {req.units} units
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested at {req.requestedAt}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      req.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : req.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PlaceholdersAndVanishInput
              placeholders={[
                'Search O+ blood near me...',
                'Find A- blood in City Hospital...',
              ]}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSubmit}
            />
            <div className="flex gap-4">
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">All Locations</option>
                <option value="downtown">Downtown</option>
                <option value="uptown">Uptown</option>
              </select>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {isLoading && (
          <div className="text-center py-12 text-gray-600">Searching...</div>
        )}

        {searchResults.length > 0 && !isLoading && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Found {searchResults.length} results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((res) => (
                <div
                  key={res.id}
                  className="bg-white rounded-xl shadow p-6 border"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{res.hospital}</h3>
                    <UrgencyBadge urgency={res.urgency} />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {res.location} • {res.distance} km
                  </p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong>Blood Group:</strong> {res.bloodGroup}
                    </p>
                    <p>
                      <strong>Units:</strong> {res.unitsAvailable}
                    </p>
                    <p className="text-sm text-gray-500">
                      Updated {res.lastUpdated}
                    </p>
                  </div>
                  <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                    Request Blood
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
