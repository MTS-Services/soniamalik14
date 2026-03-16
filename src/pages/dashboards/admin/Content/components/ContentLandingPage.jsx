import React from 'react';
import { ImagePlus, Plus } from 'lucide-react';

const ContentLandingPage = () => {
    return (
        <div className="space-y-8 font-sans pb-12">
            
            {/* 1. Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">Hero section</h2>
                
                {/* Image Upload Area */}
                <div className="w-full h-64 md:h-80 bg-[#f5f5f5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#eeeeee] transition-colors mb-6 group">
                    <ImagePlus className="w-10 h-10 text-[#0f766e] mb-3 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-gray-700">Upload Hero image</span>
                </div>
                
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-base font-medium text-gray-900 mb-2">Tittle</label>
                        <input 
                            type="text" 
                            placeholder="Write title" 
                            className="w-full bg-[#f5f5f5] border-none rounded-lg px-4 py-3.5 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500" 
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-900 mb-2">Subheadline</label>
                        <textarea 
                            placeholder="Write your subheadline" 
                            className="w-full h-32 bg-[#f5f5f5] border-none rounded-lg px-4 py-3.5 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none resize-none text-gray-800 placeholder-gray-500" 
                        />
                    </div>
                </div>
            </div>

            {/* 2. Explore Essa Hub Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">Explore Essa Hub</h2>
                
                {/* Section Inputs */}
                <div className="space-y-6 mb-10">
                    <div>
                        <label className="block text-base font-medium text-gray-900 mb-2">Section Tittle</label>
                        <input 
                            type="text" 
                            placeholder="Write title" 
                            className="w-full bg-[#f5f5f5] border-none rounded-lg px-4 py-3.5 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500" 
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-900 mb-2">Section Subheadline</label>
                        <textarea 
                            placeholder="Write your subheadline" 
                            className="w-full h-32 bg-[#f5f5f5] border-none rounded-lg px-4 py-3.5 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none resize-none text-gray-800 placeholder-gray-500" 
                        />
                    </div>
                </div>
                
                {/* Cards Area */}
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Existing Card Item */}
                    <div className="bg-[#f4f4f4] p-5 rounded-xl border border-gray-100">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-base font-medium text-gray-900 mb-2">Card Tittle</label>
                                <input 
                                    type="text" 
                                    placeholder="Write title" 
                                    className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500 shadow-sm" 
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-900 mb-2">Card Description</label>
                                <input 
                                    type="text" 
                                    placeholder="Description" 
                                    className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500 shadow-sm" 
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-900 mb-2">Image</label>
                                <div className="w-full h-36 bg-white border border-gray-100 shadow-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                                    <ImagePlus className="w-7 h-7 text-[#0f766e] mb-2 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                                    <span className="text-xs font-medium text-gray-600">Upload Hero image</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add New Card Button */}
                    <div className="bg-[#f5f5f5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#eeeeee] transition-colors min-h-[340px] group border-2 border-dashed border-gray-200">
                        <Plus className="w-8 h-8 text-[#0f766e] mb-3 transition-transform group-hover:scale-110" strokeWidth={2} />
                        <span className="text-sm font-medium text-gray-700">Add new card</span>
                    </div>
                </div>
            </div>

            {/* 3. Find Your Sport Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">Find Your Sport</h2>
                
                {/* Section Inputs */}
                <div className="space-y-6 mb-10">
                    <div>
                        <label className="block text-base font-medium text-gray-900 mb-2">Section Tittle</label>
                        <input 
                            type="text" 
                            placeholder="Write title" 
                            className="w-full bg-[#f5f5f5] border-none rounded-lg px-4 py-3.5 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500" 
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-900 mb-2">Section Subheadline</label>
                        <textarea 
                            placeholder="Write your subheadline" 
                            className="w-full h-32 bg-[#f5f5f5] border-none rounded-lg px-4 py-3.5 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none resize-none text-gray-800 placeholder-gray-500" 
                        />
                    </div>
                </div>
                
                {/* Cards Area */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Card</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Existing Card Item (No description field in this section) */}
                    <div className="bg-[#f4f4f4] p-5 rounded-xl border border-gray-100 flex flex-col justify-between min-h-[250px]">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-base font-medium text-gray-900 mb-2">Card Tittle</label>
                                <input 
                                    type="text" 
                                    placeholder="Write title" 
                                    className="w-full bg-white border border-gray-100 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[#0f766e]/20 outline-none text-gray-800 placeholder-gray-500 shadow-sm" 
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-900 mb-2">Image</label>
                                <div className="w-full h-28 bg-white border border-gray-100 shadow-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                                    <ImagePlus className="w-7 h-7 text-[#0f766e] mb-2 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                                    <span className="text-xs font-medium text-gray-600">Upload Hero image</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add New Card Button */}
                    <div className="bg-[#f5f5f5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#eeeeee] transition-colors min-h-[250px] group border-2 border-dashed border-gray-200">
                        <Plus className="w-8 h-8 text-[#0f766e] mb-3 transition-transform group-hover:scale-110" strokeWidth={2} />
                        <span className="text-sm font-medium text-gray-700">Add new card</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContentLandingPage;