import React, { useState } from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import MarketplaceCard from './components/MarketplaceCard';
import AddProductModal from './components/AddProductModal';
import Pagination from '../../../components/ui/Pagination';

export const sampleItems = [
  { id: 1, title: "Women's Cricket Bat", description: 'High-quality bat for women players. Used but well maintained. Sell or swap available.', price: 200, condition: 'New', image: '/player1.png' },
  { id: 2, title: 'Pro Football Boots for Women', description: 'Comfortable and durable football boots designed for women. Brand new condition.', price: 120, condition: 'New', image: '/player2.png' },
  { id: 3, title: 'Lightweight Tennis Racket', description: 'Easy-grip, lightweight racket perfect for beginners to intermediate players. Swap option open.', price: 200, condition: 'New', image: '/player3.jpg' },
  { id: 4, title: 'Rugby Training Gear for Women', description: 'Reliable training gear suitable for women athletes. Used, strong and long-lasting.', price: 20, condition: 'Used', image: '/player1.png' },
  { id: 5, title: "Women's Cricket Kit – Used", description: 'Complete cricket kit for women players. Good condition, ideal for practice sessions.', price: 20, condition: 'Used', image: '/player2.png' },
  { id: 6, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player3.jpg' },
  { id: 7, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player1.png' },
  { id: 8, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player2.png' },
  { id: 9, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player3.jpg' },
  { id: 10, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player1.png' },
  { id: 11, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player2.png' },
  { id: 12, title: "Elite Women's Football Studs", description: 'High-performance studs with strong grip and comfort. Lightly used.', price: 20, condition: 'Used', image: '/player3.jpg' },
];

const MarketPlace = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(sampleItems);
  const [showAddModal, setShowAddModal] = useState(false);
  const perPage = 12;

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const total = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="py-6 lg:py-8 min-h-screen bg-gray-50">
      <Container>
        <div className="mb-6">
          <PageHeader
            title="Marketplace"
            description="Buy and sell new and pre-owned sports kit and equipment."
            showSearch
            searchPlaceholder="Search By Item Name"
            onSearch={(q) => { setSearchQuery(q); setPage(1); }}
            ctaText="List your item"
            onCtaClick={() => setShowAddModal(true)}
          />
        </div>

        {paged.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              {paged.map((item) => (
                <MarketplaceCard key={item.id} item={item} />
              ))}
            </div>

            <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
            <AddProductModal
              open={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={(product) => {
                const id = Math.max(0, ...items.map((i) => i.id)) + 1;
                setItems([{ id, title: product.title || 'Untitled', description: product.description || '', price: product.price || 0, condition: product.condition || 'Used', image: '/player1.png' , ...product }, ...items]);
              }}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#282828] mb-2">No Items Found</h3>
              <p className="text-[#585858] text-sm mb-4">
                We couldn't find any items matching your search.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setPage(1); }}
                className="text-btn-primary hover:underline font-medium text-sm"
              >
                Clear search
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default MarketPlace;
