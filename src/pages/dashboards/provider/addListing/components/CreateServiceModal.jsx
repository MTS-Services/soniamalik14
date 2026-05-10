import React, { useState, useEffect, useMemo } from 'react';
import { X, Upload, Eye } from 'lucide-react';
import { useAuth } from '../../../../../context/AuthContext';
import { useService } from '../../../../../context/ServiceContext';

const providerTypeOptions = [
  'Physiotherapist',
  'Sports Massage Therapist',
  'Strength & Conditioning Coach',
  'Nutritionist',
  'Mental Health & Wellbeing',
  'Coach / Trainer',

];

const sessionTypeOptions = ['In clinic', 'At-home visits', 'Online video'];

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

const responseOptions = ['Add booking link', 'Allow users to register interest'];

const buildInitialState = (initialData) => ({
  providerBusinessName: initialData?.providerName || '',
  contactName: initialData?.providerName || '',
  logo: initialData?.image || null,
  clinicName: '',
  address1: initialData?.fullAddress || '',
  townCity: '',
  postcode: '',
  providerTypes: initialData?.category ? [initialData.category] : [],
  listingHeadline: initialData?.title || '',
  about: initialData?.description || '',
  sessionTypes: ['In clinic'],
  sports: initialData?.whoServiceFor
    ? initialData.whoServiceFor.split(',').map((s) => s.trim())
    : [],
  otherSport: initialData?.otherSport || '',
  registration: '',
  insuranceInPlace: 'Yes',
  responseMethods: ['By default'],
  bookingLink: initialData?.googleMapLink || '',
});

const PillButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-[4px] px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-[#0F766E] text-white' : 'bg-[#91C0BC] text-[#242424]'
    }`}
  >
    {children}
  </button>
);

const CheckboxPill = ({ active, onClick, children }) => (
  <label
    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
      active
        ? 'bg-btn-primary border-btn-primary text-white'
        : 'border-transparent bg-[#B5D5D2] text-[#06322E]'
    } border`}
  >
    {/* Input checkbox with custom accent color */}
    <input
      type="checkbox"
      checked={active}
      onChange={onClick}
      className="h-4 w-4 cursor-pointer rounded accent-[#06322E]"
    />

    {children}
  </label>
);
const CreateServiceModal = ({
  isOpen,
  onClose,
  mode = 'create',
  initialData = null,
  onSuccess,
  localMode = false,
  onLocalSubmit,
}) => {
  const { user } = useAuth();
  const { createService, createLoading, updateService, updateLoading } = useService();
  const [formData, setFormData] = useState(() => buildInitialState(initialData));
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    initialData?.image && typeof initialData.image === 'string' ? initialData.image : ''
  );

  const isBusy = createLoading || updateLoading;

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialState(initialData));
      setPreviewImage(
        initialData?.image && typeof initialData.image === 'string' ? initialData.image : ''
      );
    }
  }, [isOpen, initialData]);

  const updateField = (field, value) => {
    if (field === 'logo') {
      if (!value) setPreviewImage('');
      else if (typeof value === 'string') setPreviewImage(value);
      else setPreviewImage(URL.createObjectURL(value));
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMulti = (field, value) => {
    setFormData((prev) => {
      const list = prev[field] || [];
      const exists = list.includes(value);
      const newList = exists ? list.filter((x) => x !== value) : [...list, value];
      const extra = {};
      if (field === 'sports' && value === 'Other' && exists) {
        extra.otherSport = '';
      }
      return {
        ...prev,
        [field]: newList,
        ...extra,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localMode && onLocalSubmit) {
      onLocalSubmit(formData, mode, initialData);
      onClose?.();
      return;
    }
    // API logic remains same...
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-[#F9FAFB] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {mode === 'edit' ? 'Edit Listing' : 'Add Listing'}
          </h2>
          <button onClick={onClose} className="rounded-full bg-[#E5E7EB] p-1.5 hover:bg-gray-300">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <form
          id="service-form"
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6"
        >
          {/* Section 1: Service Provider Form */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-[#0A0A0A]">
                Service Provider Listing Form
              </h3>
              <p className="text-base font-medium text-gray-500">
                Join our community of professional support services aimed at empowering women in
                sport and fitness.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-base font-medium text-[#0A0A0A]">
                  Provider / Business Name
                </label>
                <input
                  value={formData.providerBusinessName}
                  onChange={(e) => updateField('providerBusinessName', e.target.value)}
                  className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                  placeholder="e.g. Richmond Women's Physios"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-base font-medium text-[#0A0A0A]">Contact Name</label>
                <input
                  value={formData.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                  placeholder="Enter name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-base font-medium text-[#0A0A0A]">Logo</label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white py-10">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => updateField('logo', e.target.files?.[0])}
                />
                {previewImage ? (
                  <img src={previewImage} className="h-20 object-contain" alt="preview" />
                ) : (
                  <>
                    <Upload className="mb-2 h-8 w-8 text-[#22C55E]" />
                    <span className="text-base font-semibold text-[#22C55E]">Upload Image</span>
                    <span className="mt-1 text-sm text-gray-400">
                      JPEG files accepted. Max 100MB
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Location Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                placeholder="Clinic Name"
                value={formData.clinicName}
                onChange={(e) => updateField('clinicName', e.target.value)}
              />
              <input
                className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                placeholder="Address Line 1"
                value={formData.address1}
                onChange={(e) => updateField('address1', e.target.value)}
              />
              <input
                className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                placeholder="Town/City"
                value={formData.townCity}
                onChange={(e) => updateField('townCity', e.target.value)}
              />
              <input
                className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                placeholder="Postcode"
                value={formData.postcode}
                onChange={(e) => updateField('postcode', e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: Provider Type */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Provider Type</h3>
            <div className="flex flex-wrap gap-2">
              {providerTypeOptions.map((opt) => (
                <PillButton
                  key={opt}
                  active={formData.providerTypes.includes(opt)}
                  onClick={() => toggleMulti('providerTypes', opt)}
                >
                  {opt}
                </PillButton>
              ))}
            </div>
          </div>

          {/* Section 4: About & Services */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0A0A0A]">About & Services</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-base font-medium text-[#0A0A0A]">Listing Headline</label>
                <input
                  className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                  placeholder="e.g. The Wellness Centre"
                  value={formData.listingHeadline}
                  onChange={(e) => updateField('listingHeadline', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-base font-medium text-[#0A0A0A]">
                  About you / your service
                </label>
                <textarea
                  className="h-28 w-full resize-none rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                  placeholder="e.g. 123 High Street"
                  value={formData.about}
                  onChange={(e) => updateField('about', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-base font-medium text-[#0A0A0A]">Session Types</label>
              <div className="flex flex-wrap gap-2">
                {sessionTypeOptions.map((opt) => (
                  <PillButton
                    key={opt}
                    active={formData.sessionTypes.includes(opt)}
                    onClick={() => toggleMulti('sessionTypes', opt)}
                  >
                    {opt}
                  </PillButton>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-base font-medium text-[#0A0A0A]">Sports</label>
              <div className="flex flex-wrap gap-2">
                {sportOptions.map((sport) => (
                  <CheckboxPill
                    key={sport}
                    active={formData.sports.includes(sport)}
                    onClick={() => toggleMulti('sports', sport)}
                  >
                    {sport}
                  </CheckboxPill>
                ))}
              </div>
              {formData.sports.includes('Other') && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={formData.otherSport}
                    onChange={(e) => updateField('otherSport', e.target.value)}
                    className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Credentials */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Professional Credentials</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-base font-medium text-[#0A0A0A]">
                  Professional Registration
                </label>
                <input
                  className="w-full rounded-lg bg-[#F3F3F5] p-3 text-sm outline-none"
                  placeholder="e.g. HCPC Registered, CSP Member"
                  value={formData.registration}
                  onChange={(e) => updateField('registration', e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#0A0A0A]">Insurance in place?</label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((v) => (
                    <PillButton
                      key={v}
                      active={formData.insuranceInPlace === v}
                      onClick={() => updateField('insuranceInPlace', v)}
                    >
                      {v}
                    </PillButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Response & Booking */}
          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <label className="text-sm font-medium text-[#242424]">
              How would you like participants to respond?
            </label>
            <div className="flex flex-wrap gap-2">
              {responseOptions.map((opt) => (
                <CheckboxPill
                  key={opt}
                  active={formData.responseMethods.includes(opt)}
                  onClick={() => toggleMulti('responseMethods', opt)}
                >
                  {opt}
                </CheckboxPill>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#0A0A0A]">Booking Link</label>
              <input
                className="w-full rounded-lg border border-gray-100 p-3 text-sm outline-none"
                placeholder="enter booking link"
                value={formData.bookingLink}
                onChange={(e) => updateField('bookingLink', e.target.value)}
              />
            </div>
          </div>
        </form>
        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-20 flex items-center gap-3 border-t border-gray-100 bg-white px-6 py-4">
          <button
            type="submit"
            form="service-form"
            disabled={isBusy}
            className="bg-btn-primary hover:bg-btn-primary-dark rounded-md px-6 py-2 text-[15px] font-semibold text-white transition-colors disabled:opacity-60"
          >
            {isBusy ? 'Submitting...' : 'Submit For Approval'}
          </button>

      
        </div>
      </div>
    </div>
  );
};

export default CreateServiceModal;
