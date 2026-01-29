import React, { useState } from 'react';
import DashboardHeader from '../../../../components/ui/DashboardHeader';
import Table from '../../../../components/ui/Table';
import TablePagination from '../../../../components/ui/TablePagination';
import { Eye, X, Check } from 'lucide-react';
import ProductCard from '../../../../components/ui/ProductCard';
import Pagination from '../../../../components/ui/Pagination';
import ProductDetails from './Productdetails';

const ProductRequested = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);



  const itemsPerPage = 6;
const productsData = [
    {
      id: 1,
      productName: 'Cricket Bat',
      sellerName: 'Leslie Alexander',
      price: '$120',
      condition: 'Used Product',
            conditionsUsed:"Football",


      images: [
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Leslie Alexander',
        role: 'Player Kit seller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      description: 'This used women\'s cricket kit is ideal for players looking for quality gear at an affordable price.',
      details: 'Minor signs of use may be present, but they do not affect functionality or safety.',
    },
    {
      id: 2,
      productName: 'Leather Ball',
      sellerName: 'Savannah Nguyen',
      price: '$200',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Savannah Nguyen',
        role: 'Sports Equipment Seller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      description: 'Professional grade leather ball, perfect for training and competitive play.',
      details: 'Well maintained and ready for use.',
    },
    {
      id: 3,
      productName: 'Batting Gloves',
      sellerName: 'Darrell Steward',
      price: '$300',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Darrell Steward',
        role: 'Cricket Equipment Seller',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      description: 'Premium batting gloves with superior grip and comfort.',
      details: 'Brand new, never used.',
    },
    {
      id: 4,
      productName: 'Football Boots',
      sellerName: 'Courtney Henry',
      price: '$400',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Courtney Henry',
        role: 'Football Gear Seller',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
      description: 'High-performance football boots in excellent condition.',
      details: 'Lightly used, perfect for competitive play.',
    },
    {
      id: 5,
      productName: 'Goalkeeper Gloves',
      sellerName: 'Dianne Russell',
      price: '$500',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Dianne Russell',
        role: 'Goalkeeper Equipment Specialist',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      description: 'Professional goalkeeper gloves with enhanced grip technology.',
      details: 'Brand new, factory sealed.',
    },
    {
      id: 6,
      productName: 'Football Socks',
      sellerName: 'Kristin Watson',
      price: '$600',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Kristin Watson',
        role: 'Football Accessories Seller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      description: 'Premium football socks with moisture-wicking technology.',
      details: 'Brand new, pack of 6.',
    },
    {
      id: 7,
      productName: 'Tennis Racket',
      sellerName: 'Floyd Miles',
      price: '$700',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1617083902624-4ddf8dc0db3c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Floyd Miles',
        role: 'Tennis Equipment Seller',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      description: 'Professional tennis racket for competitive players.',
      details: 'Brand new with warranty.',
    },
    {
      id: 8,
      productName: 'Tennis Strings',
      sellerName: 'Wade Warren',
      price: '$800',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1617083902624-4ddf8dc0db3c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Wade Warren',
        role: 'Tennis Accessories Seller',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
      description: 'High-quality tennis strings for optimal performance.',
      details: 'Pack of 10 sets.',
    },
    {
      id: 9,
      productName: 'Badminton Racket',
      sellerName: 'Devon Lane',
      price: '$900',
      condition: 'Used Product',
            conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1617083902624-4ddf8dc0db3c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Devon Lane',
        role: 'Badminton Equipment Seller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      description: 'Professional badminton racket with carbon fiber frame.',
      details: 'Brand new, excellent balance.',
    },
    {
      id: 10,
      productName: 'Badminton Shoes',
      sellerName: 'Albert Flores',
      price: '$1000',
      condition: 'Used Product',
      
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Albert Flores',
        role: 'Badminton Gear Seller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      description: 'Lightweight badminton shoes for maximum agility.',
      details: 'Brand new, all sizes available.',
    },
    {
      id: 11,
      productName: 'Squash Racket',
      sellerName: 'Ronald Richards',
      price: '$1100',
      condition: 'Used Product',
      images: [
        'https://images.unsplash.com/photo-1617083902624-4ddf8dc0db3c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Ronald Richards',
        role: 'Squash Equipment Seller',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      description: 'Professional squash racket for competitive players.',
      details: 'Brand new with carrying case.',
    },
    {
      id: 12,
      productName: 'Racket Cover',
      sellerName: 'Guy Hawkins',
      price: '$1200',
      condition: 'Used Product',
      conditionsUsed:"Football",

      images: [
        'https://images.unsplash.com/photo-1617083902624-4ddf8dc0db3c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1624526267942-ab67cb38a25f?w=400&h=300&fit=crop',
      ],
      seller: {
        name: 'Guy Hawkins',
        role: 'Sports Accessories Seller',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
      description: 'Protective racket cover for all types of rackets.',
      details: 'Durable and waterproof material.',
    },
  ];

  const totalPages = Math.ceil(productsData.length / itemsPerPage);
  const currentData = productsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = ['Product Name', 'Seller Name', 'Price', 'Condition', 'Actions'];

  const renderRow = (product) => (
    <>
      <td className="px-4 py-3 text-base text-gray-900">{product.productName}</td>
      <td className="px-4 py-3 text-base text-gray-700">{product.sellerName}</td>
      <td className="px-4 py-3 text-base text-gray-700">{product.price}</td>
      <td className="px-4 py-3 text-base text-gray-700">{product.condition}</td>
      <td className="px-4 py-3 text-left">
        <div className="flex items-start justify-start gap-2">
          <button 
          
          
           onClick={() => setSelectedProduct(product)}
          className="rounded-md p-1.5 transition-colors" title="View">
            <Eye className="h-5 w-5 text-[#000000]" />
          </button>
          <button className="rounded-md p-1.5 transition-colors" title="Reject">
            <X className="h-5 w-5 text-[#EA0C0C]" />
          </button>
          <button className="rounded-md p-1.5 transition-colors" title="Approve">
            <Check className="h-5 w-5 text-[#55A946]" />
          </button>
        </div>
      </td>
    </>
  );
if (selectedProduct) {
    return (
      <ProductDetails 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)}
      />
    );
  }
  return (
    <div className="flex-1 overflow-auto bg-gray-50 dashboardPy dashboardSpaceY">
      <DashboardHeader title="Requested Products" />

      {/* Desktop Table */}
      <div className="hidden rounded-lg bg-white md:block">
        <Table columns={columns} data={currentData} renderRow={renderRow} />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={productsData.length}
          resultsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {currentData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default ProductRequested;







