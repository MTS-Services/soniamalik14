import { X } from 'lucide-react';

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Customer Info */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Ordered BY:</p>
              <p className="text-sm text-gray-900">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Address:</p>
              <p className="text-sm text-gray-900">{order.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Phone:</p>
              <p className="text-sm text-gray-900">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email:</p>
              <p className="text-sm text-gray-900">{order.email}</p>
            </div>
          </div>

          {/* Product Photo */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Product Photo</h3>
            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={order.productImage}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Invoice */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Invoice Photo</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {/* Invoice Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">SPORTS STORE</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900">INVOICE</p>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs border-b border-gray-200 pb-3">
                <div>
                  <p className="text-gray-600">Invoice Number:</p>
                  <p className="font-semibold text-gray-900">INV-001</p>
                </div>
                <div>
                  <p className="text-gray-600">Order Date:</p>
                  <p className="font-semibold text-gray-900">April 08, 2024</p>
                </div>
                <div>
                  <p className="text-gray-600">Order Date:</p>
                  <p className="font-semibold text-gray-900">April 08, 2024</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Method:</p>
                  <p className="font-semibold text-gray-900">Credit Card</p>
                </div>
              </div>

              {/* Bill To / Ship To */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs border-b border-gray-200 pb-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">BILL TO</p>
                  <p className="text-gray-600">George Khan</p>
                  <p className="text-gray-600">123 Park Avenue</p>
                  <p className="text-gray-600">New York, NY 10016</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">SHIP TO</p>
                  <p className="text-gray-600">George Khan</p>
                  <p className="text-gray-600">123 Park Avenue</p>
                  <p className="text-gray-600">New York, NY 10016</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-4 border-b border-gray-200 pb-3">
                <div className="grid grid-cols-4 gap-2 text-xs mb-2">
                  <p className="font-semibold text-gray-900">Item</p>
                  <p className="font-semibold text-gray-900">Description</p>
                  <p className="font-semibold text-gray-900">Qty</p>
                  <p className="font-semibold text-gray-900">Unit Price</p>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                    👟
                  </div>
                  <p className="text-gray-700">Football Shoes</p>
                  <p className="text-gray-900 font-medium">1</p>
                  <p className="text-gray-900 font-medium">$79.99</p>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs mb-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal:</p>
                  <p className="text-gray-900 font-medium">$79.99</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping:</p>
                  <p className="text-gray-900 font-medium">$0.00</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Sales Tax (20%):</p>
                  <p className="text-gray-900 font-medium">$6.40</p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <p className="text-gray-900 font-bold">Grand Total:</p>
                  <p className="text-gray-900 font-bold">$91.79</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 pt-3 text-xs text-center">
                <p className="text-gray-700 mb-2">Thank you for your purchase!</p>
                <p className="text-gray-600 text-xs mb-2">
                  If you have any questions, please contact us at
                  <br />
                  support@sportsstore.com | 1-800-123-4567
                </p>
                <div className="text-center my-2">
                  <p className="text-gray-600">|||||||||||||||||||</p>
                </div>
                <p className="text-gray-600">www.sportsstore.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;