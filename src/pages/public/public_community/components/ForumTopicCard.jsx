import React, { useState } from 'react';
import { ThumbsUp, Heart, MessageSquare, Send, MapPin, Calendar, Clock } from 'lucide-react';

const ForumTopicCard = ({ topic, isLoggedIn = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Merging passed topic data with fallbacks to match the UI in your screenshots
  const {
    author = 'Ralph Edwards',
    title = 'How to balance strength training with competitive netball?',
    description = "I'm starting to play more on asphalt courts and my current trainers are wearing down fast. Any recommendations for durable soles?",
    replies = 4,
    avatar,
    tags = ['Football', 'New to sport'],
    likes = 4,
    hearts = 4,
    
    // Optional Event/Match specific fields (shown in image 2)
    location = topic.location || null, 
    date = topic.date || '1 Mar 2026',
    time = topic.time || '1 Mar 2026',
    
    // Mock comments for the expanded state
    comments = [
      { author: 'Ralph Edwards', text: 'I usually train for 40-45 minutes a day, focusing on ball control and passing. Even simple drills help a lot when done consistently.' },
      { author: 'Ralph Edwards', text: 'Morning stretching and light cardio have really improved my flexibility and reduced muscle soreness after matches.' },
      { author: 'Ralph Edwards', text: "I watch professional women's matches to learn positioning and decision-making. It helps me understand the game better." }
    ]
  } = topic || {};

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 transition-all">
      {/* Header: Avatar & Name */}
      <div className="flex items-center gap-2.5 mb-4">
        <img
          src={'/images/login/image_2.jpg'} 
          alt={author}
          className="w-8 h-8 rounded-full object-cover border border-gray-100"
        />
        <span className="text-base text-gray-700 font-medium">
          {author}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="bg-[#EBEBEB] text-[#333333] px-3 py-1 text-sm rounded font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Conditional Event Info (Shows if location exists, matching Image 2 layout) */}
      {location && (
        <div className="flex flex-wrap items-center justify-between text-[#4A5568] text-sm mb-4 font-medium">
          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-500" /> {location}</div>
          <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-500" /> {date}</div>
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-500" /> {time}</div>
        </div>
      )}

      {/* Topic Title */}
      <h3 className="text-[18px] md:text-xl font-bold text-[#1A1D1F] mb-2 leading-snug">
        {title}
      </h3>

      {/* Description (Only render if it exists) */}
      {description && (
        <p className="text-[#4A5568] text-base mb-5 leading-relaxed">
          {description}
        </p>
      )}

      {/* Conditional Checkboxes (For Event posts like Image 2) */}
      {location && isExpanded && (
        <div className="flex items-center gap-5 mb-5 text-[13px] text-gray-600 font-medium border-b border-gray-100 pb-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded-sm border-gray-300 text-[#147B6B] focus:ring-[#147B6B]" /> 
            Help found
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded-sm border-gray-300 text-[#147B6B] focus:ring-[#147B6B]" /> 
            Still looking
          </label>
        </div>
      )}

      {/* Footer / Interaction Bar */}
      {!isExpanded && (
        <div className="border-t border-gray-100 pt-4 mt-2 flex items-center gap-4 text-[13px] text-gray-500 font-medium">
          <button className="flex items-center gap-1.5 text-base hover:text-gray-800 transition-colors">
            <ThumbsUp className="w-4 h-4" /> {likes}
          </button>
          
          <button className="flex items-center gap-1.5 text-base hover:text-gray-800 transition-colors">
            <Heart className="w-4 h-4" /> {hearts}
          </button>
          
          <span className="text-gray-300">|</span>
          
          <button 
            onClick={() => setIsExpanded(true)} 
            className="flex items-center gap-1.5 text-base hover:text-gray-800 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" /> {replies} Reply
          </button>
        </div>
      )}

      {/* Expanded Reply Section */}
      {isExpanded && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="text-base font-bold text-[#1A1D1F] mb-4">Reply</h4>
          
          {/* Comments List */}
          <div className="space-y-3 mb-4">
            {comments.map((comment, idx) => (
              <div key={idx} className="bg-[#F6F6F6] p-4 rounded-lg">
                <div className="text-base font-medium text-gray-800 mb-1.5">{comment.author}</div>
                <p className="text-base text-[#4A5568] leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Reply Input Box */}
          <div className="flex items-center gap-3 bg-[#F0F5F4] p-2 rounded-lg mt-2">
            <input 
              type="text" 
              placeholder="Write your reply" 
              className="w-full bg-transparent border-none focus:ring-0 text-[14px] px-3 placeholder-gray-500 outline-none text-[#1A1D1F]"
            />
            <button 
              onClick={() => setIsExpanded(false)} // Adding toggle logic back to close if needed
              className="bg-[#147B6B] p-2.5 rounded-lg text-white shrink-0 hover:bg-[#0D655D] transition-colors"
            >
              <Send className="w-5 h-5 ml-[-2px] mt-[1px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumTopicCard;