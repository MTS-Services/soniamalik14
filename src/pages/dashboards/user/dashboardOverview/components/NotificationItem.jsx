import React from 'react';
import { FiChevronRight, FiMessageSquare } from 'react-icons/fi';

const NotificationItem = ({ text, onClick }) => (
  <div 
    className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className="bg-gray-50 p-2 rounded-md border border-gray-100">
        <FiMessageSquare className="text-gray-400" />
      </div>
      <span className="text-gray-700 font-normal">{text}</span>
    </div>
    <FiChevronRight className="text-gray-400" />
  </div>
);

export default NotificationItem;
