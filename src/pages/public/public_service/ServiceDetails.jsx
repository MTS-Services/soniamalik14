import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../../../components/layout/Container';
import { FaArrowLeft } from 'react-icons/fa';
import { GET, POST } from '../../../services/httpMethods';
import { ENDPOINT } from '../../../services/httpEndpoint';
import { toast } from 'react-toastify';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchDetail = async () => {
      if (item) return;
      setLoading(true);
      setError(null);
      try {
        const res = await GET(ENDPOINT.SERVICES.DETAIL(id));
        let payload = res?.data;
        if (payload && payload.data) payload = payload.data;
        if (payload && payload.service) payload = payload.service;
        if (mounted) setItem(payload || null);
      } catch (err) {
        if (mounted) setError(err?.response?.data?.message || err.message || 'Failed to load service');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDetail();

    return () => {
      mounted = false;
    };
  }, [id, item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    // Clear previous errors
    setFormErrors({});

    // Trim inputs
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedAbout = about.trim();
    const trimmedNotes = notes.trim();

    // Validation
    const errors = {};

    if (!trimmedFullName) {
      errors.fullName = 'Full name is required';
    }

    if (!trimmedEmail) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!trimmedPhone) {
      errors.phone = 'Phone number is required';
    } else if (trimmedPhone.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    }

    if (bookingDate) {
      const selectedDate = new Date(bookingDate);
      if (isNaN(selectedDate.getTime())) {
        errors.bookingDate = 'Please enter a valid date';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the form errors');
      return;
    }

    const payload = {
      fullName: trimmedFullName,
      email: trimmedEmail,
      phoneNumber: trimmedPhone,
      aboutMe: trimmedAbout,
      notes: trimmedNotes,
    };

    // Only add bookingDate if it's provided and valid
    if (bookingDate) {
      const dateObj = new Date(bookingDate);
      if (!isNaN(dateObj.getTime())) {
        payload.bookingDate = dateObj.toISOString();
      }
    }

    setSubmitLoading(true);
    try {
      // eslint-disable-next-line no-console
      console.log('[booking][payload]', payload);

      await POST(`${ENDPOINT.SERVICES.DETAIL(id)}/bookings`, payload);
      toast.success('Booking request submitted — the provider will contact you.');

      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      setAbout('');
      setNotes('');
      setBookingDate('');
    } catch (err) {
      // Log full error for debugging
      // eslint-disable-next-line no-console
      console.error('[booking][error]', err?.response?.data || err.message || err);
      // eslint-disable-next-line no-console
      console.error('[booking][error][full]', JSON.stringify(err?.response?.data, null, 2));

      const resp = err?.response?.data;

      // Show validation errors if provided
      if (resp && resp.errors && Array.isArray(resp.errors)) {
        const mapped = {};

        resp.errors.forEach((e) => {
          // Handle different shapes
          const key = e.field || e.param || e.key || e.path || e.property || null;
          const message = e.message || e.msg || e.error || (typeof e === 'string' ? e : null);

          if (key) {
            mapped[key] = message || 'Invalid value';
          } else if (message) {
            // If no field specified, add to global
            if (!mapped._global) mapped._global = [];
            mapped._global.push(message);
          }
        });

        // Map backend field names to frontend field names
        const normalized = {};
        Object.keys(mapped).forEach((k) => {
          if (k === '_global') {
            normalized._global = Array.isArray(mapped[k]) ? mapped[k].join('. ') : mapped[k];
            return;
          }

          const lower = k.toLowerCase();
          if (lower.includes('fullname') || lower === 'full_name') {
            normalized.fullName = mapped[k];
          } else if (lower.includes('email')) {
            normalized.email = mapped[k];
          } else if (lower.includes('phone')) {
            normalized.phone = mapped[k];
          } else if (lower.includes('about')) {
            normalized.about = mapped[k];
          } else if (lower.includes('note')) {
            normalized.notes = mapped[k];
          } else if (lower.includes('date') || lower.includes('booking')) {
            normalized.bookingDate = mapped[k];
          } else {
            // Unknown field - add to global
            if (!normalized._global) normalized._global = '';
            normalized._global += (normalized._global ? '. ' : '') + `${k}: ${mapped[k]}`;
          }
        });

        // If no fields were mapped, show all as global error
        if (Object.keys(normalized).length === 0) {
          const msgs = resp.errors.map((e) => {
            if (typeof e === 'string') return e;
            return e.message || e.msg || e.error || JSON.stringify(e);
          }).join('. ');
          normalized._global = msgs;
        }

        setFormErrors(normalized);
        toast.error(resp.message || 'Validation failed');
      } else if (resp && resp.message) {
        setFormErrors({ _global: resp.message });
        toast.error(resp.message);
      } else {
        const message = err?.message || 'Failed to submit booking';
        setFormErrors({ _global: message });
        toast.error(message);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="py-6 lg:py-10">
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-base text-[#0F766E] mb-4">
              <FaArrowLeft /> <span>Back</span>
            </button>

            {loading ? (
              <div className="py-12 text-center">Loading service…</div>
            ) : error ? (
              <div className="py-12 text-center text-red-600">{error}</div>
            ) : !item ? (
              <div className="py-12 text-center">Service not found.</div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {item.image && !imageError ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={() => setImageError(true)}
                    className="w-full md:w-64 h-48 md:h-52 rounded-md object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-full md:w-64 h-48 md:h-52 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm">
                    <span>No image</span>
                  </div>
                )}

                <div>
                  <h1 className="text-2xl font-bold text-[#000000]">{item.title}</h1>
                  <div className="text-base text-[#626262] mt-2">{item.serviceType || item.type}  {item.location}</div>

                  <div className="mt-6 text-base text-[#626262] leading-relaxed">
                    <h3 className="font-semibold text-[#000000] mb-2">About the Service Provider</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 bg-[#E7F1F1] rounded-md p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Contact</h3>

              {formErrors._global && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{formErrors._global}</div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-base text-[#000000] mb-2">Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Player" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                  {formErrors.fullName && <p className="text-red-600 text-sm mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                  {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">Phone Number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="enter your phone number" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                  {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">About Me</label>
                  <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="write about you" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-3 text-base h-28" />
                  {formErrors.about && <p className="text-red-600 text-sm mt-1">{formErrors.about}</p>}
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">Notes</label>
                  <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Prefer morning appointments" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                  {formErrors.notes && <p className="text-red-600 text-sm mt-1">{formErrors.notes}</p>}
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">Booking Date</label>
                  <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                  {formErrors.bookingDate && <p className="text-red-600 text-sm mt-1">{formErrors.bookingDate}</p>}
                </div>

                <div>
                  <button type="submit" disabled={submitLoading} className="bg-[#0F766E] text-white px-4 py-2 rounded-md">
                    {submitLoading ? 'Sending…' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetails;
