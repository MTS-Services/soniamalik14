import React, { useState } from 'react';
import ListingHeader from './components/ListingHeader';
import ListingCard from './components/ListingCard';
import ListingPagination from './components/ListingPagination';
import CreateRecruitmentModal from '../../../../components/ui/CreateRecruitmentModal';

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

    // Modal state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allListings.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleAddListing = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditListing = (id) => {
        console.log('Edit listing:', id);
        // TODO: Open edit listing modal with listing data
    };

    const handleDeleteListing = (id) => {
        console.log('Delete listing:', id);
        // TODO: Delete listing confirmation
    };

    return (
        <div className="dashboardPy dashboardSpaceY">
            {/* Header Section */}
            <ListingHeader onAddClick={handleAddListing} />

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[500px]">
                {currentItems.map((item) => (
                    <ListingCard
                        key={item.id}
                        listing={item}
                        onEdit={handleEditListing}
                        onDelete={handleDeleteListing}
                    />
                ))}
            </div>

            {/* Pagination Section */}
            <ListingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Create Recruitment Modal */}
            <CreateRecruitmentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                mode="create"
            />
        </div>
    );
};

export default ManageListing;