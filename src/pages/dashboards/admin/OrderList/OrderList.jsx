import React, { useState, useEffect } from "react";
import { Eye, ChevronDown } from "lucide-react";
import OrderDetails from "./Orderdetails";
import Pagination from "../../../../components/ui/Pagination";
import DashboardHeader from "../../../../components/ui/DashboardHeader";
import Table from "../../../../components/ui/Table";
import TablePagination from "../../../../components/ui/TablePagination";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: "MKP-784515",
      productName: "Cricket Bat",
      sellerName: "Leslie Alexander",
      price: "$120",
      platformFee: "20%",
      status: "In Progress",
      statusColor: "bg-[#394C6B]",
    },
    {
      id: "MKP-784514",
      productName: "Leather Ball",
      sellerName: "Savannah Nguyen",
      price: "$200",
      platformFee: "20%",
      status: "Completed",
      statusColor: "bg-[#0F766E]",
    },
    {
      id: "MKP-784513",
      productName: "Batting Gloves",
      sellerName: "Darrell Steward",
      price: "$300",
      platformFee: "20%",
      status: "Pending",
      statusColor: "bg-[#E99F00]",
    },
    {
      id: "MKP-784512",
      productName: "Football Boots",
      sellerName: "Courtney Henry",
      price: "$400",
      platformFee: "20%",
      status: "Pending",
      statusColor: "bg-[#E99F00]",
    },
    {
      id: "MKP-784511",
      productName: "Goalkeeper Gloves",
      sellerName: "Dianne Russell",
      price: "$500",
      platformFee: "20%",
      status: "Completed",
      statusColor: "bg-[#0F766E]",
    },
    {
      id: "MKP-784510",
      productName: "Football Socks",
      sellerName: "Kristin Watson",
      price: "$600",
      platformFee: "20%",
      status: "In Progress",
      statusColor: "bg-[#394C6B]",
    },
  ]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = orders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleRow = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const mapStatusToColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#0F766E]";
      case "In Progress":
        return "bg-[#394C6B]";
      case "Pending":
        return "bg-[#E99F00]";
      default:
        return "bg-gray-600";
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
    setOpenMenuId(null);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest("[data-dropdown]")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () =>
      document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const columns = [
    "Order ID",
    "Product Name",
    "Seller Name",
    "Price",
    "Platform Fee",
    "Actions",
  ];

  const renderRow = (order) => (
    <>
      <td className="px-6 py-4">{order.id}</td>
      <td className="px-6 py-4">{order.productName}</td>
      <td className="px-6 py-4">{order.sellerName}</td>
      <td className="px-6 py-4">{order.price}</td>
      <td className="px-6 py-4">{order.platformFee}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative" data-dropdown>
            <button
              onClick={() => toggleRow(order.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-white text-base ${order.statusColor}`}
            >
              {order.status}
              <ChevronDown
                className={` transition-transform ${
                  openMenuId === order.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenuId === order.id && (
              <div className="absolute left-0 mt-1 w-40 bg-white border rounded-md shadow z-20">
                {["Pending", "In Progress", "Completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(order.id, s)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedOrder(order)}
            className="p-2  rounded-md"
          >
            <Eye className="w-5 h-5 text-black" />
          </button>
        </div>
      </td>
    </>
  );

  const MobileCard = ({ order }) => (
    <div className="border rounded-lg p-4 space-y-3 bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{order.productName}</h3>
        <Eye
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={() => setSelectedOrder(order)}
        />
      </div>

      <p className="text-sm">Order: {order.id}</p>
      <p className="text-sm">Seller: {order.sellerName}</p>
      <p className="text-sm">Price: {order.price}</p>

      <div data-dropdown className="relative">
        <button
          onClick={() => toggleRow(order.id)}
          className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-white ${order.statusColor}`}
        >
          {order.status}
          <ChevronDown
            className={`w-4 h-4 ${
              openMenuId === order.id ? "rotate-180" : ""
            }`}
          />
        </button>

        {openMenuId === order.id && (
          <div className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow z-20">
            {["Pending", "In Progress", "Completed"].map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(order.id, s)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dashboardPy dashboardSpaceY">
      <DashboardHeader title="Order List" />

      {/* Desktop */}
      <div className="hidden md:block bg-white rounded-lg">
        <Table
          columns={columns}
          data={currentData}
          renderRow={renderRow}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {currentData.map((order) => (
          <MobileCard key={order.id} order={order} />
        ))}
      </div>

      <TablePagination
        page={currentPage}
        total={totalPages}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default OrderList;
