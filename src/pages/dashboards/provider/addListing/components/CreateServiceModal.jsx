import React, { useState } from 'react';
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
  'Other',
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

const responseOptions = ['Add booking link', 'Allow users to register interest', 'By default'];

const mapProviderTypeToServiceType = (value) => {
  const key = String(value || '').toLowerCase();
  if (key.includes('physio') || key.includes('massage')) return 'THERAPY';
  if (key.includes('nutrition')) return 'NUTRITION';
  if (key.includes('strength') || key.includes('coach') || key.includes('trainer')) return 'TRAINING';
  if (key.includes('mental')) return 'CONSULTATION';
  return 'OTHER';
};

const buildInitialState = (initialData) => {
  if (initialData) {
    const serviceSports = String(initialData.whoServiceFor || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      providerBusinessName: initialData.providerName || '',
      contactName: initialData.providerName || '',
      logo: initialData.image || null,
      clinicName: '',
      address1: initialData.fullAddress || '',
      city: '',
      postcode: '',
      providerTypes: initialData.category ? [initialData.category] : [],
      listingHeadline: initialData.title || '',
      about: initialData.description || '',
      sessionType: 'In clinic',
      sports: serviceSports,
      registration: '',
      insuranceInPlace: 'Yes',
      responseMethods: ['By default'],
      bookingLink: initialData.googleMapLink || initialData.googleMapLinks || '',
    };
  }

  return {
    providerBusinessName: '',
    contactName: '',
    logo: null,
    clinicName: '',
    address1: '',
    city: '',
    postcode: '',
    providerTypes: [],
    listingHeadline: '',
    about: '',
    sessionType: 'In clinic',
    sports: [],
    registration: '',
    insuranceInPlace: 'Yes',
    responseMethods: ['By default'],
    bookingLink: '',
  };
};

const PillButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-sm border px-2 py-1 text-xs transition-colors ${
      active
        ? 'border-[#0F766E] bg-[#0F766E] text-white'
        : 'border-[#B5D5D2] bg-[#91C0BC] text-[#242424] '
    }`}
  >
    {children}
  </button>
);

const   CreateServiceModal = ({
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
  const [errors, setErrors] = useState({});

  const isBusy = createLoading || updateLoading;

  const updateField = (field, value) => {
    if (field === 'logo') {
      setPreviewImage((prev) => {
        if (prev && prev.startsWith('blob:')) {
          URL.revokeObjectURL(prev);
        }

        if (!value) return '';
        if (typeof value === 'string') return value;
        return URL.createObjectURL(value);
      });
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const toggleMulti = (field, value) => {
    setFormData((prev) => {
      const list = prev[field] || [];
      const exists = list.includes(value);
      return {
        ...prev,
        [field]: exists ? list.filter((x) => x !== value) : [...list, value],
      };
    });
  };

  const validate = () => {
    const next = {};
    if (!formData.providerBusinessName.trim()) next.providerBusinessName = 'Business name is required';
    if (!formData.contactName.trim()) next.contactName = 'Contact name is required';
    if (!formData.listingHeadline.trim()) next.listingHeadline = 'Listing headline is required';
    if (!formData.about.trim()) next.about = 'Service details are required';
    if (formData.providerTypes.length === 0) next.providerTypes = 'Choose at least one provider type';
    if (formData.sports.length === 0) next.sports = 'Choose at least one sport';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildPayload = () => {
    const submitData = new FormData();
    submitData.append('title', formData.listingHeadline.trim());
    submitData.append('description', formData.about.trim());
    submitData.append('serviceType', mapProviderTypeToServiceType(formData.providerTypes[0]));

    const fullAddress = [formData.clinicName, formData.address1, formData.city, formData.postcode]
      .map((x) => String(x || '').trim())
      .filter(Boolean)
      .join(', ');

    submitData.append('fullAddress', fullAddress);
    submitData.append('googleMapLink', formData.bookingLink.trim());
    submitData.append('providerName', formData.providerBusinessName.trim());
    submitData.append('providerPhone', initialData?.providerPhone || user?.phone || 'N/A');
    submitData.append('providerEmail', initialData?.providerEmail || user?.email || 'no-reply@essahub.com');
    submitData.append('availableDays', formData.sessionType);
    submitData.append('category', formData.providerTypes.join(', '));
    submitData.append('whoServiceFor', formData.sports.join(', '));

    if (formData.logo && typeof formData.logo !== 'string') {
      submitData.append('image', formData.logo);
    }

    return submitData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (localMode && onLocalSubmit) {
      onLocalSubmit(formData, mode, initialData);
      onClose?.();
      return;
    }

    const payload = buildPayload();
    const res =
      mode === 'edit' && initialData?.id
        ? await updateService(initialData.id, payload)
        : await createService(payload);

    if (res?.success) {
      onSuccess?.();
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-3 py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 sm:mx-6 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6">
          <h2 className="text-xl font-semibold text-[#1D1D1D] sm:text-2xl">{mode === 'edit' ? 'Edit Listing' : 'Add Listing'}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full  p-1 text-black bg-[#cacaca]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(92vh-64px)] overflow-y-auto px-4 py-4 sm:max-h-[calc(90vh-64px)] sm:px-6 sm:py-5">
          <p className="text-base font-medium text-[#363636] py-2">Service Provider Listing Form</p>
          <p className="mb-4 text-sm text-[#6B7280] font-medium">
            Join our community of professional support services aimed at empowering women in sport and fitness.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-base text-[#1D1D1D]">Provider / Business Name</label>
              <input
                value={formData.providerBusinessName}
                onChange={(e) => updateField('providerBusinessName', e.target.value)}
                placeholder="e.g. Richmond Woman's Physios"
                className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {errors.providerBusinessName && <p className="mt-1 text-xs text-red-600">{errors.providerBusinessName}</p>}
            </div>
            <div>
              <label className="mb-1 block text-base text-[#1D1D1D]">Contact Name</label>
              <input
                value={formData.contactName}
                onChange={(e) => updateField('contactName', e.target.value)}
                placeholder="Enter name"
                className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
              {errors.contactName && <p className="mt-1 text-xs text-red-600">{errors.contactName}</p>}
            </div>
          </div>

          <div className="mt-3">
            <label className="mb-1 block text-base text-[#1D1D1D]">Logo</label>
            <label className="relative flex h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-400 bg-[#FAFAFA] p-6 text-center sm:h-60">
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Uploaded preview" className="absolute inset-0 h-full w-full object-contain bg-[#f3f4f6]" />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="relative z-10 rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-[#28A844">
                    Click to change image
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-[#28A844]" />
                  <span className="mt-2 text-sm font-medium text-[#28A844]">Upload Image</span>
                  <span className="text-xs text-gray-400">JPEG files accepted. Max 100MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                onChange={(e) => updateField('logo', e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-base font-medium text-[#1D1D1D]">Location Details</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-[#1D1D1D]">Clinic Name</label>
                <input
                  value={formData.clinicName}
                  onChange={(e) => updateField('clinicName', e.target.value)}
                  placeholder="e.g. The Wellness Centre"
                  className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#1D1D1D]">Address Line 1</label>
                <input
                  value={formData.address1}
                  onChange={(e) => updateField('address1', e.target.value)}
                  placeholder="e.g. 123 High Street"
                  className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#1D1D1D]">Town/City</label>
                <input
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="e.g. Richmond"
                  className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#1D1D1D]">Postcode</label>
                <input
                  value={formData.postcode}
                  onChange={(e) => updateField('postcode', e.target.value)}
                  placeholder="e.g. TW9 4AB"
                  className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Provider Type</label>
            <div className="flex flex-wrap gap-2">
              {providerTypeOptions.map((option) => (
                <PillButton
                  key={option}
                  active={formData.providerTypes.includes(option)}
                  onClick={() => toggleMulti('providerTypes', option)}
                >
                  {option}
                </PillButton>
              ))}
            </div>
            {errors.providerTypes && <p className="mt-1 text-xs text-red-600">{errors.providerTypes}</p>}
          </div>

          <div className="mt-5">
            <p className="mb-2 text-base font-medium text-[#1D1D1D]">About & Services</p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm text-[#1D1D1D]">Listing Headline</label>
                <input
                  value={formData.listingHeadline}
                  onChange={(e) => updateField('listingHeadline', e.target.value)}
                  placeholder="e.g. The Wellness Centre"
                  className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
                {errors.listingHeadline && <p className="mt-1 text-xs text-red-600">{errors.listingHeadline}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm text-[#1D1D1D]">About you / your service</label>
                <textarea
                  value={formData.about}
                  onChange={(e) => updateField('about', e.target.value)}
                  rows={3}
                  placeholder="e.g. 123 High Street"
                  className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
                />
                {errors.about && <p className="mt-1 text-xs text-red-600">{errors.about}</p>}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-[#1D1D1D]">Session Type</label>
            <div className="flex flex-wrap gap-2">
              {sessionTypeOptions.map((option) => (
                <PillButton
                  key={option}
                  active={formData.sessionType === option}
                  onClick={() => updateField('sessionType', option)}
                >
                  {option}
                </PillButton>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-[#1D1D1D]">Sports</label>
            <div className="flex flex-wrap gap-2">
              {sportOptions.map((sport) => (
                <PillButton
                  key={sport}
                  active={formData.sports.includes(sport)}
                  onClick={() => toggleMulti('sports', sport)}
                >
                  {sport}
                </PillButton>
              ))}
            </div>
            {errors.sports && <p className="mt-1 text-xs text-red-600">{errors.sports}</p>}
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <label className="mb-1 block text-base font-medium text-[#1D1D1D]">Professional Credentials</label>
              <label className="mb-1 block text-sm text-[#1D1D1D]">Professional Registration</label>
              <input
                value={formData.registration}
                onChange={(e) => updateField('registration', e.target.value)}
                placeholder="e.g. HCPC Registered, CSP Member"
                className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-medium text-[#1D1D1D]">Insurance in place?</label>
              <div className="flex gap-2">
                {['Yes', 'No'].map((v) => (
                  <PillButton key={v} active={formData.insuranceInPlace === v} onClick={() => updateField('insuranceInPlace', v)}>
                    {v}
                  </PillButton>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-base font-medium text-[#1D1D1D]">How would you like participants to respond?</label>
              <div className="flex flex-wrap gap-2">
                {responseOptions.map((option) => (
                  <PillButton
                    key={option}
                    active={formData.responseMethods.includes(option)}
                    onClick={() => toggleMulti('responseMethods', option)}
                  >
                    {option}
                  </PillButton>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-base text-[#1D1D1D]">Booking Link</label>
              <input
                value={formData.bookingLink}
                onChange={(e) => updateField('bookingLink', e.target.value)}
                placeholder="Enter booking link"
                className="w-full rounded-md border border-gray-200 bg-[#F6F6F6] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0F766E]"
              />
            </div>

          </div>

          <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex flex-wrap gap-2 border-t border-gray-200 bg-white px-4 py-3 sm:-mx-6 sm:px-6">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center gap-2 rounded-md border border-[#0F766E] bg-white px-4 py-2 text-sm font-medium text-[#0F766E] hover:bg-[#f2fbfa]"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="rounded-md bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d655d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? (mode === 'edit' ? 'Updating...' : 'Submitting...') : 'Submit For Approval'}
            </button>
          </div>
        </form>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-4 sm:p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#1D1D1D]">Listing Preview</h3>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-full bg-[#D9D9D9] p-1 text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-lg border border-[#E2ECEC] bg-[#E7F1F180] p-4">
              <div className="mb-3 h-40 overflow-hidden rounded-md bg-[#D9D9D9]">
                {previewImage ? (
                  <img src={previewImage} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">Image preview</div>
                )}
              </div>

              <div className="mb-2 flex flex-wrap gap-2">
                {formData.providerTypes.slice(0, 2).map((type) => (
                  <span key={type} className="rounded-full bg-[#E7F1F1] px-2 py-1 text-xs text-[#0F766E]">
                    {type}
                  </span>
                ))}
              </div>

              <h4 className="text-2xl font-semibold text-[#323232]">
                {formData.listingHeadline || 'Your listing headline'}
              </h4>
              <p className="mt-2 text-sm text-[#4B5563]">
                {formData.about || 'Your listing description will appear here.'}
              </p>

              <div className="mt-3 text-xs text-[#6B7280]">
                <p>
                  <span className="font-medium">Provider:</span> {formData.providerBusinessName || '-'}
                </p>
                <p>
                  <span className="font-medium">Session:</span> {formData.sessionType}
                </p>
                <p>
                  <span className="font-medium">Sports:</span> {formData.sports.join(', ') || '-'}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700"
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateServiceModal;
