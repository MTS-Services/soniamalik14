import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ProductDetails = ({ product, onBack }) => {
  if (!product) {
    return null;
  }

  return (
    <div className=" dashboardPy dashboardSpaceY">
      <div className="">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#0F766E]  transition-colors py-2 pb-2 "
        >
          <ArrowLeft className="w-6 h-6 " />
          <span className="text-base font-medium">Back</span>
        </button>

        <div className=" rounded-lg overflow-hidden">
          {/* Images Grid */}
          <div className="flex flex-wrap gap-4  py-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] aspect-video rounded-lg overflow-hidden bg-gray-200"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>


          {/* Content */}
          <div className=" pb-6 ">
            {/* Tags */}
            <div className="flex gap-2 my-3">
              <span className="inline-block px-3 py-2 bg-[#E7F1F1] text-[#0F766E] text-base  ">
                {product.condition}
              </span>
              <span className="inline-block px-3 py-2 bg-[#E7F1F1] text-[#0F766E] text-base  ">
                {product.conditionsUsed}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              {product.productName}
            </h1>

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Details */}
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {product.details}
            </p>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900">
                {product.price}
              </p>
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-4">
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {product.seller.name}
                </p>
                <p className="text-base text-gray-600">
                  {product.seller.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;