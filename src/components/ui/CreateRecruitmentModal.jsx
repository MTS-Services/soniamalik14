import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button';

const sportOptions = ['Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel', 'Tennis', 'Badminton', 'Golf', 'Running', 'Other'];
const sessionTypeOptions = ['Recreational', 'Social', 'Training', 'Coaching', 'League', 'Competitive'];
const suitableForOptions = ['New to sport', 'Some experience', 'Regular players', 'Competitive', 'All levels welcome'];

const createInitialForm = () => ({
    title: '',
    organisationName: '',
    contactPerson: '',
    role: '',
    sportType: '',
    skillLevelRequired: '',
    description: '',
    trainingLocation: '',
    times: '',
    matchDays: '',
    applicationDeadline: '',
    ageRange: '',
    playersNeeded: '',
    homeGround: '',
    whatPlayersReceive: '',
    sports: [],
    sessionTypes: [],
    suitableFor: [],
    womensOnly: null,
    venueName: '',
    postcode: '',
    town: '',
    typicalSessionDays: '',
    sessionDate: '',
    sessionTime: '',
    bookingLink: '',
    skillLevel: 'Beginner',
    image: null,
});

const CreateRecruitmentModal = ({ isOpen, onClose, initialData = null, mode = 'create' }) => {
    const [form, setForm] = useState(createInitialForm);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            if (initialData && mode === 'edit') {
                setForm((currentForm) => ({
                    ...currentForm,
                    title: initialData.title || currentForm.title,
                    sportType: initialData.sportType || currentForm.sportType,
                    skillLevelRequired: initialData.skillLevel || currentForm.skillLevelRequired,
                    description: initialData.description || currentForm.description,
                    trainingLocation: initialData.trialLocation || currentForm.trainingLocation,
                    times: initialData.time || currentForm.times,
                    matchDays: initialData.matchDays || currentForm.matchDays,
                    applicationDeadline: initialData.lastDateToRegister || currentForm.applicationDeadline,
                    ageRange: initialData.ageGroup || currentForm.ageRange,
                    playersNeeded: initialData.playersNeeded || currentForm.playersNeeded,
                    homeGround: initialData.trialLocation || currentForm.homeGround,
                    whatPlayersReceive: initialData.whatPlayersReceive || currentForm.whatPlayersReceive,
                    skillLevel: initialData.skillLevel
                        ? Array.isArray(initialData.skillLevel)
                            ? initialData.skillLevel[0]
                            : initialData.skillLevel
                        : currentForm.skillLevel,
                    image: initialData.image || currentForm.image,
                }));
                return;
            }

            setForm(createInitialForm());
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [isOpen, initialData, mode]);

    if (!isOpen) return null;

    const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

    const toggleArrayField = (field, value) => {
        setForm((s) => {
            const arr = s[field] || [];
            if (arr.includes(value)) return { ...s, [field]: arr.filter((a) => a !== value) };
            return { ...s, [field]: [...arr, value] };
        });
    };

    const handlePreview = (e) => {
        e.preventDefault();
        console.log('Preview payload', form);
        // TODO: open preview modal
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // minimal validation
        if (!form.title) return alert('Please enter post title');
        console.log('Create recruitment payload:', form);
        // TODO: call API/create action
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 sm:mx-6 flex flex-col max-h-[85vh]">
                {/* Sticky Header */}
                <div className="flex items-center justify-between p-4 rounded-t-lg border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-semibold">Recruitment</h2>
                    <button onClick={onClose} className="text-gray-600 bg-gray-100 rounded-full p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                    <form id="create-recruitment-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Organisation Details */}
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">Organisation Details</h4>
                            <p className='text-base mb-2'> Tell us about your organization or club</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-base font-medium text-gray-600 mb-1">Organisation / Club Name</label>
                                    <input value={form.organisationName} onChange={(e) => handleChange('organisationName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" placeholder="Enter organisation name" />
                                </div>
                                <div>
                                    <label className="block text-base font-medium text-gray-600 mb-1">Contact Person Name</label>
                                    <input value={form.contactPerson} onChange={(e) => handleChange('contactPerson', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" placeholder="Enter contact name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1  gap-4 mt-4">
                                <div>
                                    <label className="block text-base font-medium text-gray-600 mb-1">Role</label>
                                    <input value={form.role} onChange={(e) => handleChange('role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" placeholder="coach/manager" />
                                </div>
                                <div>
                                    <label className="block text-base font-medium text-gray-600 mb-1">About</label>
                                    <input value={form.whatPlayersReceive} onChange={(e) => handleChange('whatPlayersReceive', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" placeholder="Write 2-3 lines about your organisation..." />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-base font-medium text-gray-600 mb-2">Upload Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                    <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-green-600 font-medium text-base mb-1">Upload Image</p>
                                    <p className="text-gray-400 text-base mb-2">JPEG files accepted. Max 100MB</p>
                                    <input id="create-recruitment-image" type="file" accept="image/*" onChange={(e) => handleChange('image', e.target.files?.[0] || null)} className="hidden" />
                                    <label htmlFor="create-recruitment-image" className="inline-block cursor-pointer px-4 py-2 bg-gray-100 rounded-md text-sm">Choose File</label>
                                    {form.image && <p className="text-sm text-gray-600 mt-2">Selected: {form.image.name}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Sport & Session Information */}
                        <div className="rounded-2xl ">
                            <h4 className="text-lg font-medium text-gray-900">Sport & Session Information</h4>
                            <p className="mt-1 text-sm text-gray-500">Details about the sport and session you offer</p>

                            <div className="mt-5">
                                <p className="mb-3 text-sm font-medium text-gray-900">Sports</p>
                                <div className="flex flex-wrap gap-2">
                                    {sportOptions.map((sport) => {
                                        const isSelected = form.sports.includes(sport);

                                        return (
                                            <button
                                                key={sport}
                                                type="button"
                                                onClick={() => toggleArrayField('sports', sport)}
                                                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                                                    isSelected
                                                        ? 'border-[#9ECFC8] bg-[#BFDAD6] text-[#1F4F4B]'
                                                        : 'border-[#CFE4E0] bg-[#E8F4F1] text-[#214C49]'
                                                }`}
                                            >
                                                <span className={`flex h-4 w-4 items-center justify-center rounded-sm border text-[10px] ${isSelected ? 'border-[#1F4F4B] bg-white' : 'border-[#6B8C88]'}`}>
                                                    {isSelected ? '✓' : ''}
                                                </span>
                                                <span>{sport}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="mb-3 text-sm font-medium text-gray-900">Session Type</p>
                                <div className="space-y-2">
                                    {sessionTypeOptions.map((type) => (
                                        <label key={type} className="flex items-center gap-3 text-sm text-gray-700">
                                            <input type="checkbox" checked={form.sessionTypes.includes(type)} onChange={() => toggleArrayField('sessionTypes', type)} className="h-4 w-4 rounded border-gray-300 text-[#0F766E] focus:ring-[#0F766E]" />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="mb-3 text-sm font-medium text-gray-900">Suitable for (more than one can be selected)</p>
                                <div className="space-y-2">
                                    {suitableForOptions.map((item) => (
                                        <label key={item} className="flex items-center gap-3 text-sm text-gray-700">
                                            <input type="checkbox" checked={form.suitableFor.includes(item)} onChange={() => toggleArrayField('suitableFor', item)} className="h-4 w-4 rounded border-gray-300 text-[#0F766E] focus:ring-[#0F766E]" />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="mb-3 text-sm font-medium text-gray-900">Women&apos;s Only</p>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 text-sm text-gray-700">
                                        <input type="radio" name="womensOnly" checked={form.womensOnly === true} onChange={() => handleChange('womensOnly', true)} className="h-4 w-4 border-gray-300 text-[#0F766E] focus:ring-[#0F766E]" />
                                        <span>YES</span>
                                    </label>
                                    <label className="flex items-center gap-3 text-sm text-gray-700">
                                        <input type="radio" name="womensOnly" checked={form.womensOnly === false} onChange={() => handleChange('womensOnly', false)} className="h-4 w-4 border-gray-300 text-[#0F766E] focus:ring-[#0F766E]" />
                                        <span>NO</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Location & Timing */}
                        <div>
                            <h4 className="text-base font-semibold text-gray-700 mb-2">Location & Timing</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <input value={form.venueName} onChange={(e) => handleChange('venueName', e.target.value)} placeholder="Venue name" className="px-3 py-2 border rounded-md text-sm border-gray-300" />
                                <input value={form.postcode} onChange={(e) => handleChange('postcode', e.target.value)} placeholder="Postcode" className="px-3 py-2 border rounded-md text-sm border-gray-300" />
                                <input value={form.town} onChange={(e) => handleChange('town', e.target.value)} placeholder="Town / City" className="px-3 py-2 border rounded-md text-sm border-gray-300" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                                <input value={form.typicalSessionDays} onChange={(e) => handleChange('typicalSessionDays', e.target.value)} placeholder="Typical Session Days" className="px-3 py-2 border rounded-md text-sm border-gray-300" />
                                <input value={form.sessionDate} onChange={(e) => handleChange('sessionDate', e.target.value)} placeholder="Date/Day" className="px-3 py-2 border rounded-md text-sm border-gray-300" />
                                <input value={form.sessionTime} onChange={(e) => handleChange('sessionTime', e.target.value)} placeholder="Time" className="px-3 py-2 border rounded-md text-sm border-gray-300" />
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div>
                            <h4 className="text-base font-semibold text-gray-700 mb-2">Booking Details</h4>
                            <input value={form.bookingLink} onChange={(e) => handleChange('bookingLink', e.target.value)} placeholder="Booking link" className="w-full px-3 py-2 border rounded-md text-sm border-gray-300" />
                        </div>

                    </form>
                </div>

                {/* Sticky Footer */}
                <div className="p-4 border-t rounded-b-lg border-gray-200 sticky bottom-0 bg-white z-10">
                    <div className="flex   justify-end gap-3">
                        <Button type="submit" form="create-recruitment-form" variant="primary" className=" rounded-lg text-xs md:text-sm  py-1 md:py-3">
                            Submit For Approval
                        </Button>
                        <Button type="button" onClick={handlePreview} variant="primary" className="w-36 rounded-lg text-xs md:text-sm py-1 md:py-3">
                            View Preview
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRecruitmentModal;
