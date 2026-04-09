import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

const NotificationItem = ({ id, text, isRead, isSelected, onToggleSelect, onClick }) => {
  return (
    <div
      className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(id);
          }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
        >
          {isSelected ? (
            <MdCheckBox className="w-5 h-5 text-btn-primary" />
          ) : (
            <MdCheckBoxOutlineBlank className="w-5 h-5" />
          )}
        </button>
        <span className={`text-gray-700 ${isRead ? 'font-normal' : 'font-semibold'}`}>
          {text}
        </span>
      </div>
      <FiChevronRight className="text-gray-400 flex-shrink-0" />
    </div>
  );
};

export default NotificationItem;
