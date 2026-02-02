import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../../../components/layout/Container';
import { sampleItems } from './MarketPlace';
import { FaRegCreditCard, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passed = location.state?.item;
  const item = passed || sampleItems[0] || { title: 'Item', price: 0, image: '/images/productDetails/image1.png' };

  const [quantity] = useState(1);

  const subtotal = (item.price || 0) * quantity;
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-[#F8FAFC] py-8 min-h-screen">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Form (spans 2 cols on large) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md p-6 shadow-sm mb-6">
                <h2 className="font-semibold mb-4">Billing Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">First name</label>
                    <input placeholder="First name" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>

                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">Last name</label>
                    <input placeholder="Last name" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>

                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">Email</label>
                    <input placeholder="Email" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>

                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">Phone Number</label>
                    <input placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>

                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">Region/State</label>
                    <select className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]">
                      <option>Select...</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">City</label>
                    <input placeholder="City" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>

                  <div>
                    <label className="text-xs text-[#191C1F] mb-1 block">Zip Code</label>
                    <input placeholder="Zip Code" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs text-[#191C1F] mb-1 block">Address</label>
                    <input placeholder="Address" className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-center text-sm text-[#191C1F]">
                    <input type="checkbox" className="mr-2" />
                    Ship into different address
                  </label>
                </div>
              </div>

              <div className="mb-6 rounded-md bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-semibold">Payment Option</h2>
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 p-4 text-sm">
                    <div className="mb-2">
                      <FaRegCreditCard size={28} className="text-[#F97316]" />
                    </div>
                    <div className="font-medium">Debit/Credit Card</div>
                    <input type="radio" name="pay" defaultChecked className="mt-2" />
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 p-4 text-sm">
                    <div className="mb-2">
                      <FcGoogle size={28} />
                    </div>
                    <div className="font-medium">G Pay</div>
                    <input type="radio" name="pay" className="mt-2" />
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 p-4 text-sm">
                    <div className="mb-2">
                      <FaApple size={28} className="text-black" />
                    </div>
                    <div className="font-medium">Apple Pay</div>
                    <input type="radio" name="pay" className="mt-2" />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-[#191C1F]">Name on Card</label>
                    <input placeholder="Name on Card" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#191C1F]">Card Number</label>
                    <input placeholder="Card Number" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#191C1F]">Expire Date</label>
                    <input placeholder="MM/YY" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#191C1F]">CVC</label>
                    <input placeholder="CVC" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-white p-6 shadow-sm">
                <h2 className="mb-4 font-semibold">Additional Information</h2>
                <textarea placeholder="Order Notes (Optional)" className="h-24 w-full rounded-md border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FA8232] focus:border-[#FA8232]" />
              </div>
            </div>

            {/* Right: Order Summary */}
            <aside className="self-start rounded-md bg-white p-6 shadow-sm lg:sticky lg:top-40">
              <h3 className="mb-4 font-semibold">Order Summary</h3>
              <div className="mb-4 flex items-start gap-4">
                <img src={item.image || '/images/productDetails/image1.png'} alt={item.title} className="h-20 w-20 rounded object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="mt-1 text-sm text-gray-500">1 x ${item.price || 0}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <div>Sub-total</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="mb-4 flex justify-between text-sm">
                  <div>Shipping</div>
                  <div>${shipping.toFixed(2)}</div>
                </div>
                <div className="mb-4 flex justify-between text-lg font-bold">
                  <div>Total</div>
                  <div>${total.toFixed(2)} USD</div>
                </div>

                <button onClick={() => alert('Place order - implement checkout flow')} className="bg-btn-primary mb-3 flex w-full items-center justify-center gap-2 rounded py-3 text-white">
                  <span>PLACE ORDER</span>
                  <span className="text-sm">→</span>
                </button>
                <button onClick={() => navigate(-1)} className="w-full rounded border border-gray-200 py-2">BACK</button>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
