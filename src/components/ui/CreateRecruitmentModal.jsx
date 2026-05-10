import React, { useEffect, useMemo, useState } from 'react';
import { Upload, X } from 'lucide-react';

const sportOptions = [
  'Football',
  'Squash',
  'Rugby',
  'Netball',
  'Cricket',
  'Padel',
  'Tennis',
  'Badminton',
  'Golf',
  'Running',
  'Other',
];

const sessionTypeOptions = [
  'Recreational',
  'Social',
  'Training',
  'Coaching',
  'League',
  'Competitive',
];

const suitabilityOptions = [
  'New to the sport',
  'Some experience',
  'Regular players',
  'Competitive',
  'All levels welcome',
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
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-[#1a1a1a]">Add Listing</h2>
          <button onClick={onClose} className="rounded-full bg-gray-200 p-1 hover:bg-gray-300">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
          <form id="add-listing-form" className="space-y-6">
            <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-5">
              <h3 className="text-lg font-semibold text-gray-800">Organisation Details</h3>
              <p className="mt-[-10px] text-base text-gray-500">
                Tell us about your organization or club
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">
                    Organisation / Club Name
                  </label>
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
                  className="w-full rounded-md bg-[#f3f4f6] p-2.5 text-sm text-gray-500 outline-none"
                  placeholder="coach_manager"
                />
              </div>

              <div className="space-y-1">
                <label className="text-base font-medium text-gray-700">About</label>
                <textarea
                  value={form.about}
                  onChange={(e) => handleChange('about', e.target.value)}
                  className="h-24 w-full resize-none rounded-md bg-[#f3f4f6] p-2.5 text-sm outline-none"
                  placeholder="Write 3-5 lines about your organization..."
                />
              </div>

              <div className="relative flex h-60 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-white">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => handleChange('image', e.target.files[0])}
                />
                {imagePreviewUrl ? (
                  <div className="relative h-full w-full">
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <label
                      htmlFor="file-upload"
                      className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100"
                    >
                      <Upload className="mb-2 h-8 w-8 text-white" />
                      <span className="text-base font-semibold text-white">Change Image</span>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Upload className="mb-2 h-8 w-8 text-green-500" />
                    <span className="font-semibold text-green-600">Upload Image</span>
                    <span className="text-sm text-gray-400">JPEG files accepted. Max 100MB</span>
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-5">
              <h3 className="text-lg font-semibold text-gray-800">Sport & Session Information</h3>
              <p className="-mt-2.5 text-base text-gray-500">
                Details about the sport and session you offer
              </p>

              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">Sports</label>
                <div className="flex flex-wrap gap-2">
                  {sportOptions.map((sport) => {
                    const isChecked = form.sports.includes(sport);
                    return (
                      <label
                        key={sport}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-all select-none ${
                          isChecked
                            ? 'border-btn-primary bg-btn-primary text-white'
                            : 'border-transparent bg-[#b8d9d6] text-cardTitle'
                        }`}
                      >
                        {/* Default Browser Checkbox */}
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer rounded accent-btn-primary"
                          checked={isChecked}
                          onChange={() => toggleArrayField('sports', sport)}
                        />

                        {sport}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-700">Session Type</label>
                  {sessionTypeOptions.map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
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
                  <label className="text-base font-medium text-gray-700">
                    Suitable for(more than one can be selected)
                  </label>
                  {suitabilityOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
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
                  {['YES', 'NO'].map((val) => (
                    <label
                      key={val}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                    >
                      <input
                        type="radio"
                        name="womensOnly"
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

            <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-5">
              <h3 className="text-lg font-semibold text-gray-800">Location & Timing</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Venue Name</label>
                  <input
                    className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none"
                    placeholder="Venue name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Postcode</label>
                  <input
                    className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none"
                    placeholder="Postcode"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Town / City</label>
                  <input
                    className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none"
                    placeholder="e.g london"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">
                    Typical Session Days
                  </label>
                  <input
                    className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none"
                    placeholder="e.g mon, sat, tues"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Date/Day</label>
                  <input
                    className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-base font-medium text-gray-700">Time</label>
                  <input
                    className="w-full rounded bg-[#f3f4f6] p-2 text-sm outline-none"
                    placeholder="write time"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-5">
              <h3 className="text-lg font-semibold text-gray-800">Booking Details</h3>
              <div className="space-y-1">
                <label className="text-base font-medium text-gray-700">Booking link</label>
                <input
                  className="w-full rounded bg-[#f3f4f6] p-2.5 text-sm outline-none"
                  placeholder="Venue name"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex gap-4 rounded-b-xl border-t border-gray-200 bg-gray-50 p-4 px-6">
          <button
            type="submit"
            form="add-listing-form"
            className="bg-btn-primary rounded-md px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0d635d]"
          >
            Submit For Approval
          </button>
          <button
            type="button"
            className="bg-btn-primary rounded-md px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0d635d]"
          >
            View Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRecruitmentModal;
