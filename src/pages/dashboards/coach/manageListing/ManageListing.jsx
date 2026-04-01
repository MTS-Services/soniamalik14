import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const ManageListing = () => {
  // Real Dummy Data with Images
  const allListings = [
    { id: 1, category: 'Cricket', title: 'Woking Warriors FC', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486', days: 'Monday, Wednesday', time: '19:00 - 21:00', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&q=80' },
    { id: 2, category: 'Tennis', title: 'Beginner Basics Boot Camp', address: '8502 Preston Rd. Inglewood, Maine 98380', days: 'Tuesday, Thursday', time: '10:00 - 12:00', image: 'https://images.unsplash.com/photo-1595435064219-c78ec4602f23?w=500&q=80' },
    { id: 3, category: 'Football', title: 'Weekly 5-a-Side Session', address: '1901 Thornridge Cir. Shiloh, Hawaii 81063', days: 'Friday, Sunday', time: '18:00 - 20:00', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80' },
    { id: 4, category: 'Cricket', title: 'Elite Cricket Academy', address: '4517 Washington Ave. Kentucky 39495', days: 'Mon, Tue, Wed', time: '15:00 - 17:00', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=500&q=80' },
    { id: 5, category: 'Tennis', title: 'Pro Tennis Training', address: '2118 Thornridge Cir. Syracuse, Connecticut', days: 'Saturday', time: '09:00 - 11:00', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?w=500&q=80' },
    { id: 6, category: 'Football', title: 'Junior Football League', address: '3891 Ranchview Dr. Richardson, California', days: 'Daily', time: '16:00 - 18:00', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&q=80' },
    { id: 7, category: 'Rugby', title: 'Rugby Union Practice', address: '4140 Parker Rd. Allentown, New Mexico', days: 'Wed, Fri', time: '17:00 - 19:00', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80' },
    { id: 8, category: 'Basketball', title: 'Street Ballers Club', address: '2715 Ash Dr. San Jose, South Dakota', days: 'Weekends', time: '18:00 - 21:00', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80' },
    { id: 9, category: 'Swimming', title: 'Morning Swim Laps', address: '6391 Elgin St. Celina, Delaware', days: 'Mon to Fri', time: '06:00 - 08:00', image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=500&q=80' },
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allListings.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allListings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="dashboardPy dashboardSpaceY">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage your Listings</h1>
        <button className="flex items-center gap-2 bg-[#007A70] text-white px-4 py-2 rounded-lg hover:bg-[#00665e] transition-colors font-medium">
          <Plus size={18} />
          Add New Listing
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[500px]">
        {currentItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col h-full">
            {/* Card Image Area */}
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#007A70] uppercase shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Card Content */}
            <div className="space-y-3 flex-grow">
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gray-400" />
                  <span className="line-clamp-2">{item.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="flex-shrink-0 text-gray-400" />
                  <span>{item.days}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="flex-shrink-0 text-gray-400" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 mt-auto">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#007A70] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#00665e] transition-colors">
                <Edit3 size={16} />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#E6F4F3] text-[#007A70] py-2.5 rounded-lg text-sm font-medium hover:bg-[#d1e9e7] transition-colors border border-[#B8DEDC]">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="mt-10 flex justify-center items-center gap-2">
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded border transition-colors ${currentPage === 1 ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          <ChevronLeft size={18} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded transition-all font-bold text-sm border ${
              currentPage === i + 1 
              ? 'bg-[#007A70] text-white border-[#007A70] shadow-md' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#007A70]'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded border transition-colors ${currentPage === totalPages ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ManageListing;