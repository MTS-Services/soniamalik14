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
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-base mb-3 text-[#1f1f1f]">Categories</h3>
      <ul className="space-y-1">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <li key={category}>
              <button
                onClick={() => onCategoryChange && onCategoryChange(category)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-700'
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
  );
};

export default CategorySidebar;
