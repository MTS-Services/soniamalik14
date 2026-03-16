import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';

const ContentNews = () => {
    const [newsSearchQuery, setNewsSearchQuery] = useState('');

    // Dummy Data exactly matching the image
    const newsData = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'New Morning Yoga Classes Added',
            description: "We've added new morning yoga sessions to help you start your day with calm energy and focus. Join now and."
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'Special Workshop This Weekend',
            description: "Join our special weekend workshop focused on flexibility, breathing, and relaxation. Limited seats available."
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5adee9f50?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'Improve Your Flexibility in 30 Days',
            description: "Discover how regular yoga practice can improve your flexibility and reduce stress in just 30 days."
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'New Morning Yoga Classes Added',
            description: "We've added new morning yoga sessions to help you start your day with calm energy and focus. Join now and."
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'Special Workshop This Weekend',
            description: "Join our special weekend workshop focused on flexibility, breathing, and relaxation. Limited seats available."
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5adee9f50?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'Improve Your Flexibility in 30 Days',
            description: "Discover how regular yoga practice can improve your flexibility and reduce stress in just 30 days."
        }
    ];

    const filteredNews = newsData.filter(news =>
        news.title.toLowerCase().includes(newsSearchQuery.toLowerCase())
    );

    return (
        <div className="font-sans">
            {/* News Top Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
                {/* Search Bar matching image styling */}
                <div className="flex items-center w-full sm:max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        value={newsSearchQuery}
                        onChange={(e) => setNewsSearchQuery(e.target.value)}
                        placeholder="Search by News name"
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder-gray-500"
                    />
                </div>
                
                {/* Add News Button */}
                <button className="flex items-center justify-center px-6 py-2.5 w-full sm:w-auto bg-[#0f766e] text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm whitespace-nowrap">
                    Add a new News
                </button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news) => (
                    // Added p-4 here to give padding around the entire card content, including the image
                    <div key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col hover:shadow-md transition-shadow">
                        
                        {/* Card Image - Added rounded-lg to curve the image inside the padded container */}
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-48 md:h-52 object-cover rounded-lg"
                        />
                        
                        {/* Card Content Area */}
                        <div className="pt-4 px-1 flex flex-col flex-grow">
                            
                            {/* Date */}
                            <p className="text-xs font-medium text-gray-400 mb-1.5">
                                {news.date}
                            </p>
                            
                            {/* Title */}
                            <h3 className="text-[17px] leading-tight font-bold text-gray-900 mb-2 line-clamp-2">
                                {news.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-sm text-gray-500 mb-6 line-clamp-2 flex-grow leading-relaxed">
                                {news.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-auto pt-2">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#0f766e]/30 text-[#0f766e] bg-[#f2fafa] rounded-md text-sm font-medium hover:bg-[#e2f3f1] transition-colors">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#0f766e]/30 text-[#0f766e] bg-[#f2fafa] rounded-md text-sm font-medium hover:bg-[#e2f3f1] transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
                
                {/* Empty State Fallback */}
                {filteredNews.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 text-sm">
                        No news articles found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentNews;