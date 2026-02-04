import { X } from 'lucide-react';
const PRODUCT_PHOTO = '../../../../../public/ProductPhoto.jpg'
const INVOICE_PHOTO = '/InvoicePhoto.png';
// const  = '/ProductPhoto.png';

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white">
        
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 transition-colors hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 px-6 py-4">

          {/* Customer Info */}
          <div className="space-y-3">
            <div>
              <span  className="text-gray-700 font-medium">Ordered By : </span >
       
                {order?.customerName ?? "King Khan"}
     
            </div>

            <p >
              <span  className="text-gray-700 font-medium">Address : </span >
             
                {order?.address ?? "2972 Westheimer Rd. Santa Ana, Illinois 85486"}
          
            </p>

            <div>
              <span  className="text-gray-700 font-medium">Phone:</span >
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
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Product Photo
            </h3>
            <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={ PRODUCT_PHOTO}
                alt="Product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Invoice */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
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
      </div>
    </div>
  );
};

export default OrderDetails;
