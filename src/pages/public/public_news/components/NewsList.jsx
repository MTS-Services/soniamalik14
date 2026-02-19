import React from 'react';
import NewsHero from './NewsHero';
import NewsItem from './NewsItem';

const NewsList = ({ featured, items = [] }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
        <div className="md:col-span-2">
          <NewsHero article={featured} />
        </div>

        <aside className="md:col-span-1">
          <div className="bg-transparent">
            {items.map((it, i) => (
              <NewsItem key={i} item={it} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsList;
