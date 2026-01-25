import React from 'react';

const ForumTopicCard = ({ topic, isLoggedIn = false }) => {
  const { author, title, description, replies, avatar } = topic;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
      {/* Author Badge */}
      <div className="flex items-center gap-2 mb-3">
        {isLoggedIn && avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-6 h-6 rounded-full object-cover"
          />
        )}
        <span className="inline-block text-gray-700 text-xs py-1 rounded">
          Rējní Edwards
        </span>
      </div>

      {/* Topic Title */}
      <h3 className="subtitle text-cardTitle font-semibold mb-1">
        {title}
      </h3>

      {/* Description */}
      <p className="description mb-3">
        {description}
      </p>

      {/* Reply Count */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>{replies} Reply</span>
      </div>
    </div>
  );
};

export default ForumTopicCard;
