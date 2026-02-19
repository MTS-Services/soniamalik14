import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../../../../components/ui/Button';

// Use public/ assets via root paths so Vite serves them correctly
const PRODUCT_PHOTO = '/ProductPhoto.jpg';
const INVOICE_PHOTO = '/InvoicePhoto.png';

const OrderDetails = ({ order, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  if (!order) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-hidden">
      <div onClick={(e) => e.stopPropagation()} className="h-[70vh] w-full max-w-md rounded-lg bg-white flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 px-6 py-4 overflow-y-auto flex-1">

          {/* Customer Info */}
          <div className="space-y-3">
            <div>
              <span className="text-gray-700 font-medium">Ordered By : </span >
              {order?.customerName ?? "King Khan"}
            </div>

            <p>
              <span className="text-gray-700 font-medium">Address : </span >
              {order?.address ?? "2972 Westheimer Rd. Santa Ana, Illinois 85486"}
            </p>

            <div>
              <span className="text-gray-700 font-medium">Phone:</span >
              <p className="text-gray-900">
                {order?.phone ?? "(208) 555-0112"}
              </p>
            </div>

            <div>
              <span className="text-gray-700 font-medium">Email:</span>
              <p className="text-gray-900">
                {order?.email ?? "jackson.graham@example.com"}
              </p>
            </div>
          </div>

          {/* Product Photo */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Product Photo
            </h3>
            <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={PRODUCT_PHOTO}
                alt="Product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Invoice */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Invoice Photo
            </h3>
            <div className="flex  w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 p-2">
              <img
                src={order?.invoiceImage || INVOICE_PHOTO}
                alt="Invoice"
                className=" w-full object-contain"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-6 py-3">
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
