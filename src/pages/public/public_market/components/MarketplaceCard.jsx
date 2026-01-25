import React from 'react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import { Tag } from 'lucide-react';

const MarketplaceCard = ({ item }) => {
  const isNew = item.condition === 'New';

  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col" hover>
      {/* Image */}
      <div className="relative">
        <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400">Image</div>
          )}
        </div>
        {/* Condition badge */}
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${isNew ? 'bg-secondary text-btn-primary' : 'bg-gray-100 text-gray-700'}`}>
          <Tag className="w-3 h-3" />
          {item.condition}
        </span>
      </div>

      {/* Content */}
      <div className="pt-2 flex flex-col flex-1">
        <h3 className="text-[#282828] font-semibold text-base mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-[#585858] mb-3 line-clamp-2 flex-1">{item.description}</p>
        <div className="text-lg font-bold text-[#282828] mb-3">${item.price.toFixed(2)}</div>
        <Button variant="primary" className="w-full rounded-lg">Buy Now</Button>
      </div>
    </Card>
  );
};

export default MarketplaceCard;
