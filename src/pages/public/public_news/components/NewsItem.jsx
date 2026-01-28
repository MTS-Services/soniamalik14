import React from 'react';

const NewsItem = ({ item }) => {
  return (
    <div className="py-5">
      <p className="text-sm text-secondary-text">{item.date}</p>
      <h4 className="font-semibold text-base mt-1 text-title leading-tight">{item.title}</h4>
      {item.excerpt && <p className="text-sm mt-2 text-color-secondary-text description">{item.excerpt}</p>}
      <div className="border-t border-gray-200 mt-4" />
    </div>
  );
};

export default NewsItem;
