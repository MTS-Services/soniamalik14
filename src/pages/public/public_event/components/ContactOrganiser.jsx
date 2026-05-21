import React, { useState } from 'react';

const ContactOrganiser = ({ event }) => {
  const [messageStatus, setMessageStatus] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessageStatus('Message sent — demo only');
    setTimeout(() => setMessageStatus(''), 3000);
  };

  if (!event) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Contact Organiser</h3>
      <div className="bg-[#E7F1F1] p-4 rounded-lg h-105 flex flex-col">
        <p className="text-base mb-4 text-[#1A1D1F]">Ask the organiser a question</p>
        <form onSubmit={handleSendMessage} className="flex flex-col flex-1">
          <textarea 
            className="w-full flex-1 bg-[#B5D5D2] rounded-xl p-4 text-base text-[#1A1D1F] placeholder-[#4A5565] border-none focus:ring-1 focus:ring-[#147B6B] resize-none mb-4"
            placeholder="Write your message"
            required
          ></textarea>
          <button 
            type="submit"
            className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-fit"
          >
            Send message
          </button>
        </form>
        {messageStatus && (
          <p className="text-xs text-[#147B6B] mt-2">{messageStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ContactOrganiser;
