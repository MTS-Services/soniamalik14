import React, { useState, useRef } from 'react';
import { Camera, Eye, ChevronDown } from 'lucide-react';

const AccountDetails = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop');
  const fileInputRef = useRef(null);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
 
      <div className="dashboardPy dashboardSpaceY">
        
        {/* ACCOUNT SETTING SECTION */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider">Account Setting</h2>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="relative w-40 h-40 flex-shrink-0">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
              <button 
                onClick={handleProfilePictureClick}
                className="absolute bottom-2 right-2 bg-white border border-gray-200 p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Form Fields */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-base text-gray-700">First name</label>
                <input type="text" defaultValue="Kevin" className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600" />
              </div>
              <div className="space-y-1">
                <label className="text-base text-gray-700">Last name</label>
                <input type="text" placeholder="Display name" className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600" />
              </div>
              <div className="space-y-1">
                <label className="text-base text-gray-700">Email</label>
                <input type="email" defaultValue="customer@gmail.com" className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600" />
              </div>
              <div className="space-y-1">
                <label className="text-base text-gray-700">Phone Number</label>
                <input type="text" defaultValue="+1-202-555-0118" className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600" />
              </div>

              {/* Location Selects */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                <div className="space-y-1">
                  <label className="text-base text-gray-700">Region/State</label>
                  <div className="relative">
                    <select className="w-full appearance-none p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600 bg-white">
                      <option>Albama</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-base text-gray-700">City</label>
                  <div className="relative">
                    <select className="w-full appearance-none p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700 font-bold bg-white">
                      <option>Montgomery</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-base text-gray-700">Postcode</label>
                  <input type="text" defaultValue="1000" className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-700 font-bold" />
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-base text-gray-700">Address</label>
                <input type="text" defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D" className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-gray-600" />
              </div>

              <div className="pt-4">
                <button className="bg-[#147A73] text-white px-6 py-2.5 rounded-sm font-bold text-sm uppercase hover:bg-[#0d5e58] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CHANGE PASSWORD SECTION */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wider">Change Password</h2>
          </div>
          
          <div className="p-6 space-y-4 max-w-full">
            <div className="space-y-1">
              <label className="text-base text-gray-700 font-medium">Current Password</label>
              <div className="relative">
                <input 
                  type={showCurrent ? "text" : "password"} 
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600" 
                />
                <Eye 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" 
                  onClick={() => setShowCurrent(!showCurrent)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-base text-gray-700 font-medium">New Password</label>
              <div className="relative">
                <input 
                  type={showNew ? "text" : "password"} 
                  placeholder="8+ characters"
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600 text-sm" 
                />
                <Eye 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-base text-gray-700 font-medium">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirm ? "text" : "password"} 
                  className="w-full p-2.5 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-600" 
                />
                <Eye 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-[#147A73] text-white px-6 py-2.5 rounded-sm font-bold text-sm uppercase hover:bg-[#0d5e58] transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>

      </div>
  
  );
};

export default AccountDetails;