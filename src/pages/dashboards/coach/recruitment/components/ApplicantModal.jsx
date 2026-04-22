import React from 'react';
import { X } from 'lucide-react';

const ApplicantModal = ({ enquiry, onClose }) => {
  if (!enquiry) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8 relative mx-2">
        <button
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <h2 className="text-xl font-semibold mb-2">Applicant Details</h2>
        <div className="mb-2 font-semibold text-lg text-gray-900">{enquiry.name}</div>
        <div className="mb-1 font-semibold text-gray-900 text-base">{enquiry.phone}</div>
        <div className="mb-1 font-semibold text-gray-900 text-base">{enquiry.email}</div>
        {enquiry.event && (
          <div className="mb-3 font-semibold text-gray-900 text-base">
            Event Name: <span className="font-semibold">{enquiry.event}</span>
          </div>
        )}
        <div className="mb-2 text-gray-800 text-[16px] whitespace-pre-line">
          {enquiry.msg}
        </div>
        {enquiry.date && (
          <div className="text-gray-500 text-sm mt-2">{enquiry.date}</div>
        )}
      </div>
    </div>
  );
};

export default ApplicantModal;
