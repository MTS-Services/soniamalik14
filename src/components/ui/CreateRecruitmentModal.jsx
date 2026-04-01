import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button';

const CreateRecruitmentModal = ({ isOpen, onClose, initialData = null, mode = 'create' }) => {
    const [form, setForm] = useState({
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

    useEffect(() => {
        if (!isOpen) {
            // reset when closed
            setForm({
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
            return;
        }

        // populate form when editing
        if (initialData && mode === 'edit') {
            setForm((s) => ({
                ...s,
                title: initialData.title || s.title,
                sportType: initialData.sportType || s.sportType,
                skillLevelRequired: initialData.skillLevel || s.skillLevelRequired,
                description: initialData.description || s.description,
                trainingLocation: initialData.trialLocation || s.trainingLocation,
                times: initialData.time || s.times,
                matchDays: initialData.matchDays || s.matchDays,
                applicationDeadline: initialData.lastDateToRegister || s.applicationDeadline,
                ageRange: initialData.ageGroup || s.ageRange,
                playersNeeded: initialData.playersNeeded || s.playersNeeded,
                homeGround: initialData.trialLocation || s.homeGround,
                whatPlayersReceive: initialData.whatPlayersReceive || s.whatPlayersReceive,
                skillLevel: initialData.skillLevel ? (Array.isArray(initialData.skillLevel) ? initialData.skillLevel[0] : initialData.skillLevel) : s.skillLevel,
                image: initialData.image || s.image,
            }));
        }
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4 sm:mx-6 flex flex-col max-h-[85vh]">
                {/* Sticky Header */}
                <div className="flex items-center justify-between p-4 rounded-t-lg border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold">Recruitment</h2>
                    <button onClick={onClose} className="text-gray-600 bg-gray-100 rounded-full p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                    <form id="create-recruitment-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Organisation Details */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Organisation Details</h4>
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
                        <div>
                            <h4 className="text-base font-semibold text-gray-700 mb-2">Sport & Session Information</h4>
                            <p className="text-base text-gray-500 mb-3">Details about the sport and session you offer</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {['Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel', 'Tennis', 'Badminton', 'Golf', 'Running', 'Other'].map((s) => (
                                    <button key={s} type="button" onClick={() => toggleArrayField('sports', s)} className={`px-3 py-1 rounded-full text-base ${form.sports.includes(s) ? 'bg-[#E6F6F2] text-[#0F766E]' : 'bg-gray-100 text-gray-700'}`}>
                                        {s}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                                {['Recreational', 'Social', 'Training', 'Coaching', 'League', 'Competitive'].map((t) => (
                                    <label key={t} className="flex items-center gap-2 text-base"><input type="checkbox" checked={form.sessionTypes.includes(t)} onChange={() => toggleArrayField('sessionTypes', t)} className="w-4 h-4" /> {t}</label>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                                <label className="text-base"><input type="checkbox" checked={form.suitableFor.includes('New to sport')} onChange={() => toggleArrayField('suitableFor', 'New to sport')} className="mr-2" /> New to sport</label>
                                <label className="text-base"><input type="checkbox" checked={form.suitableFor.includes('Some experience')} onChange={() => toggleArrayField('suitableFor', 'Some experience')} className="mr-2" /> Some experience</label>
                                <label className="text-base"><input type="checkbox" checked={form.suitableFor.includes('Compete players')} onChange={() => toggleArrayField('suitableFor', 'Compete players')} className="mr-2" /> Competitive</label>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                                <label className="flex items-center gap-2 text-base"><input type="radio" name="womensOnly" checked={form.womensOnly === true} onChange={() => handleChange('womensOnly', true)} /> YES</label>
                                <label className="flex items-center gap-2 text-base"><input type="radio" name="womensOnly" checked={form.womensOnly === false} onChange={() => handleChange('womensOnly', false)} /> NO</label>
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
                    <Button type="submit" form="create-recruitment-form" variant="primary" className="w-full rounded-lg py-3">
                        Submit For Approval
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateRecruitmentModal;
