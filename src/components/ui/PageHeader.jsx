import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

/**
 * PageHeader - A reusable page header component with optional search and CTA button
 * 
 * @param {string} title - Page title text
 * @param {string} description - Page description text
 * @param {boolean} showSearch - Show/hide search input
 * @param {string} searchPlaceholder - Placeholder text for search input
 * @param {function} onSearch - Callback function when user types in search (receives query string)
 * @param {string} ctaText - Button text (e.g., "List your item")
 * @param {string} ctaHref - Link URL for navigation (use this for routing, makes button a Link)
 * @param {function} onCtaClick - Click handler for button (use this for actions like opening modal)
 * @param {string} className - Additional CSS classes
 * 
 * @example
 * // With search and navigation button
 * <PageHeader
 *   title="Marketplace"
 *   description="Buy and sell sports equipment"
 *   showSearch
 *   searchPlaceholder="Search by item name"
 *   onSearch={(query) => handleSearch(query)}
 *   ctaText="List your item"
 *   ctaHref="/marketplace/add"
 * />
 * 
 * @example
 * // With action button (no navigation)
 * <PageHeader
 *   title="Community Forum"
 *   description="Connect with other players"
 *   ctaText="Create Post"
 *   onCtaClick={() => setModalOpen(true)}
 * />
 * 
 * @example
 * // Simple header (no search, no button)
 * <PageHeader
 *   title="About Us"
 *   description="Learn more about our mission"
 * />
 */
const PageHeader = ({
  title,
  description,
  showSearch = false,
  searchPlaceholder = 'Search by name or location',
  onSearch,
  ctaText,
  ctaHref,
  onCtaClick,
  className = '',
}) => {
  const [q, setQ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
  };

  return (
    <div className={`w-full bg-transparent ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="shrink min-w-0">
          {title && <h1 className="text-3xl lg:text-[40px] font-semibold text-subtitle">{title}</h1>}
          {description && <p className="text-base md:text-lg text-[#585858] mt-1 md:mt-2.5">{description}</p>}
        </div>

        <div className="flex sm:items-center sm:flex-row flex-col gap-2 sm:gap-3 w-full md:w-auto">
          {showSearch && (
            <div className="flex items-center bg-white rounded-lg px-3 sm:px-4 py-2 lg:py-2.5 border border-[#5EA39E] flex-2 md:flex-initial md:min-w-75">
              <Search className="w-4 h-4 text-[#5EA39E] shrink-0" />
              <input
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder={searchPlaceholder}
                className="ml-2 w-full outline-none text-sm text-gray-700 placeholder-[#747474]"
                aria-label="search"
              />
            </div>
          )}

          {ctaText && (
            ctaHref ? (
              <Link to={ctaHref} className="inline-flex items-center justify-center gap-1.5 bg-btn-primary hover:bg-[#0d655d] text-white px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex-1 md:flex-initial transition-colors">
                <Plus className="w-4 h-4 shrink-0" />
                {ctaText}
              </Link>
            ) : (
              <button 
                type="button" 
                onClick={onCtaClick}
                className="inline-flex items-center justify-center gap-1.5 bg-btn-primary hover:bg-[#0d655d] text-white px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap flex-1 md:flex-initial transition-colors"
              >
                <Plus className="w-4 h-4 shrink-0" />
                {ctaText}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
