import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../../components/layout/Container';
import MarketplaceCard from './components/MarketplaceCard';
import { sampleItems } from './MarketPlace';

const MarketplaceDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer the item passed via navigation state, otherwise look up by id in the sample list.
  const stateItem = location.state?.item;
  const foundItem = sampleItems.find((it) => String(it.id) === String(id));

  const fallback = {
    id,
    title: "Women's Cricket Kit - Used",
    images: [
      '/images/productDetails/image1.png',
      '/images/productDetails/image1.png',
      '/images/productDetails/image1.png',
    ],
    description:
      'This used women\'s cricket kit is ideal for players looking for quality gear at an affordable price. The kit has been well maintained and is in good playing condition.',
    price: 192.0,
    seller: 'R2A Store',
  };

  const item = stateItem || foundItem || fallback;

  // Build an images array: use `images` if provided, otherwise if a single `image` exists
  // duplicate it a few times so thumbnails show multiple variants on the details page.
  const images = (item.images && item.images.length)
    ? item.images
    : item.image
      ? Array.from({ length: 4 }, () => item.image)
      : Array.from({ length: 4 }, () => '/images/productDetails/image1.png');

  const [selected, setSelected] = useState(0);
  const thumbsContainerRef = useRef(null);
  const thumbRefs = useRef([]);

  const prevImage = () => setSelected((s) => Math.max(0, s - 1));
  const nextImage = () => setSelected((s) => Math.min(images.length - 1, s + 1));

  useEffect(() => {
    const el = thumbRefs.current[selected];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selected]);

  return (
    <div className=" bg-[#F8FAFC]">
      <Container>
        <div className="py-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-[#323232] hover:text-[#1D1D1D]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="lg:flex lg:items-start lg:gap-6">
                {/* Vertical thumbnails for md+ */}
                <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:w-24 lg:w-28">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      ref={(el) => (thumbRefs.current[i] = el)}
                      onClick={() => setSelected(i)}
                      className={`h-20 w-20 lg:h-24 lg:w-24 overflow-hidden rounded-md bg-gray-100 ${selected === i ? 'ring-2 ring-btn-primary' : ''}`}
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img src={src} alt={`${item.title}-${i}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1">
                  <div className="aspect-4/3 w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={images[selected]} alt={item.title} className="h-full w-full object-contain" />
                  </div>

                  {/* Mobile thumbnails with arrows */}
                  <div className="mt-4 lg:hidden flex items-center gap-3">
                    <button
                      onClick={prevImage}
                      aria-label="Previous"
                      disabled={selected === 0}
                      className={`p-2 rounded-md bg-white shadow-sm ${selected === 0 ? 'opacity-40 pointer-events-none' : ''}`}
                    >
                      <ChevronLeft className="h-5 w-5 text-btn-primary" />
                    </button>

                    <div ref={thumbsContainerRef} className="flex-1 flex gap-3 overflow-x-auto px-1 py-3">
                      {images.map((src, i) => (
                        <button
                          key={i}
                          ref={(el) => (thumbRefs.current[i] = el)}
                          onClick={() => setSelected(i)}
                          className={`shrink-0 h-20 w-20 overflow-hidden rounded-md bg-gray-100 ${selected === i ? 'ring-2 ring-btn-primary' : ''}`}
                          aria-label={`Mobile thumbnail ${i + 1}`}
                        >
                          <img src={src} alt={`${item.title}-${i}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={nextImage}
                      aria-label="Next"
                      disabled={selected === images.length - 1}
                      className={`p-2 rounded-md bg-white shadow-sm ${selected === images.length - 1 ? 'opacity-40 pointer-events-none' : ''}`}
                    >
                      <ChevronRight className="h-5 w-5 text-btn-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <h1 className="text-2xl font-bold text-[#1D1D1D]">{item.title || 'No information available'}</h1>
              <p className="mt-4 text-sm text-[#323232]">{item.description || 'No information available'}</p>

              <div className="mt-6 border-t pt-6">
                <div className="text-2xl font-bold text-[#1D1D1D]">${(item.price || 0).toFixed(2)}</div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button className="h-9 w-9 rounded border text-lg">-</button>
                    <div className="h-9 w-16 flex items-center justify-center rounded border">1</div>
                    <button className="h-9 w-9 rounded border text-lg">+</button>
                  </div>

                  <button
                    onClick={() => navigate('/checkout', { state: { item } })}
                    className="ml-4 rounded-md bg-btn-primary px-6 py-2.5 text-white"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-[#1D1D1D]">{item.seller}</p>
                    <p className="text-sm text-[#323232]">Player Kit seller</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested for you */}
          <div className="mt-12">
            <h2 className="mb-6 text-xl md:text-2xl lg:text-3xl font-bold text-[#1D1D1D]">Suggested for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg  lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleItems
                .filter((it) => String(it.id) !== String(item.id))
                .slice(0, 8)
                .map((it) => (
                  <MarketplaceCard key={it.id} item={it} />
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketplaceDetails;
