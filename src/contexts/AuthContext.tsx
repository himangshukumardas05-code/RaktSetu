// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types'; // Import the newly defined types

// 1. Define the shape of the context data
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: Role) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>; // 'any' kept for flexibility with different registration data
  loading: boolean;
}

// 2. Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 4. Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Effect to check for a logged-in user in localStorage on initial app load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('bloodbank_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('bloodbank_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, role: Role): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate an API call to authenticate the user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role for demonstration
      const mockUser: User = {
        id: '1',
        name: role === 'admin' ? 'Admin User' : 
              role === 'donor' ? 'John Donor' :
              role === 'hospital' ? 'City Hospital' : 'Blood Seeker',
        email,
        phone: '+1234567890',
        role, // Use the role directly, no need for 'as any'
        verified: true,
        createdAt: new Date().toISOString(),
      };

      if (role === 'donor') {
        mockUser.profile = {
          bloodGroup: 'O+',
          dateOfBirth: '1990-01-01',
          weight: 70,
          totalDonations: 5,
          address: '123 Main St, City',
          emergencyContact: '+9876543210',
          eligibleNext: '2025-12-01' // Updated date
        };
      }

      setUser(mockUser);
      localStorage.setItem('bloodbank_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This part assumes registration data comes from a source like Google Auth
      if (userData.name && userData.email && userData.role) {
        const newUser: User = {
          id: Date.now().toString(), // Simple unique ID
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '+1234567890', // Default phone
          role: userData.role,
          verified: true,
          createdAt: new Date().toISOString(),
        };
        
        setUser(newUser);
        localStorage.setItem('bloodbank_user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bloodbank_user');
  };

  const value = { user, login, logout, register, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};