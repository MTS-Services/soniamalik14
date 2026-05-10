import React, { useEffect, useMemo, useState } from 'react';
import { Upload, X } from 'lucide-react';

const sportOptions = [
  'Football', 'Squash', 'Rugby', 'Netball', 'Cricket', 'Padel', 'Tennis',
  'Badminton', 'Golf', 'Running', 'Other'
];

const sessionTypeOptions = [
  'Recreational', 'Social', 'Training', 'Coaching', 'League', 'Competitive'
];

const suitabilityOptions = [
  'New to the sport', 'Some experience', 'Regular players', 'Competitive', 'All levels welcome'
];

const createInitialForm = () => ({
  organisationName: '',
  contactPerson: '',
  role: 'coach_manager',
  about: '',
  image: null,
  sports: [],
  sessionTypes: [],
  suitableFor: [],
  womensOnly: '',
  venueName: '',
  postcode: '',
  townCity: '',
  sessionDays: '',
  dateDay: '',
  time: '',
  bookingLink: '',
});

const CreateRecruitmentModal = ({ isOpen, onClose, initialData = null, mode = 'create' }) => {
  const [form, setForm] = useState(createInitialForm);

  useEffect(() => {
    if (!isOpen) return;
    if (initialData && mode === 'edit') {
      setForm({ ...createInitialForm(), ...initialData });
    } else {
      setForm(createInitialForm());
    }
  }, [isOpen, initialData, mode]);

  const imagePreviewUrl = useMemo(() => {
    if (!form.image) return '';
    if (form.image instanceof File) return URL.createObjectURL(form.image);
    return form.image;
  }, [form.image]);

  if (!isOpen) return null;

  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const toggleArrayField = (field, value) => {
    setForm((s) => {
      const arr = s[field] || [];
      if (arr.includes(value)) return { ...s, [field]: arr.filter((a) => a !== value) };
      return { ...s, [field]: [...arr, value] };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 flex max-h-[95vh] w-full max-w-2xl flex-col rounded-xl bg-[#f9fafb] shadow-2xl">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#1a1a1a]">Add Listing</h2>
          <button onClick={onClose} className="rounded-full bg-gray-200 p-1 hover:bg-gray-300">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <form id="add-listing-form" className="space-y-6">
            
            <div className="space-y-4 rounded-lg bg-white p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Organisation Details</h3>
              <p className="text-base text-gray-500 mt-[-10px]">Tell us about your organization or club</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Organisation / Club Name</label>
                  <input 
                    value={form.organisationName}
                    onChange={(e) => handleChange('organisationName', e.target.value)}
                    className="w-full rounded-md bg-[#f3f4f6] p-2.5 text-sm outline-none" 
                    placeholder="Enter Organiser name" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Contact Person Name</label>
                  <input 
                    value={form.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    className="w-full rounded-md bg-[#f3f4f6] p-2.5 text-sm outline-none" 
                    placeholder="Enter Organizer name" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-base font-medium text-gray-700">Role</label>
                <input 
                  value={form.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full rounded-md bg-[#f3f4f6] p-2.5 text-sm outline-none text-gray-500" 
                  placeholder="coach_manager" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-base font-medium text-gray-700">About</label>
                <textarea 
                  value={form.about}
                  onChange={(e) => handleChange('about', e.target.value)}
                  className="w-full h-24 rounded-md bg-[#f3f4f6] p-2.5 text-sm outline-none resize-none" 
                  placeholder="Write 3-5 lines about your organization..." 
                />
              </div>

              <div className="relative flex  flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white overflow-hidden h-60">
                <input 
                  type="file" id="file-upload" className="hidden" 
                  onChange={(e) => handleChange('image', e.target.files[0])}
                />
                {imagePreviewUrl ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={imagePreviewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <label htmlFor="file-upload" className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="h-8 w-8 text-white mb-2" />
                      <span className="text-white font-semibold text-base">Change Image</span>
                    </label>
                  </div>
                ) : (
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-8 w-8 text-green-500 mb-2" />
                    <span className="text-green-600 font-semibold">Upload Image</span>
                    <span className="text-sm text-gray-400">JPEG files accepted. Max 100MB</span>
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-4 rounded-lg bg-white p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Sport & Session Information</h3>
              <p className="text-base text-gray-500 mt-[-10px]">Details about the sport and session you offer</p>

              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">Sports</label>
                <div className="flex flex-wrap gap-2">
                  {sportOptions.map(sport => (
                    <button
                      key={sport} type="button"
                      onClick={() => toggleArrayField('sports', sport)}
                      className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border transition-all ${
                        form.sports.includes(sport) ? 'bg-[#0f766e] text-white border-[#0f766e]' : 'bg-[#b8d9d6] text-[#06322e] border-transparent'
                      }`}
                    >
                      <div className={`h-3 w-3 border ${form.sports.includes(sport) ? 'bg-white border-white' : 'bg-white border-gray-400'} rounded-sm`} />
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1  gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-700">Session Type</label>
                  {sessionTypeOptions.map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.sessionTypes.includes(type)}
                        onChange={() => toggleArrayField('sessionTypes', type)}
                        className="rounded border-gray-300" 
                      />
                      {type}
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-700">Suitable for(more than one can be selected)</label>
                  {suitabilityOptions.map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.suitableFor.includes(opt)}
                        onChange={() => toggleArrayField('suitableFor', opt)}
                        className="rounded border-gray-300" 
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-base font-medium text-gray-700">Women's Only</label>
                <div className="flex flex-col gap-2">
                  {['YES', 'NO'].map(val => (
                    <label key={val} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input 
                        type="radio" name="womensOnly" 
                        checked={form.womensOnly === val}
                        onChange={() => handleChange('womensOnly', val)}
                        className="border-gray-300" 
                      />
                      {val}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-lg bg-white p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Location & Timing</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Venue Name</label>
                  <input className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none" placeholder="Venue name" />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Postcode</label>
                  <input className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none" placeholder="Postcode" />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Town / City</label>
                  <input className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none" placeholder="e.g london" />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Typical Session Days</label>
                  <input className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none" placeholder="e.g mon, sat, tues" />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Date/Day</label>
                  <input className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none" placeholder="DD/MM/YYYY" />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Time</label>
                  <input className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none" placeholder="write time" />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-lg bg-white p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Booking Details</h3>
              <div className="space-y-1">
                <label className="text-base font-medium text-gray-700">Booking link</label>
                <input className="w-full rounded bg-[#f3f4f6] p-2.5 text-sm outline-none" placeholder="Venue name" />
              </div>
            </div>
          </form>
        </div>

        <div className="flex gap-4 p-4 px-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button 
            type="submit" form="add-listing-form"
            className="rounded-md bg-btn-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0d635d]"
          >
            Submit For Approval
          </button>
          <button 
            type="button"
            className="rounded-md bg-btn-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0d635d]"
          >
            View Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecruitmentModal;