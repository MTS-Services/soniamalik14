// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Container from '../../../components/layout/Container';
// import { FaCheckCircle, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
// import { MdDateRange, MdEmail } from 'react-icons/md';

// const OrderConfirmed = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const orderData = location.state || {};

//   const {
//     orderNumber = '#45897',
//     orderDate = 'Oct 5,2025',
//     customerEmail = 'customer@gmail.com',
//     item = { title: 'Pro Football Boots for Women', price: 320, image: '/images/productDetails/image1.png' },
//     quantity = 1,
//     subtotal = 320,
//     shipping = 0,
//     tax = 61.99,
//     total = 357.99,
//     paymentMethod = 'Online Payment'
//   } = orderData;

//   return (
//     <div className="bg-[#F8FAFC] py-6 md:py-8 min-h-screen">
//       <Container>
//         <div className="max-w-7xl mx-auto px-4">
//           {/* Success Header */}
//           <div className="p-6 md:p-10 mb-6 text-center">
//             <div className="flex justify-center mb-4">
//               <div className="relative inline-block">
//                 {/* Confetti dots */}
//                 <div className="absolute -top-2 -left-2 w-1 h-1 bg-[#FFA500] rounded-full"></div>
//                 <div className="absolute -top-3 left-8 w-1.5 h-1.5 bg-[#FF6B6B] rounded-full"></div>
//                 <div className="absolute top-0 -right-3 w-1 h-1 bg-[#4ECDC4] rounded-full"></div>
//                 <div className="absolute top-8 -right-4 w-1.5 h-1.5 bg-[#FFD93D] rounded-full"></div>
//                 <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-[#FFA500] rounded-full"></div>
//                 <div className="absolute -bottom-3 left-6 w-1.5 h-1.5 bg-[#FF6B6B] rounded-full"></div>
//                 <div className="absolute bottom-0 -left-3 w-1 h-1 bg-[#4ECDC4] rounded-full"></div>
//                 <div className="absolute top-6 -left-4 w-1.5 h-1.5 bg-[#FFD93D] rounded-full"></div>
                
//                 {/* Light green background circle */}
//                 <div className="bg-[#A7F3D0] rounded-full p-6 relative">
//                   {/* Solid green circle with white checkmark */}
//                   <div className="bg-[#10B981] rounded-full w-12 h-12 flex items-center justify-center">
//                     <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold text-[#000000] mb-2">Order Confirmed!</h1>
//             <p className="text-[#626262] text-base">Thank you for your purchase</p>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Left Side - Order Details */}
//             <div className="space-y-6">
//               {/* Order Number Card */}
//               <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold text-[#000000] mb-3">
//                       Order Number{orderNumber}
//                     </h2>
//                     <div className="flex flex-col gap-2 text-base text-[#626262]">
//                       <div className="flex items-center gap-2">
//                         <MdDateRange className="text-[#626262] flex-shrink-0" size={16} />
//                         <span>{orderDate}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <MdEmail className="text-[#626262] flex-shrink-0" size={16} />
//                         <span>{customerEmail}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="sm:max-w-[200px] bg-[#E0F2F1] border border-[#0F766E] rounded-md p-3 text-xs text-[#000000] text-center">
//                     A confirmation email has been sent to your inbox
//                   </div>
//                 </div>
//               </div>

//               {/* Pickup Information Card */}
//               <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
//                 <h2 className="text-lg font-semibold text-[#000000] mb-2">Pick Up Information</h2>
//                 <p className="text-base text-[#626262] mb-6">2 items in this shipment</p>

//                 {/* Pickup Location */}
//                 <div className="mb-6">
//                   <div className="flex items-start gap-3 mb-4">
//                     <FaMapMarkerAlt className="text-[#000000] mt-0.5 flex-shrink-0" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-[#000000] text-base mb-1">Pickup Location</h3>
//                       <p className="text-base text-[#626262]">4517 Washington Ave. Manchester, Kentucky 39495</p>
//                     </div>
//                   </div>

//                   {/* Available Hours */}
//                   <div className="flex items-start gap-3">
//                     <FaClock className="text-[#000000] mt-0.5 flex-shrink-0" size={20} />
//                     <div>
//                       <h3 className="font-semibold text-[#000000] text-base mb-1">Available Hours</h3>
//                       <p className="text-base text-[#626262]">Sat-Thu: 10:00 AM - 8:00 PM</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pickup Instructions */}
//                 <div className="mb-6 pt-4 border-t border-gray-200">
//                   <h3 className="font-semibold text-[#000000] text-base mb-2">Pickup Instructions</h3>
//                   <p className="text-base text-[#626262] leading-relaxed">
//                     Bring your order number when picking up. Show ID for verification. Located on the 2nd floor near the escalator.
//                   </p>
//                 </div>

//                 {/* Go To Home Button */}
//                 <button 
//                   onClick={() => navigate('/')}
//                   className="w-full bg-[#0F766E] text-white font-semibold py-3.5 px-6 rounded-md hover:bg-[#0d5f58] transition-colors duration-200"
//                 >
//                   Go To Home
//                 </button>
//               </div>
//             </div>

//             {/* Right Side - Order Summary */}
//             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-fit lg:sticky lg:top-40">
//               <h2 className="text-lg font-semibold text-[#000000] mb-4">Order Summary</h2>

//               {/* Product Item */}
//               <div className="flex gap-3 mb-4">
//                 <img 
//                   src={item.image || '/images/productDetails/image1.png'} 
//                   alt={item.title || 'Product'}
//                   className="w-20 h-20 rounded object-cover flex-shrink-0"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-base font-medium text-[#000000] mb-1">{item.title}</h3>
//                   <p className="text-base text-[#626262]">{quantity} x ${item.price}</p>
//                 </div>
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between text-base">
//                   <span className="text-[#626262]">Sub-total</span>
//                   <span className="text-[#000000]">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-base">
//                   <span className="text-[#626262]">Shipping</span>
//                   <span className="text-[#000000]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
//                 </div>
//                 <div className="flex justify-between text-base">
//                   <span className="text-[#626262]">Tax</span>
//                   <span className="text-[#000000]">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
//                   <span className="text-[#000000]">Total</span>
//                   <span className="text-[#000000]">${total.toFixed(2)} USD</span>
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div className="bg-white rounded-md p-4 text-center mt-6 border-t border-gray-200">
//                 <p className="text-base font-medium text-[#0F766E]">Payment Method : {paymentMethod}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default OrderConfirmed;
