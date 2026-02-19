import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button';
import { useEvent } from '../../context/EventContext';

const EventModal = ({ isOpen, onClose, initialData = null, mode = 'create' }) => {
    const { createEvent, updateEvent, createLoading, updateLoading } = useEvent();
    const [formData, setFormData] = useState({
        eventTitle: '',
        sportType: '',
        eventType: 'TRAINING',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        venueName: '',
        city: '',
        fullAddress: '',
        googleMapLinks: '',
        minAge: '18',
        maxParticipant: '20',
        skillLevel: 'Beginner',
        organizerName: '',
        organizerPhone: '',
        organizerEmail: '',
        image: null,
    });

    // Update form data when initialData changes (for edit mode)
    useEffect(() => {
        if (initialData && mode === 'edit') {
            setFormData({
                eventTitle: initialData.title || '',
                sportType: initialData.sportType || '',
                eventType: initialData.eventType || initialData.type || 'TRAINING',
                description: initialData.description || '',
                startDate: initialData.startDate || initialData.date || '',
                endDate: initialData.endDate || '',
                startTime: initialData.startTime || '',
                endTime: initialData.endTime || '',
                venueName: initialData.venueName || '',
                city: initialData.city || '',
                fullAddress: initialData.fullAddress || initialData.location || '',
                googleMapLinks: initialData.googleMapLink || initialData.googleMapLinks || '',
                minAge: initialData.minAge || '18',
                maxParticipant: initialData.maxParticipants || initialData.maxParticipant || '20',
                skillLevel: initialData.skillLevel ? (typeof initialData.skillLevel === 'string' ? initialData.skillLevel.charAt(0).toUpperCase() + initialData.skillLevel.slice(1).toLowerCase() : 'Beginner') : 'Beginner',
                organizerName: initialData.organizerName || '',
                organizerPhone: initialData.organizerPhone || '',
                organizerEmail: initialData.organizerEmail || '',
                image: initialData.image || null,
            });
        } else if (mode === 'create') {
            // Reset form for create mode
            setFormData({
                eventTitle: '',
                sportType: '',
                eventType: 'TRAINING',
                description: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                venueName: '',
                city: '',
                fullAddress: '',
                googleMapLinks: '',
                minAge: '18',
                maxParticipant: '20',
                skillLevel: 'Beginner',
                organizerName: '',
                organizerPhone: '',
                organizerEmail: '',
                image: null,
            });
        }
    }, [initialData, mode, isOpen]);

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields (image is optional)
        const newErrors = {};
        Object.entries(formData).forEach(([key, val]) => {
            // Skip image validation - it's optional
            if (key === 'image') return;

            if (val === null) {
                newErrors[key] = 'This field is required';
            } else if (typeof val === 'string' && val.trim() === '') {
                newErrors[key] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.warn('Validation errors:', newErrors);
            // Show alert notification for user feedback
            alert(`Please fill all required fields. Missing: ${Object.keys(newErrors).length} field(s)`);
            return;
        }

        // Prepare FormData for API submission
        const payload = new FormData();
        payload.append('title', formData.eventTitle);
        payload.append('sportType', formData.sportType);
        payload.append('eventType', formData.eventType);
        payload.append('description', formData.description);
        payload.append('startDate', formData.startDate);
        payload.append('endDate', formData.endDate);
        payload.append('startTime', formData.startTime);
        payload.append('endTime', formData.endTime);
        payload.append('venueName', formData.venueName);
        payload.append('city', formData.city);
        payload.append('fullAddress', formData.fullAddress);
        payload.append('googleMapLink', formData.googleMapLinks);
        payload.append('minAge', formData.minAge);
        payload.append('maxParticipants', formData.maxParticipant);
        payload.append('skillLevel', formData.skillLevel.toUpperCase());
        payload.append('organizerName', formData.organizerName);
        payload.append('organizerPhone', formData.organizerPhone);
        payload.append('organizerEmail', formData.organizerEmail);

        // Debug: Log FormData entries
        console.log('Submitting event with data:', Object.fromEntries(payload.entries()));

        // Add image if present
        if (formData.image instanceof File) {
            payload.append('image', formData.image);
        }

        // Call create or update based on mode
        let result;
        if (mode === 'edit' && initialData?.id) {
            result = await updateEvent(initialData.id, payload);
        } else {
            result = await createEvent(payload);
        }

        if (result.success) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 sm:mx-6 flex flex-col max-h-[80vh]">
                {/* Sticky Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {mode === 'edit' ? 'Edit Event' : 'Event Identity'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[#000000] bg-[#D9D9D9] rounded-full p-1 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                    <form id="event-form" onSubmit={handleSubmit} className="space-y-4">
                        {/* Event Title & Sport Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                                <input
                                    type="text"
                                    placeholder="enter event title"
                                    value={formData.eventTitle}
                                    onChange={(e) => handleChange('eventTitle', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.eventTitle && <p className="text-sm text-red-600 mt-1">{errors.eventTitle}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sport Type</label>
                                <input
                                    type="text"
                                    placeholder="e.g Cricket, Football"
                                    value={formData.sportType}
                                    onChange={(e) => handleChange('sportType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.sportType && <p className="text-sm text-red-600 mt-1">{errors.sportType}</p>}
                            </div>
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                            <select
                                value={formData.eventType}
                                onChange={(e) => handleChange('eventType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            >
                                <option>MATCH</option>
                                <option>TOURNAMENT</option>
                                <option>TRIAL</option>
                                <option>TRAINING</option>
                                <option>WORKSHOP</option>
                                <option>SEMINAR</option>
                                <option>COMPETITION</option>
                                <option>MEETUP</option>
                            </select>
                            {errors.eventType && <p className="text-sm text-red-600 mt-1">{errors.eventType}</p>}
                        </div>

                        {/* Full Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                            <textarea
                                placeholder="Describe your event in details"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary resize-none"
                            />
                            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        {/* Start Date & End Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleChange('endDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Start Time & End Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleChange('startTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.startTime && <p className="text-sm text-red-600 mt-1">{errors.startTime}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleChange('endTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.endTime && <p className="text-sm text-red-600 mt-1">{errors.endTime}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Venue Name & City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
                                <input
                                    type="text"
                                    placeholder="venue name"
                                    value={formData.venueName}
                                    onChange={(e) => handleChange('venueName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.venueName && <p className="text-sm text-red-600 mt-1">{errors.venueName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                            </div>
                        </div>

                        {/* Full Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                            <input
                                type="text"
                                placeholder="enter full address"
                                value={formData.fullAddress}
                                onChange={(e) => handleChange('fullAddress', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            />
                            {errors.fullAddress && <p className="text-sm text-red-600 mt-1">{errors.fullAddress}</p>}
                        </div>

                        {/* Google Map Links */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Map links</label>
                            <input
                                type="text"
                                placeholder="enter google map links"
                                value={formData.googleMapLinks}
                                onChange={(e) => handleChange('googleMapLinks', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            />
                            {errors.googleMapLinks && <p className="text-sm text-red-600 mt-1">{errors.googleMapLinks}</p>}
                        </div>

                        {/* Min Age & Maximum Participant */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
                                <input
                                    type="text"
                                    placeholder="18"
                                    value={formData.minAge}
                                    onChange={(e) => handleChange('minAge', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.minAge && <p className="text-sm text-red-600 mt-1">{errors.minAge}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Participant</label>
                                <input
                                    type="text"
                                    placeholder="20"
                                    value={formData.maxParticipant}
                                    onChange={(e) => handleChange('maxParticipant', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.maxParticipant && <p className="text-sm text-red-600 mt-1">{errors.maxParticipant}</p>}
                            </div>
                        </div>

                        {/* Skill Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                            <div className="flex gap-2 flex-wrap">
                                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => handleChange('skillLevel', level)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none text-center min-w-[110px] ${formData.skillLevel === level
                                            ? 'bg-btn-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                            {errors.skillLevel && <p className="text-sm text-red-600 mt-1">{errors.skillLevel}</p>}
                        </div>

                        {/* Organizer Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organizer Name</label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    value={formData.organizerName}
                                    onChange={(e) => handleChange('organizerName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.organizerName && <p className="text-sm text-red-600 mt-1">{errors.organizerName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organizer Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    value={formData.organizerPhone}
                                    onChange={(e) => handleChange('organizerPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.organizerPhone && <p className="text-sm text-red-600 mt-1">{errors.organizerPhone}</p>}
                            </div>
                        </div>

                        {/* Organizer Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Organizer Email</label>
                            <input
                                type="email"
                                placeholder="enter your email"
                                value={formData.organizerEmail}
                                onChange={(e) => handleChange('organizerEmail', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            />
                            {errors.organizerEmail && <p className="text-sm text-red-600 mt-1">{errors.organizerEmail}</p>}
                        </div>

                        {/* Upload Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                                <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-green-600 font-medium text-sm mb-1">Upload Image</p>
                                <p className="text-gray-400 text-xs">JPEG files accepted. Max 100MB</p>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg"
                                    onChange={(e) => handleChange('image', e.target.files[0])}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="mt-3 inline-block cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700"
                                >
                                    Choose File
                                </label>
                                {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image}</p>}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Sticky Footer */}
                <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-lg z-10">
                    <Button
                        type="submit"
                        form="event-form"
                        variant="primary"
                        className="w-full rounded-lg py-3"
                        disabled={createLoading || updateLoading}
                    >
                        {createLoading || updateLoading ? 'Submitting...' : mode === 'edit' ? 'Update Event' : 'Submit For Approval'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
