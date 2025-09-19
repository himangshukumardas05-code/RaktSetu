export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'donor' | 'seeker' | 'hospital';
  verified: boolean;
  createdAt: string;
  profile?: DonorProfile | HospitalProfile;
}

export interface DonorProfile {
  bloodGroup: BloodGroup;
  dateOfBirth: string;
  weight: number;
  lastDonation?: string;
  eligibleNext?: string;
  totalDonations: number;
  address: string;
  emergencyContact: string;
}

export interface HospitalProfile {
  hospitalName: string;
  license: string;
  address: string;
  contactPerson: string;
  capacity: number;
  specialties: string[];
}
// src/types/index.ts
// src/types.ts

// Add this export line 👇
export type Role = 'admin' | 'donor' | 'hospital' | 'seeker';

// Your other types...
export interface DonorProfile {
  
  dateOfBirth: string;
  // ...
}

export interface User {
  id: string;
  name: string;
  role: Role; // This now correctly refers to the exported type
  // ...
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Urgency = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'pending' | 'approved' | 'fulfilled' | 'rejected';

export interface Request {
  id: string;
  bloodGroup: BloodGroup;
  units: number;
  urgency: Urgency;
  status: Status;
  requestDate: string;
  patientId: string;
  department: string;
}

export interface InventoryItem {
  bloodGroup: BloodGroup;
  available: number;
  reserved: number;
  expiring: number;
}

export interface BloodUnit {
  id: string;
  bloodGroup: BloodGroup;
  batchId: string;
  donorId: string;
  donorName: string;
  collectionDate: string;
  expiryDate: string;
  status: 'available' | 'reserved' | 'expired' | 'used';
  location: string;
  volume: number;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterType: 'hospital' | 'seeker';
  bloodGroup: BloodGroup;
  unitsRequested: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  createdAt: string;
  approvedBy?: string;
  fulfilledAt?: string;
  notes?: string;
}

export interface InventoryStats {
  totalUnits: number;
  expiringUnits: number;
  availableByGroup: Record<BloodGroup, number>;
  lowStockGroups: BloodGroup[];
}

export interface DashboardStats {
  totalDonors: number;
  totalRequests: number;
  activeRequests: number;
  completedRequests: number;
  totalHospitals: number;
  inventoryStats: InventoryStats;
}