import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button';
import { useEvent } from '../../context/EventContext';
import { toast } from 'react-toastify';

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
        skillLevel: 'New To Sport',
        costType: 'Free',
        price: '',
        responseMethods: ['Add booking link'],
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
                skillLevel: initialData.skillLevel || 'New To Sport',
                costType: initialData.costType || 'Free',
                price: initialData.price || '',
                responseMethods: Array.isArray(initialData.responseMethods)
                    ? initialData.responseMethods
                    : ['Add booking link'],
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
                skillLevel: 'New To Sport',
                costType: 'Free',
                price: '',
                responseMethods: ['Add booking link'],
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

    const toggleResponseMethod = (method) => {
        setFormData((prev) => {
            const hasMethod = prev.responseMethods.includes(method);
            return {
                ...prev,
                responseMethods: hasMethod
                    ? prev.responseMethods.filter((item) => item !== method)
                    : [...prev.responseMethods, method],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields (image is optional)
        const requiredFields = [
            'eventTitle',
            'sportType',
            'eventType',
            'description',
            'startDate',
            'endDate',
            'startTime',
            'endTime',
            'venueName',
            'city',
            'fullAddress',
            'googleMapLinks',
            'skillLevel',
            'costType',
        ];

        const newErrors = {};
        requiredFields.forEach((key) => {
            const val = formData[key];
            if (val === null || (typeof val === 'string' && val.trim() === '')) {
                newErrors[key] = 'This field is required';
            }
        });

        if (formData.costType === 'Paid' && String(formData.price || '').trim() === '') {
            newErrors.price = 'Price is required for paid events';
        }

        if (!Array.isArray(formData.responseMethods) || formData.responseMethods.length === 0) {
            newErrors.responseMethods = 'Select at least one response option';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.warn('Validation errors:', newErrors);
            // Use toast instead of blocking alert for user feedback
            toast.error(`Please fill all required fields. Missing: ${Object.keys(newErrors).length} field(s)`);
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
        payload.append('minAge', formData.minAge || '18');
        payload.append('maxParticipants', formData.maxParticipant || '20');
        payload.append('skillLevel', formData.skillLevel);
        payload.append('costType', formData.costType);
        payload.append('price', formData.costType === 'Paid' ? formData.price : '0');
        payload.append('responseMethods', formData.responseMethods.join(', '));
        payload.append('organizerName', formData.organizerName || 'N/A');
        payload.append('organizerPhone', formData.organizerPhone || 'N/A');
        payload.append('organizerEmail', formData.organizerEmail || 'no-reply@example.com');

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-4"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#DCE7E6] bg-white shadow-2xl">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E3EBEA] bg-white px-5 py-4 sm:px-6">
                    <h2 className="text-2xl font-semibold text-[#1D1D1D]">
                        {mode === 'edit' ? 'Edit Event' : 'Event Identity'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-[#D9D9D9] p-1 text-[#000000] transition-colors hover:bg-[#CFCFCF]"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto bg-[#F8FAFB] p-4 sm:p-6">
                    <form id="event-form" onSubmit={handleSubmit} className="space-y-5">
                        {/* Event Title & Sport Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Event Title</label>
                                <input
                                    type="text"
                                    placeholder="enter event title"
                                    value={formData.eventTitle}
                                    onChange={(e) => handleChange('eventTitle', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.eventTitle && <p className="text-base text-red-600 mt-1">{errors.eventTitle}</p>}
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Sport Type</label>
                                <input
                                    type="text"
                                    placeholder="e.g Cricket, Football"
                                    value={formData.sportType}
                                    onChange={(e) => handleChange('sportType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.sportType && <p className="text-base text-red-600 mt-1">{errors.sportType}</p>}
                            </div>
                        </div>

                        {/* Event Type */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">Event Type</label>
                            <select
                                value={formData.eventType}
                                onChange={(e) => handleChange('eventType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
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
                            {errors.eventType && <p className="text-base text-red-600 mt-1">{errors.eventType}</p>}
                        </div>

                        {/* Full Description */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">Full Description</label>
                            <textarea
                                placeholder="Describe your event in details"
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary resize-none"
                            />
                            {errors.description && <p className="text-base text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        {/* Start Date & End Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Start Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.startDate && <p className="text-base text-red-600 mt-1">{errors.startDate}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">End Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleChange('endDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.endDate && <p className="text-base text-red-600 mt-1">{errors.endDate}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Start Time & End Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Start Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => handleChange('startTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.startTime && <p className="text-base text-red-600 mt-1">{errors.startTime}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">End Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleChange('endTime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                    />
                                    {errors.endTime && <p className="text-base text-red-600 mt-1">{errors.endTime}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Venue Name & City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Venue Name</label>
                                <input
                                    type="text"
                                    placeholder="venue name"
                                    value={formData.venueName}
                                    onChange={(e) => handleChange('venueName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.venueName && <p className="text-base text-red-600 mt-1">{errors.venueName}</p>}
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                                />
                                {errors.city && <p className="text-base text-red-600 mt-1">{errors.city}</p>}
                            </div>
                        </div>

                        {/* Full Address */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1"> Location</label>
                            <input
                                type="text"
                                placeholder="enter full address"
                                value={formData.fullAddress}
                                onChange={(e) => handleChange('fullAddress', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            />
                            {errors.fullAddress && <p className="text-base text-red-600 mt-1">{errors.fullAddress}</p>}
                        </div>

                        {/* Google Map Links */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">Google Map links</label>
                            <input
                                type="text"
                                placeholder="enter google map links"
                                value={formData.googleMapLinks}
                                onChange={(e) => handleChange('googleMapLinks', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            />
                            {errors.googleMapLinks && <p className="text-base text-red-600 mt-1">{errors.googleMapLinks}</p>}
                        </div>

                        {/* Who it's suitable for */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Who it&apos;s suitable for</label>
                            <div className="flex flex-wrap gap-2">
                                {['New To Sport', 'Open to all levels', 'Regular players', 'Coaches', 'Referees'].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => handleChange('skillLevel', level)}
                                        className={`rounded-sm px-4 py-2 text-base font-medium transition-colors ${formData.skillLevel === level
                                            ? 'bg-[#0F766E] text-white'
                                            : 'bg-[#A7C8C7] text-[#1F2B2A] hover:bg-[#97BCBA]'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                            {errors.skillLevel && <p className="text-base text-red-600 mt-1">{errors.skillLevel}</p>}
                        </div>

                        {/* Cost and Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-end">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-2">Cost</label>
                                <div className="flex gap-2">
                                    {['Free', 'Paid'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handleChange('costType', type)}
                                            className={`rounded-sm px-5 py-2 text-base font-medium transition-colors ${formData.costType === type
                                                ? 'bg-[#0F766E] text-white'
                                                : 'bg-[#A7C8C7] text-[#1F2B2A] hover:bg-[#97BCBA]'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-2">Price</label>
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                    disabled={formData.costType !== 'Paid'}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-btn-primary disabled:cursor-not-allowed disabled:bg-gray-100"
                                />
                                {errors.price && <p className="text-base text-red-600 mt-1">{errors.price}</p>}
                            </div>
                        </div>

                        {/* Response methods */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">
                                How would you like participants to respond? (one or more can be selected)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {['Add booking link', 'Allow users to register interest', 'Allow users to ask a question'].map((method) => {
                                    const selected = formData.responseMethods.includes(method);
                                    return (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => toggleResponseMethod(method)}
                                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-medium transition-colors ${selected
                                                ? 'bg-[#A7C8C7] text-[#123634]'
                                                : 'bg-[#D6EBEA] text-[#2A4D4B] hover:bg-[#C2E0DE]'
                                                }`}
                                        >
                                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-current text-xs">
                                                {selected ? '✓' : ''}
                                            </span>
                                            {method}
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.responseMethods && <p className="text-base text-red-600 mt-1">{errors.responseMethods}</p>}
                        </div>

                        {/* Booking Link */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Booking Link</label>
                            <input
                                type="text"
                                placeholder="enter booking link"
                                value={formData.googleMapLinks}
                                onChange={(e) => handleChange('googleMapLinks', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-btn-primary"
                            />
                            {errors.googleMapLinks && <p className="text-base text-red-600 mt-1">{errors.googleMapLinks}</p>}
                        </div>

                        {/* Upload Image */}
                        <div>
                            <label className="relative block cursor-pointer rounded-lg border-2 border-dashed border-gray-400 p-10 text-center hover:bg-gray-50">
                                <Upload className="mx-auto mb-3 h-10 w-10 text-[#22A547]" />
                                <p className="text-xl font-medium text-[#22A547]">Upload Image</p>
                                <p className="mt-1 text-base text-gray-500">JPEG files accepted. Max 100MB</p>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={(e) => handleChange('image', e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                            </label>
                            {errors.image && <p className="text-base text-red-600 mt-2">{errors.image}</p>}
                        </div>
                    </form>
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 z-10 border-t border-[#E3EBEA] bg-white px-5 py-4 sm:px-6">
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-[#0F766E] px-5 py-2.5 text-sm font-medium text-[#0F766E] hover:bg-[#F0FAF9]"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            form="event-form"
                            variant="primary"
                            className="rounded-lg px-6 py-2.5 text-sm font-semibold"
                            disabled={createLoading || updateLoading}
                        >
                            {createLoading || updateLoading ? 'Submitting...' : mode === 'edit' ? 'Update Event' : 'Submit For Approval'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
