import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import OrderDetails from "./Orderdetails";
import DashboardHeader from "../../../../components/ui/DashboardHeader";
import Table from "../../../../components/ui/Table";
import TablePagination from "../../../../components/ui/TablePagination";
// import React, { useState, useEffect } from 'react';
// import { Eye, ChevronDown } from 'lucide-react';
// import OrderDetails from './Orderdetails';
import Pagination from '../../../../components/ui/Pagination';
// import DashboardHeader from '../../../../components/ui/DashboardHeader';
// import Table from '../../../../components/ui/Table';
// import TablePagination from '../../../../components/ui/TablePagination';

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: 'MKP-784515',
      productName: 'Cricket Bat',
      sellerName: 'Leslie Alexander',
      price: '$120',
      platformFee: '20%',
      status: 'In Progress',
      statusColor: 'bg-[#394C6B]',
    },
    {
      id: 'MKP-784514',
      productName: 'Leather Ball',
      sellerName: 'Savannah Nguyen',
      price: '$200',
      platformFee: '20%',
      status: 'Completed',
      statusColor: 'bg-[#0F766E]',
    },
    {
      id: 'MKP-784513',
      productName: 'Batting Gloves',
      sellerName: 'Darrell Steward',
      price: '$300',
      platformFee: '20%',
      status: 'Pending',
      statusColor: 'bg-[#E99F00]',
    },
    {
      id: 'MKP-784512',
      productName: 'Football Boots',
      sellerName: 'Courtney Henry',
      price: '$400',
      platformFee: '20%',
      status: 'Pending',
      statusColor: 'bg-[#E99F00]',
    },
    {
      id: 'MKP-784511',
      productName: 'Goalkeeper Gloves',
      sellerName: 'Dianne Russell',
      price: '$500',
      platformFee: '20%',
      status: 'Completed',
      statusColor: 'bg-[#0F766E]',
    },
    {
      id: 'MKP-784510',
      productName: 'Football Socks',
      sellerName: 'Kristin Watson',
      price: '$600',
      platformFee: '20%',
      status: 'In Progress',
      statusColor: 'bg-[#394C6B]',
    },
  ]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = orders.slice(startIndex, startIndex + itemsPerPage);

  const mapStatusToColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#0F766E]';
      case 'In Progress':
        return 'bg-[#394C6B]';
      case 'Pending':
        return 'bg-[#E99F00]';
      default:
        return 'bg-gray-600';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
            ...o,
            status: newStatus,
            statusColor: mapStatusToColor(newStatus),
          }
          : o
      )
    );
  };

  useEffect(() => {
    // no dropdown cleanup needed when using native select
  }, []);

  const columns = ['Order ID', 'Product Name', 'Seller Name', 'Price', 'Platform Fee', 'Status', 'Actions'];

  const renderRow = (order) => (
    <>
      <td className="px-4 py-4">{order.id}</td>
      <td className="px-4 py-4">{order.productName}</td>
      <td className="px-4 py-4">{order.sellerName}</td>
      <td className="px-4 py-4">{order.price}</td>
      <td className="px-4 py-4">{order.platformFee}</td>
      <td className="px-4 py-4">
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order.id, e.target.value)}
          className={`rounded-md border px-3 py-2 text-base ${order.statusColor} text-white`}
        >
          <option className="text-gray-700" value="Pending">Pending</option>
          <option className="text-gray-700" value="In Progress">In Progress</option>
          <option className="text-gray-700" value="Completed">Completed</option>
        </select>
      </td>
      <td className="px-4 py-4 text-left">
        <button onClick={() => setSelectedOrder(order)} className="rounded-md p-2">
          <Eye className="h-5 w-5 text-black" />
        </button>
      </td>
    </>
  );

  const MobileCard = ({ order }) => (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-lg text-gray-900">{order.productName}</h3>

        <div className="flex flex-col items-end gap-2">
          <Eye
            className="h-5 w-5 cursor-pointer text-gray-600"
            onClick={() => setSelectedOrder(order)}
          />
          <div className=" text-base font-medium px-3 py-1 rounded-md">
            {order.sellerName}
          </div>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-base text-gray-600">
        <div>Order: <span className="text-gray-900 font-medium">{order.id}</span></div>
        <div className="text-right">Platform Fee: <span className="text-gray-900 font-medium">{order.platformFee}</span></div>
        <div>Price: <span className="text-gray-900 font-medium">{order.price}</span></div>
      </div>

      <div className="pt-2">
        <label className="text-base text-gray-600 block mb-1">Status</label>
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order.id, e.target.value)}
          className={`w-full rounded-md px-3 py-2 text-base appearance-none ${order.statusColor} text-white`}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );

  // Render the details modal inline so the page stays visible underneath
  // (OrderDetails handles the overlay). Do not return early.

  return (
    <div className="dashboardPy dashboardSpaceY flex-1 bg-gray-50">
      <DashboardHeader title="Order List" />

      {/* Desktop (xl+) */}
      <div className="hidden rounded-lg bg-white xl:block">
        <div className="overflow-x-auto">
          <Table columns={columns} data={currentData} renderRow={renderRow} tableClass="w-full table-fixed" />
        </div>

        <div className="pt-4">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={orders.length}
            resultsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Mobile + Tablet (<xl) - show card layout on tablets */}
      <div className="space-y-4 xl:hidden">
        {currentData.map((order) => (
          <MobileCard key={order.id} order={order} />
        ))}

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={orders.length}
          resultsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderList;
