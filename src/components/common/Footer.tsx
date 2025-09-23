import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../../images/LogoFinal-removebg-preview.png'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center  mb-4">
              <img src={Logo} alt="" className='h-[7vh] w-[vw] object-contain'/>
              <span className="text-2xl font-bold">RaktSetu</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Connecting donors, blood banks, and hospitals to save lives through efficient blood management and real-time tracking.
            </p>
          </div>

          
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 RaktSetu. All rights reserved. |Tracking Blood through technology.</p>
        </div>
      </div>
    </footer>

  );
};