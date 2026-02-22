import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../../../components/layout/Container';
import { FaArrowLeft } from 'react-icons/fa';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const item = location.state?.item || {
    id: params.id,
    title: 'Service Provider',
    type: 'Physios',
    location: '2715 Ash Dr. San Jose, South Dakota 83475',
    description: "A certified provider with years of experience helping players improve skills, fitness, and confidence.",
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop',
  };

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');

  return (
    <section className="py-6 lg:py-10">
      <Container>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-base text-[#0F766E] mb-4">
              <FaArrowLeft /> <span>Back</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <img src={item.image} alt={item.title} className="w-full md:w-64 h-48 md:h-52 rounded-md object-cover shadow-sm" />

              <div>
                <h1 className="text-2xl font-bold text-[#000000]">{item.title}</h1>
                <div className="text-base text-[#626262] mt-2">{item.type}  {item.location}</div>

                <div className="mt-6 text-base text-[#626262] leading-relaxed">
                  <h3 className="font-semibold text-[#000000] mb-2">About the Service Provider</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#E7F1F1] rounded-md p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Contact</h3>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-base text-[#000000] mb-2">Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Player" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">Phone Number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="enter your phone number" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-2 text-base" />
                </div>

                <div>
                  <label className="block text-base text-[#000000] mb-2">About Me</label>
                  <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="write about you" className="w-full rounded-md border border-gray-200 bg-[#B5D5D2] px-3 py-3 text-base h-28" />
                </div>

                <div>
                  <button onClick={() => alert('Request submitted')} className="bg-[#0F766E] text-white px-4 py-2 rounded-md">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetails;
