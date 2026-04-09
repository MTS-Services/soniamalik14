import React from 'react';
import { CheckCheck, Trash2 } from 'lucide-react';

const NotificationHeader = ({ selectedCount, onMarkAllRead, onDeleteSelected, totalCount }) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 ">
      <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onMarkAllRead}
          className="px-4 py-2 bg-loginInput/10 text-btn-primary rounded-lg font-medium hover:bg-blue-100 transition flex items-center gap-2"
        >
          <CheckCheck className="w-4 h-4" />
          Mark all as read
        </button>
        
        <button
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            selectedCount > 0
              ? 'bg-red-50 text-red-700 hover:bg-red-100'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          Delete ({selectedCount})
        </button>
      </div>
    </div>
  );
};

export default NotificationHeader;
