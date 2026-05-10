import React, { useEffect, useMemo, useState } from 'react';
import { Upload, X } from 'lucide-react';

const professionOptions = [
    'Physiotherapist',
    'Sports Massage Therapist',
    'Strength & Conditioning Coach',
    'Nutritionist',
    'Mental Health & Wellbeing',
    'Coach / Trainer',
    'Other',
];

const sessionTypeOptions = ['In clinic', 'At-home visits', 'Online video'];

const sportOptions = [
    'Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel',
    'Tennis', 'Badminton', 'Golf', 'Running', 'Other',
];

const respondMethodOptions = [
    'Add booking link',
    'Allow users to register interest',
    'By default',
];

const createInitialForm = () => ({
    organisationName: '',
    contactPerson: '',
    image: null,
    clinicName: '',
    addressLine1: '',
    town: '',
    postcode: '',
    profession: [],
    listingHeadline: '',
    aboutService: '',
    sessionTypes: [],
    sports: [],
    professionalRegistration: '',
    insurance: null,
    respondMethod: [],
    bookingLink: '',
});

const CreateRecruitmentModal = ({ isOpen, onClose, initialData = null, mode = 'create' }) => {
    const [form, setForm] = useState(createInitialForm);

    useEffect(() => {
        if (!isOpen) return;

        const frameId = window.requestAnimationFrame(() => {
            if (initialData && mode === 'edit') {
                setForm((current) => ({
                    ...current,
                    organisationName: initialData.organisationName || current.organisationName,
                    contactPerson: initialData.contactPerson || current.contactPerson,
                    image: initialData.image || current.image,
                    clinicName: initialData.clinicName || current.clinicName,
                    addressLine1: initialData.addressLine1 || current.addressLine1,
                    town: initialData.town || current.town,
                    postcode: initialData.postcode || current.postcode,
                    profession: initialData.profession || current.profession,
                    listingHeadline: initialData.listingHeadline || current.listingHeadline,
                    aboutService: initialData.aboutService || current.aboutService,
                    sessionTypes: initialData.sessionTypes || current.sessionTypes,
                    sports: initialData.sports || current.sports,
                    professionalRegistration: initialData.professionalRegistration || current.professionalRegistration,
                    insurance: initialData.insurance ?? current.insurance,
                    respondMethod: initialData.respondMethod || current.respondMethod,
                    bookingLink: initialData.bookingLink || current.bookingLink,
                }));
                return;
            }
            setForm(createInitialForm());
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [isOpen, initialData, mode]);

    const imagePreviewUrl = useMemo(() => {
        if (!form.image) return '';
        if (form.image instanceof File) return URL.createObjectURL(form.image);
        if (typeof form.image === 'string') return form.image;
        return '';
    }, [form.image]);

    useEffect(() => {
        return () => {
            if (form.image instanceof File && imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        };
    }, [form.image, imagePreviewUrl]);

    if (!isOpen) return null;

    const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

    const toggleArrayField = (field, value) => {
        setForm((s) => {
            const arr = s[field] || [];
            if (arr.includes(value)) return { ...s, [field]: arr.filter((a) => a !== value) };
            return { ...s, [field]: [...arr, value] };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.organisationName) return alert('Please enter organisation name');
        console.log('Create recruitment payload:', form);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(38,38,38,0.8)] backdrop-blur-sm"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-[#f9fafb] rounded-lg shadow-xl w-full max-w-3xl mx-4 sm:mx-6 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="text-[24px] font-semibold text-[#1a1a1a] leading-8" style={{ fontFamily: 'Geist, sans-serif' }}>Add Listing</h2>
                    <button onClick={onClose} className="bg-[#d9d9d9] rounded-[18px] p-1.5 flex items-center justify-center">
                        <X className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 px-4 md:px-6 pb-6">
                    <form id="create-recruitment-form" onSubmit={handleSubmit} className="space-y-3">

                        {/* Section 1: Service Provider Listing Form */}
                        <div className="bg-white rounded-lg p-4 space-y-4">
                            <div>
                                <p className="text-[18px] text-[#0a0a0a] leading-[28.8px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    Service Provider Listing Form
                                </p>
                                <p className="text-[16px] text-[#777] leading-6 mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    Join our community of professional support services aimed at empowering women in sport and fitness.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Provider / Business Name
                                    </label>
                                    <input
                                        value={form.organisationName}
                                        onChange={(e) => handleChange('organisationName', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="e.g. Richmond Women's Physios"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                        Contact Name
                                    </label>
                                    <input
                                        value={form.contactPerson}
                                        onChange={(e) => handleChange('contactPerson', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="Enter name"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                            </div>

                            {/* Logo Upload */}
                            <div className="space-y-2">
                                <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Logo</label>
                                <div className="border border-dashed border-black rounded-lg flex flex-col items-center justify-center h-59.5 px-6 text-center">
                                    {imagePreviewUrl ? (
                                        <img src={imagePreviewUrl} alt="Logo preview" className="h-32 w-32 rounded-md object-cover mb-3" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1">
                                            <Upload className="w-6 h-6 text-[#28a844]" />
                                            <p className="text-[16px] font-medium text-[#28a844] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                                Upload Image
                                            </p>
                                            <p className="text-[12px] text-[#626262] leading-4.75" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                                JPEG files accepted. Max 100MB
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="create-recruitment-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleChange('image', e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <label htmlFor="create-recruitment-image" className="mt-3 inline-block cursor-pointer px-4 py-2 bg-gray-100 rounded-md text-sm">
                                        {imagePreviewUrl ? 'Change File' : 'Choose File'}
                                    </label>
                                    {form.image && (
                                        <p className="mt-1 max-w-xs truncate text-[12px] text-gray-500" title={form.image?.name || ''}>
                                            {form.image?.name || 'Current image'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Location Details */}
                        <div className="bg-white rounded-lg p-4 space-y-4">
                            <p className="text-[18px] text-[#0a0a0a] leading-[28.8px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Location Details
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Clinic Name</label>
                                    <input
                                        value={form.clinicName}
                                        onChange={(e) => handleChange('clinicName', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="e.g. The Wellness Centre"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Address Line 1</label>
                                    <input
                                        value={form.addressLine1}
                                        onChange={(e) => handleChange('addressLine1', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="e.g. 123 High Street"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Town/City</label>
                                    <input
                                        value={form.town}
                                        onChange={(e) => handleChange('town', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="e.g. Richmond"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Postcode</label>
                                    <input
                                        value={form.postcode}
                                        onChange={(e) => handleChange('postcode', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="e.g. TW9 IAB"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Provider Type */}
                        <div className="bg-white rounded-lg p-4 space-y-4">
                            <p className="text-[18px] text-[#0a0a0a] leading-[28.8px]" style={{ fontFamily: 'Roboto, sans-serif' }}>Provider Type</p>
                            <div className="space-y-2.5">
                                <p className="text-[16px] text-black leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Primary Profession</p>
                                <div className="flex flex-wrap gap-2.5">
                                    {professionOptions.map((item) => {
                                        const isSelected = form.profession.includes(item);
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => toggleArrayField('profession', item)}
                                                className={`px-[10px] py-[10px] rounded-[2px] text-[14px] leading-5 transition-colors ${
                                                    isSelected ? 'bg-[#0f766e] text-white' : 'bg-[#91c0bc] text-[#242424]'
                                                }`}
                                                style={{ fontFamily: 'Roboto, sans-serif' }}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Section 4: About & Services */}
                        <div className="bg-white rounded-lg p-4 space-y-4">
                            <p className="text-[18px] text-[#0a0a0a] leading-[28.8px]" style={{ fontFamily: 'Roboto, sans-serif' }}>About &amp; Services</p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Listing Headline</label>
                                    <input
                                        value={form.listingHeadline}
                                        onChange={(e) => handleChange('listingHeadline', e.target.value)}
                                        className="w-full h-12.25 bg-[#f3f3f5] border-0 rounded-lg px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                        placeholder="e.g. The Wellness Centre"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>About you / your service</label>
                                    <textarea
                                        value={form.aboutService}
                                        onChange={(e) => handleChange('aboutService', e.target.value)}
                                        className="w-full h-32.5 bg-[#f3f3f5] border-0 rounded-lg px-3 py-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E] resize-none"
                                        placeholder="e.g. 123 High Street"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    />
                                </div>
                            </div>

                            {/* Session Types */}
                            <div className="space-y-2.5">
                                <p className="text-[16px] text-black leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Session Types</p>
                                <div className="flex flex-wrap gap-2.5">
                                    {sessionTypeOptions.map((item) => {
                                        const isSelected = form.sessionTypes.includes(item);
                                        return (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => toggleArrayField('sessionTypes', item)}
                                                className={`px-[10px] py-[10px] rounded-[2px] text-[14px] leading-5 transition-colors ${
                                                    isSelected ? 'bg-[#0F766E] text-white' : 'bg-[#91C0BC] text-[#242424]'
                                                }`}
                                                style={{ fontFamily: 'Roboto, sans-serif' }}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sports */}
                            <div className="space-y-2">
                                <p className="text-[18px] text-[#242424] leading-[28.8px]" style={{ fontFamily: 'Roboto, sans-serif' }}>Sports</p>
                                <div className="flex flex-wrap gap-2">
                                    {sportOptions.map((sport) => {
                                        const isSelected = form.sports.includes(sport);
                                        return (
                                            <button
                                                key={sport}
                                                type="button"
                                                onClick={() => toggleArrayField('sports', sport)}
                                                className="flex items-center gap-1 bg-[#b5d5d2] px-4 py-2 rounded-[50px]"
                                            >
                                                <span className={`inline-flex items-center justify-center w-4 h-4 border border-[#06322e] rounded-[1.778px] flex-shrink-0 ${isSelected ? 'bg-[#06322e]' : 'bg-white'}`}>
                                                    {isSelected && (
                                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l3 3 5-5" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <span className="text-[16px] font-medium text-[#06322e]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                                    {sport}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Professional Credentials */}
                        <div className="bg-white rounded-[8px] p-4 space-y-4">
                            <p className="text-[18px] text-[#0a0a0a] leading-[28.8px]" style={{ fontFamily: 'Roboto, sans-serif' }}>Professional Credentials</p>
                            <div className="space-y-2">
                                <label className="block text-[16px] text-[#0a0a0a] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Professional Registration</label>
                                <input
                                    value={form.professionalRegistration}
                                    onChange={(e) => handleChange('professionalRegistration', e.target.value)}
                                        className="w-full h-[49px] bg-[#f3f3f5] border-0 rounded-[8px] px-3 text-[14px] text-black placeholder-[#717182] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                    placeholder="e.g. HCPC Registered, CSP Member"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                />
                            </div>
                            <div className="space-y-[10px]">
                                <p className="text-[16px] text-black leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Insurance in place?</p>
                                <div className="flex gap-[10px]">
                                    {['Yes', 'No'].map((opt) => {
                                        const val = opt === 'Yes' ? 'yes' : 'no';
                                        const isSelected = form.insurance === val;
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => handleChange('insurance', val)}
                                                className={`px-[10px] py-[10px] rounded-[2px] text-[14px] leading-5 transition-colors ${
                                                    isSelected ? 'bg-[#0F766E] text-white' : 'bg-[#91C0BC] text-[#242424]'
                                                }`}
                                                style={{ fontFamily: 'Roboto, sans-serif' }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Section 6: Booking */}
                        <div className="bg-white rounded-[8px] p-4 space-y-4">
                            <div className="space-y-[10px]">
                                <p className="text-[16px] text-[#242424] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    How would you like participants to respond?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {respondMethodOptions.map((opt) => {
                                        const isSelected = form.respondMethod.includes(opt);
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => toggleArrayField('respondMethod', opt)}
                                                className="flex items-center gap-1 bg-[#b5d5d2] px-4 py-2 rounded-[50px]"
                                            >
                                                <span className={`inline-flex items-center justify-center w-4 h-4 border border-[#06322e] rounded-[1.778px] flex-shrink-0 ${isSelected ? 'bg-[#06322e]' : 'bg-white'}`}>
                                                    {isSelected && (
                                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth="2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l3 3 5-5" />
                                                        </svg>
                                                    )}
                                                </span>
                                                <span className="text-[16px] font-medium text-[#06322e]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                                    {opt}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[16px] text-[#252525] leading-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Booking Link</label>
                                <input
                                    value={form.bookingLink}
                                    onChange={(e) => handleChange('bookingLink', e.target.value)}
                                        className="w-full border border-[#f0f0f0] rounded-[8px] px-3 py-3 text-[14px] text-black placeholder-[#7b7b7b] outline-none focus:ring-2 focus:ring-[#0F766E]"
                                    placeholder="enter booking link"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                />
                            </div>
                        </div>

                    </form>
                </div>

                {/* Sticky Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-[#f9fafb] rounded-b-[20px]">
                    <button
                        type="submit"
                        form="create-recruitment-form"
                        className="bg-[#0f766e] text-white px-5 py-3 rounded-[8px] text-[18px] font-medium leading-normal"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        Submit For Approval
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRecruitmentModal;
