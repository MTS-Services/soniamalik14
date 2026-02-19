import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import TablePagination from '../../../../components/ui/TablePagination';
import Table from '../../../../components/ui/Table';

export default function ServiceProviderList() {
  const navigate = useNavigate();
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
          onClick={() => navigate(`/admin/service/${provider.id}`)}
          className="inline-flex items-start justify-start p-2 text-black hover:bg-slate-200 rounded-md transition-colors"
          title="View details"
        >
          <Eye size={20} />
        </button>
      </td>
    </>
  );

  const renderProviderCard = (provider, index) => (
    <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 mb-3">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base text-[#674E43]">{provider.name}</h3>
          <button
            onClick={() => navigate(`/admin/service/${provider.id}`)}
            className="inline-flex items-start justify-start p-2 text-black hover:bg-slate-200 rounded-md transition-colors"
            title="View details"
          >
            <Eye size={20} />
          </button>
        </div>
        
        <div className="space-y-2 text-base">
          <div>
            <span className="text-gray-500">Owner:</span>
            <span className="ml-2 font-medium text-[#674E43]">{provider.owner}</span>
          </div>
          <div>
            <span className="text-gray-500">Service:</span>
            <span className="ml-2 font-medium text-[#674E43]">{provider.service}</span>
          </div>
          <div>
            <span className="text-gray-500">Phone:</span>
            <span className="ml-2 font-medium text-[#674E43]">{provider.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className=" ">
        {/* Header */}
       
      <DashboardHeader title="Service Provider List" />

        {/* Mobile Card View */}
        <div className="md:hidden">
          {displayedProviders.map((provider, index) => renderProviderCard(provider, index))}
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={providers.length}
            resultsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <Table columns={columns} data={displayedProviders} renderRow={renderProviderRow} />
          </div>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={providers.length}
            resultsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}