import React from 'react';

const CategorySidebar = ({ activeCategory = 'All Discussion', onCategoryChange }) => {
  const categories = [
    'All Discussion',
    'Players',
    'Club Owners',
    'Sub Player',
    'Community & Support'
  ];

  return (
    <div>
      {/* Mobile: show as select */}
      <div className="block lg:hidden mb-4">
        <label className="sr-only">Categories</label>
        <div className="relative">
          <select
            value={activeCategory}
            onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white py-2 lg:py-3 px-4 appearance-none focus:ring-2 focus:ring-btn-primary outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▾</span>
        </div>
      </div>

      {/* Desktop: sidebar list */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-base mb-3 text-heading">Categories</h3>
        <ul className="space-y-1">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <li key={category}>
                <button
                  onClick={() => onCategoryChange && onCategoryChange(category)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    isActive
                      ? 'bg-secondary text-btn-primary border-l-4 border-btn-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
