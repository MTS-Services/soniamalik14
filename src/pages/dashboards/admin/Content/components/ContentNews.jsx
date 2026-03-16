import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';

const ContentNews = () => {
    const [newsSearchQuery, setNewsSearchQuery] = useState('');

    // Dummy Data for News Tab
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
        <div>
            {/* News Top Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                <div className="flex items-center w-full max-w-xl bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f766e]/20 transition-all">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        value={newsSearchQuery}
                        onChange={(e) => setNewsSearchQuery(e.target.value)}
                        placeholder="Search by News name"
                        className="bg-transparent border-none outline-none w-full text-base text-gray-700 placeholder-gray-400"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-[#0f766e] text-white text-base font-medium rounded-lg hover:bg-teal-800 transition-colors shadow-sm whitespace-nowrap">
                    Add a new News
                </button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news) => (
                    <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-48 md:h-52 object-cover"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                            <p className="text-xs font-medium text-gray-400 mb-2">{news.date}</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                            <p className="text-sm text-gray-500 mb-6 line-clamp-3 flex-grow">{news.description}</p>

                            <div className="flex gap-3 mt-auto">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#0f766e]/30 text-[#0f766e] bg-[#f4faf9] rounded-lg text-sm font-semibold hover:bg-[#e6f5f3] transition-colors">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#0f766e]/30 text-[#0f766e] bg-[#f4faf9] rounded-lg text-sm font-semibold hover:bg-[#e6f5f3] transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredNews.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        No news articles found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentNews;
