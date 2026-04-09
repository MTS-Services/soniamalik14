import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const NotificationItem = ({ id, text, isRead, onClick }) => {
  return (
    <div
      className="flex items-center justify-between p-3 md:p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <span className={`text-sm md:text-base text-gray-700 ${isRead ? 'font-normal' : 'font-semibold'}`}>
        {text}
      </span>
      <FiChevronRight className="text-gray-400 shrink-0 w-4 h-4 md:w-5 md:h-5" />
    </div>
  );
};

export default NotificationItem;
