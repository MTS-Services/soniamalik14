import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../../../components/layout/Container';
import { GET, POST } from '../../../services/httpMethods';
import { ENDPOINT } from '../../../services/httpEndpoint';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Map, 
  Mail, 
  BriefcaseMedical, 
  Target, 
  Medal, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  const [error, setError] = useState(null);
  // const [imageError, setImageError] = useState(false);

  const [message, setMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

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
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast.error('Please write a message before submitting.');
      return;
    }

    const payload = {
      notes: trimmedMessage, 
      fullName: 'Guest User', 
      email: 'guest@example.com',
      phoneNumber: '00000000000'
    };

    setSubmitLoading(true);
    try {
      await POST(`${ENDPOINT.SERVICES.DETAIL(id)}/bookings`, payload);
      toast.success('Message sent! The provider will contact you shortly.');
      setMessage('');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to send message';
      toast.error(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

 
  const displayData = {
    title: item?.title || "Women's Sports Physio",
    coach: item?.coach || "John Doe",
    avatar: item?.avatar || "/images/login/image_2.jpg",
    description: item?.description || "This physiotherapy service is designed specifically for women athletes who play sports like cricket, football, futsal and other physical games.It helps prevent injuries, improve performance, and support recovery so players can stay fit and confident.",
    addressLine1: item?.addressLine1 || "123 High Street",
    townCity: item?.townCity || "Richmond",
    postcode: item?.postcode || "TW9 1AB",
    profession: item?.profession || "Physiotherapist",
    sessionType: item?.sessionType || "In Clinic",
    sport: item?.sport || "Football",
    registration: item?.registration || "HCPC Registered, CSP Member",
    insurance: item?.insurance || "Yes"
  };

  return (
    <section className="py-6 lg:py-10 bg-[#F8FAFC] ">
      <Container>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-base font-medium text-[#147B6B] hover:text-[#0D655D] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> <span>Back</span>
            </button>

            {loading ? (
              <div className="py-12 text-center text-gray-500">Loading service…</div>
            ) : error ? (
              <div className="py-12 text-center text-red-600">{error}</div>
            ) : (
              <div className="animate-in fade-in duration-300">
                
              
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={displayData.avatar}
                    alt={displayData.coach}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    className="w-[72px] h-[72px] rounded-full object-cover shadow-sm bg-gray-200"
                  />
                  <div>
                    <h1 className="text-[24px] md:text-3xl font-semibold text-[#0B544E] leading-tight">
                      {displayData.title}
                    </h1>
                    <p className="text-[#4A5565] text-base mt-1">
                      Coach: <span className="font-semibold text-[#1A1D1F]">{displayData.coach}</span>
                    </p>
                  </div>
                </div>

          
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                  <h3 className="font-bold text-[#1A1D1F] text-lg md:text-xl mb-3">About This Service</h3>
                  <p className="text-[#4A5565] text-[15px] leading-relaxed">
                    {displayData.description}
                  </p>
                </div>

                <h3 className="font-bold text-[#1A1D1F] text-xl mb-4">Service Overview</h3>
                <div className="space-y-3 mb-8">
                  
                  <OverviewRow icon={Building2} label="Clinic name" value={displayData.clinicName} />
                  <OverviewRow icon={MapPin} label="Address Line 1" value={displayData.addressLine1} />
                  <OverviewRow icon={Map} label="Town/City" value={displayData.townCity} />
                  <OverviewRow icon={Mail} label="Postcode" value={displayData.postcode} />
                  <OverviewRow icon={BriefcaseMedical} label="Primary Profession" value={displayData.profession} />
                  <OverviewRow icon={Target} label="Session Type" value={displayData.sessionType} />
                  <OverviewRow icon={Medal} label="Sport" value={displayData.sport} />
                  <OverviewRow icon={FileCheck} label="Professional Registration" value={displayData.registration} />
                  <OverviewRow icon={ShieldCheck} label="Insurance in place" value={displayData.insurance} />

                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#147B6B] hover:bg-[#0D655D] text-white px-6 py-2.5 rounded-lg text-[14px] font-medium transition-colors">
                    Book Now
                  </button>
                  <button className="bg-[#147B6B] hover:bg-[#0D655D] text-white px-6 py-2.5 rounded-lg text-[14px] font-medium transition-colors">
                    Register Interest
                  </button>
                </div>

              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-45 bg-[#E7F1F1] rounded-lg p-4 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1A1D1F] mb-4">Contact</h3>
              <p className="text-[#1A1D1F] text-base mb-3 ">Ask the organiser a question</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message" 
                  className="w-full bg-[#B5D5D2] rounded-xl p-4 text-base text-[#1A1D1F] placeholder-gray-500 border-none focus:ring-1 focus:ring-[#147B6B] resize-none h-32 mb-4"
                />
                
                <button 
                  type="submit" 
                  disabled={submitLoading}
                  className="bg-btn-primary text-white px-6 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#0D655D] transition-colors w-fit disabled:opacity-70"
                >
                  {submitLoading ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

// Reusable component for the Service Overview rows
const OverviewRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
    <div className="w-10 h-10 rounded-full bg-[#EAF2F1] flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-[#147B6B]" />
    </div>
    <div>
      <p className="text-base text-[#1A1D1F] font-semibold mb-0.5">{label}</p>
      <p className="text-base text-[#4A5565]">{value}</p>
    </div>
  </div>
);

export default ServiceDetails;