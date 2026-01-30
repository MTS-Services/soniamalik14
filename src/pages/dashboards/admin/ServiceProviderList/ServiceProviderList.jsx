import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import TablePagination from '../../../../components/ui/TablePagination';
import Table from '../../../../components/ui/Table';

export default function ServiceProviderList() {
  const [currentPage, setCurrentPage] = useState(1);

  const providers = [
    {
      id: 1,
      name: 'HealX Physio Clinic',
      owner: 'Ariene McCoy',
      service: 'Physio',
      phone: '(505) 555-0125',
    },
    {
      id: 2,
      name: 'HealX Physio Clinic',
      owner: 'Albert Flores',
      service: 'Mental Health',
      phone: '(205) 555-0100',
    },
    {
      id: 3,
      name: 'HealX Physio Clinic',
      owner: 'Dianne Russell',
      service: 'Nutrition',
      phone: '(208) 555-0112',
    },
    {
      id: 4,
      name: 'HealX Physio Clinic',
      owner: 'Floyd Miles',
      service: 'Physios',
      phone: '(225) 555-0118',
    },
    {
      id: 5,
      name: 'HealX Physio Clinic',
      owner: 'Jane Cooper',
      service: 'Mental Health',
      phone: '(270) 555-0117',
    },
    {
      id: 6,
      name: 'HealX Physio Clinic',
      owner: 'Devon Lane',
      service: 'Physios',
      phone: '(229) 555-0109',
    },
    {
      id: 7,
      name: 'HealX Physio Clinic',
      owner: 'Guy Hawkins',
      service: 'Mental Health',
      phone: '(307) 555-0133',
    },
    {
      id: 8,
      name: 'HealX Physio Clinic',
      owner: 'Bessie Cooper',
      service: 'Physios',
      phone: '(252) 555-0126',
    },
    {
      id: 9,
      name: 'HealX Physio Clinic',
      owner: 'Annette Black',
      service: 'Mental Health',
      phone: '(907) 555-0101',
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(providers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedProviders = providers.slice(startIdx, startIdx + itemsPerPage);





  const columns = [
    'Provider Name',
    'Owner',
    'Service',
    'Phone',
    'Actions'
  ];

  const renderProviderRow = (provider) => (
    <>
      <td className="px-4 py-4 text-base text-[#674E43] font-medium">{provider.name}</td>
      <td className="px-4 py-4 text-base text-[#674E43]">{provider.owner}</td>
      <td className="px-4 py-4 text-base text-[#674E43]">{provider.service}</td>
      <td className="px-4 py-4 text-base text-[#674E43]">{provider.phone}</td>
      <td className="px-4 py-4 text-left">
        <button
          className="inline-flex items-start justify-start p-2 text-black hover:bg-slate-200 rounded-md transition-colors"
          title="View details"
        >
          <Eye size={20} />
        </button>
      </td>
    </>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className=" ">
        {/* Header */}
       
      <DashboardHeader title="Service Provider List" />

        {/* Table Container */}
        <div className="overflow-x-auto">
          <Table columns={columns} data={displayedProviders} renderRow={renderProviderRow} />
        </div>

        {/* Footer with Pagination */}
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={providers.length}
            resultsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        
      </div>
    </div>
  );
}