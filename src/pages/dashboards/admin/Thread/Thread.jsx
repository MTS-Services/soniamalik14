import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function CommunityForumComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: 'All Discussion',
    title: '',
    description: ''
  });

  const [threads, setThreads] = useState([
    {
      id: 1,
      author: 'Rishi Edwards',
      title: 'Training Tips & Daily Practice',
      description: 'Discuss drills, fitness routines, and match-day preparation.',
      replies: 4
    },
    {
      id: 2,
      author: 'Rishi Edwards',
      title: 'Match Experience & Learnings',
      description: 'Share match stories, key moments, and lessons learned on the field.',
      replies: 4
    },
    {
      id: 3,
      author: 'Rishi Edwards',
      title: 'Injury Recovery & Player Care',
      description: 'Talk about injury prevention, recovery tips, and player health.',
      replies: 4
    },
    {
      id: 4,
      author: 'Rishi Edwards',
      title: 'Players Needed for Our Team',
      description: 'Post trial details, required positions, and team information.',
      replies: 4
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePostThread = () => {
    if (formData.title.trim() && formData.description.trim()) {
      const newThread = {
        id: threads.length + 1,
        author: 'You',
        title: formData.title,
        description: formData.description,
        replies: 0
      };
      setThreads([newThread, ...threads]);
      setFormData({
        category: 'All Discussion',
        title: '',
        description: ''
      });
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      category: 'All Discussion',
      title: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dashboardPy dashboardSpaceY">
      <div className="max-w-2xl ">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
            <p className="text-gray-600 text-sm">Connect, chat, and support each o  ther.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
          >
            Post a thread
          </button>
        </div>

        {/* Threads List */}
        <div className="space-y-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Author */}
              <div className="text-xs font-medium text-gray-500 mb-3">
                {thread.author}
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {thread.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {thread.description}
              </p>

              {/* Reply Count */}
              <div className="flex items-center text-gray-500 text-sm">
                <MessageSquare size={16} className="mr-2" />
                <span>{thread.replies} Reply</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal */}
          <div className="bg-white rounded-lg w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Start a Discussion</h2>
              <p className="text-sm text-gray-600 mt-1">
                Ask a question or share something with the community.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-700"
                >
                  <option>All Discussion</option>
                  <option>Training Tips</option>
                  <option>Match Experience</option>
                  <option>Injury Recovery</option>
                  <option>Player Recruitment</option>
                </select>
              </div>

              {/* Thread Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thread Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Write title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Write description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handlePostThread}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Post a thread
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}