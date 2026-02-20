import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from './Button';

const CreateRecruitmentModal = ({ isOpen, onClose, initialData = null, mode = 'create' }) => {
    const [form, setForm] = useState({
        title: '',
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
        skillLevel: 'Beginner',
        image: null,
    });

    useEffect(() => {
        if (!isOpen) {
            // reset when closed
            setForm({
                title: '',
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
                    <form id="create-recruitment-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Post Title</label>
                                <input
                                    value={form.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
                                    placeholder="enter event title"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Sport Type</label>
                                <input
                                    value={form.sportType}
                                    onChange={(e) => handleChange('sportType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
                                    placeholder="e.g. Cricket, Football"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">Skill Level Required</label>
                            <input
                                value={form.skillLevelRequired}
                                onChange={(e) => handleChange('skillLevelRequired', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
                                placeholder="e.g., Point Guard, Defender"
                            />
                        </div>

                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">Description of the Team & Opportunity</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base resize-none"
                                placeholder="Describe your event in details"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Training Location</label>
                                <input value={form.trainingLocation} onChange={(e) => handleChange('trainingLocation', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" placeholder="training location" />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Times</label>
                                <input value={form.times} onChange={(e) => handleChange('times', e.target.value)} className="w-full px-3 py-2 border rounded-md text-base border-gray-300" placeholder="7:00am-8:00 pm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Match Days</label>
                                <input value={form.matchDays} onChange={(e) => handleChange('matchDays', e.target.value)} className="w-full border-gray-300 px-3 py-2 border rounded-md text-base" placeholder="Days" />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Application Deadline</label>
                                <input value={form.applicationDeadline} onChange={(e) => handleChange('applicationDeadline', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" placeholder="enter deadline" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Age Range</label>
                                <input value={form.ageRange} onChange={(e) => handleChange('ageRange', e.target.value)} className="w-full px-3 py-2 border rounded-md text-base border-gray-300" placeholder="e.g 17-18" />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Number of Players Needed</label>
                                <input value={form.playersNeeded} onChange={(e) => handleChange('playersNeeded', e.target.value)} className="w-full px-3 py-2 border rounded-md text-base border-gray-300" placeholder="e.g., 3 spots available" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">Home Ground</label>
                            <input value={form.homeGround} onChange={(e) => handleChange('homeGround', e.target.value)} className="w-full px-3 py-2 border rounded-md text-base border-gray-300" placeholder="homeground" />
                        </div>

                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-1">What Players Receive</label>
                            <input value={form.whatPlayersReceive} onChange={(e) => handleChange('whatPlayersReceive', e.target.value)} className="w-full px-3 py-2 border rounded-md text-base border-gray-300" placeholder="e.g kit helmet etc" />
                        </div>

                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Skill Level</label>
                            <div className="flex gap-2">
                                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                                    <button type="button" key={lvl} onClick={() => handleChange('skillLevel', lvl)} className={`px-4 py-2 rounded-md text-base ${form.skillLevel === lvl ? 'bg-btn-primary text-white' : 'bg-gray-100'}`}>
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Image upload */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Upload Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-green-600 font-medium text-base mb-1">Upload Image</p>
                                <p className="text-gray-400 text-xs mb-2">JPEG files accepted. Max 100MB</p>
                                <input id="create-recruitment-image" type="file" accept="image/*" onChange={(e) => handleChange('image', e.target.files?.[0] || null)} className="hidden" />
                                <label htmlFor="create-recruitment-image" className="inline-block cursor-pointer px-4 py-2 bg-gray-100 rounded-md text-base">Choose File</label>
                                {form.image && <p className="text-base text-gray-600 mt-2">Selected: {form.image.name}</p>}
                            </div>
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
