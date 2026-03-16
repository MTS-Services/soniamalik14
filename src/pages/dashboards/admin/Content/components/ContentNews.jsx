import React, { useState, useRef } from 'react';
import { Search, Edit, Trash2, ImagePlus, X } from 'lucide-react';

const ContentNews = () => {
    const [newsSearchQuery, setNewsSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null
    });
    const imageFileRef = useRef(null);

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
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
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
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
            date: 'Wed Dec 10 2025',
            title: 'Improve Your Flexibility in 30 Days',
            description: "Discover how regular yoga practice can improve your flexibility and reduce stress in just 30 days."
        }
    ];

    const filteredNews = newsData.filter(news =>
        news.title.toLowerCase().includes(newsSearchQuery.toLowerCase())
    );

    // Handle image upload for modal
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target?.result;
            setFormData(prev => ({
                ...prev,
                image: imageUrl
            }));
        };
        reader.readAsDataURL(file);
    };

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle save news
    const handleSaveNews = () => {
        if (formData.title.trim() && formData.description.trim()) {
            // Add your save logic here
            console.log('Saving news:', formData);
            // Reset form and close modal
            setFormData({ title: '', description: '', image: null });
            setIsModalOpen(false);
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setFormData({ title: '', description: '', image: null });
        setIsModalOpen(false);
    };

    // Handle upload image click
    const handleUploadImageClick = () => {
        imageFileRef.current?.click();
    };

    // Remove image from modal
    const removeModalImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null
        }));
    };

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
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-6 py-2.5 w-full sm:w-auto bg-[#0f766e] text-white text-sm font-semibold rounded-lg hover:bg-teal-800 transition-colors shadow-sm whitespace-nowrap"
                >
                    Add a new News
                </button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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

            {/* Hidden Image Input */}
            <input
                ref={imageFileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
            />

            {/* Add News Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900">News</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">
                            {/* News Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">News Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    placeholder="Enter membership title here"
                                    className="w-full bg-[#f5f5f5] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500"
                                />
                            </div>

                            {/* News Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">News Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    placeholder="Description"
                                    className="w-full h-24 bg-[#f5f5f5] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0f766e]/20 outline-none resize-none text-gray-800 placeholder-gray-500"
                                />
                            </div>

                            {/* Upload Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Upload Image</label>
                                <div
                                    onClick={handleUploadImageClick}
                                    className="w-full h-32 bg-[#f5f5f5] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#eeeeee] transition-colors relative overflow-hidden group border border-gray-200"
                                >
                                    {formData.image ? (
                                        <>
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeModalImage();
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                                            >
                                                <X className="w-4 h-4" strokeWidth={2} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <ImagePlus className="w-7 h-7 text-[#0f766e] mb-2 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                                            <span className="text-xs font-medium text-gray-600">Upload image</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-200 p-6 flex gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNews}
                                className="flex-1 py-2 px-4 bg-[#0f766e] text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
                            >
                                Save News
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentNews;