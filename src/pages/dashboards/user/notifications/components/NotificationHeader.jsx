import React from 'react';

const NotificationHeader = ({ selectedCount, onMarkAllRead, onDeleteSelected, totalCount }) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onMarkAllRead}
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition"
        >
          Mark all as read
        </button>
        
        <button
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCount > 0
              ? 'bg-red-50 text-red-700 hover:bg-red-100'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Delete ({selectedCount})
        </button>
      </div>
    </div>
  );
};

export default NotificationHeader;
