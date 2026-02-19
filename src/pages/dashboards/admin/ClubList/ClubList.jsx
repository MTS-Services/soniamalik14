import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import ClubCard from '../../../../components/ui/ClubCard';
import Pagination from '../../../../components/ui/Pagination';
import ClubDetails from './ClubDetails';

export default function ClubList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const clubs = [
    {
      id: 1,
      name: 'Thunder Sports Club',
      owner: 'Ariane McCoy',
      phone: '(704) 555-0127',
      location: '6301 Elgin St. Catina, Delaware 10239'
    },
    {
      id: 2,
      name: 'Rising Stars Club',
      owner: 'Albert Flores',
      phone: '(201) 555-0124',
      location: '2464 Royal Ln. Mesa, New Jersey 42463'
    },
    {
      id: 3,
      name: 'Victory Sports Club',
      owner: 'Dianne Bussell',
      phone: '(907) 555-0101',
      location: '8502 Preston Rd. Inglewood, Maine 98380'
    },
    {
      id: 4,
      name: 'PowerShot Club',
      owner: 'Floqa Milles',
      phone: '(884) 555-0102',
      location: '3991 Ranchview, Dr. Richardson, California 82639'
    },
    {
      id: 5,
      name: 'Champions Circle',
      owner: 'Jane Cooper',
      phone: '(229) 555-0109',
      location: '2118 Thornridge Cir. Syracuse, Connecticut 35624'
    },
    {
      id: 6,
      name: 'NextGen Sports Club',
      owner: 'Devon Lane',
      phone: '(238) 555-0108',
      location: '4140 Parker Rd. Allentown, New Mexico 31134'
    },
    {
      id: 7,
      name: 'United Athletes Club',
      owner: 'Guy Hawkins',
      phone: '(303) 555-0105',
      location: '4140 Parker Rd. Allentown, New Mexico 31134'
    },
    {
      id: 8,
      name: 'Royal Strikers CC',
      owner: 'Bessie Cooper',
      phone: '(671) 555-0110',
      location: '1901 Thornridge Cir. Shiloh, Hawaii 81063'
    },
    {
      id: 9,
      name: 'Blue Tigers Cricket Club',
      owner: 'Annette Black',
      phone: '(405) 555-0128',
      location: '3517 W. Gray St. Utica, Pennsylvania 57867'
    },
    {
      id: 10,
      name: 'City Warriors CC',
      owner: 'Robert Fox',
      phone: '(629) 555-0129',
      location: '4517 Washington Ave. Manchester, Kentucky 54930'
    },
    {
      id: 11,
      name: 'Super Eleven Club',
      owner: 'Dariene Robertson',
      phone: '(702) 555-0122',
      location: '2972 Westheimer Rd. Santa Ana, Illinois 85486'
    },
    {
      id: 12,
      name: 'Rapid Strikers FC',
      owner: 'Jenny Wilson',
      phone: '(808) 555-0111',
      location: '2715 Ash Dr. San Jose, South Dakota 83475'
    }
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(clubs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClubs = clubs.slice(startIndex, startIndex + itemsPerPage);

  const columns = [
    { key: 'name', label: 'Club Name' },
    { key: 'owner', label: 'Club Owner Name' },
    { key: 'phone', label: 'Phone Numbers' },
    { key: 'location', label: 'Location' },
    { key: 'actions', label: 'Actions' }
  ];

  const renderRow = (club) => (
    <>
      <td className="px-4 py-4 text-base text-[#674E43]">{club.name}</td>
      <td className="px-4 py-4 text-base text-[#674E43]">{club.owner}</td>
      <td className="px-4 py-4 text-base text-[#674E43]">{club.phone}</td>
      <td className="px-4 py-4 text-base text-[#674E43]">{club.location}</td>
      <td className="px-4 py-4">
        <button
        onClick={() => setSelectedProduct(club)}
        className="text-black transition-colors">
          <Eye size={20} />
        </button>
      </td>
    </>
  );
  if (selectedProduct) {
    return (
      <ClubDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Club List</h1>

        <div className="hidden md:block">
          <div className="bg-white rounded-t-lg overflow-hidden shadow-sm">
            <Table columns={columns} data={currentClubs} renderRow={renderRow} />
          </div>

          {/* Desktop Pagination */}
          <div >
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={clubs.length}
              resultsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

      </div>



        {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {currentClubs.map((club) => (
          <ClubCard key={club.id} club={club} onView={() => setSelectedProduct(club)} />
        ))}

        <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />
      </div>
    </div>
  );
}