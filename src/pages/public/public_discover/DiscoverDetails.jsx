import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import Container from '../../../components/layout/Container';

const DiscoverDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item || {
    id,
    title: 'Woking Warriors FC',
    type: 'Women\'s Football Club',
    location: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    day: 'Monday, Wednesday',
    time: '7:00 PM – 9:00 PM',
    homeGround: 'Woking Community Football Stadium',
    image: '/images/detaisPage/detailsBanner.png',
    image2: '/images/detaisPage/sideImage1.png',
    image3: '/images/detaisPage/sideImage1.png',
    about:
      'Woking Warriors FC is a women-focused football club committed to developing talent, teamwork, and confidence. We provide a supportive environment for players to grow both on and off the field.',
    contactEmail: 'info@wokingwarriorsfc.com',
    phone: '+1 234 567 890',
    level: 'Beginner to Intermediate',
    ageGroup: '16+ Years',
    experienceRequired: 'Basic football knowledge preferred (not mandatory)',
    trainingFrequency: '2 days per week',
    matchSchedule: 'Weekend matches & friendly games',
    seasonDuration: '6 months',
    headCoach: 'Sarah Williams',
    coachingStyle: 'Fitness-focused, tactical & player-friendly',
    trialRequired: 'Yes',
    trialDate: '15 September 2025',
    trialTime: '6:30 PM',
    trialLocation: 'Woking Community Football Stadium',
    postedBy: 'Woking Warriors FC (Club Owner)',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Interest submitted — demo only');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Container>
        <div className="py-4 md:py-6 lg:py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#323232] hover:text-[#1D1D1D] mb-4 md:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-96 lg:h-screen rounded-lg overflow-hidden mb-4 md:mb-6">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>

          {/* Two Images Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
            <div className="h-48 md:h-full rounded-md overflow-hidden">
              <img src={item.image2 || item.image} alt="Club" className="w-full h-full object-cover" />
            </div>
            <div></div>
            <div className="h-48 md:h-full rounded-md overflow-hidden">
              <img src={item.image3 || item.image} alt="Club" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Content - Club Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Club Name & Type */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1D1D1D] mb-1">
                  <span className="font-semibold">Club Name:</span> {item.title}
                </h1>
                <p className="text-base text-[#323232] mb-2">
                  <span className="font-semibold">Club Type:</span> {item.type}
                </p>
                <div className="flex items-start gap-2 text-[#323232]">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{item.location}</span>
                </div>
              </div>

              {/* Training Details */}
              <div className="space-y-2 text-[#323232]">
                <p className="text-sm md:text-base">
                  <span className="font-semibold text-[#1D1D1D]">Training Days:</span> {item.day}
                </p>
                <p className="text-sm md:text-base">
                  <span className="font-semibold text-[#1D1D1D]">Training Time:</span> {item.time}
                </p>
                <p className="text-sm md:text-base">
                  <span className="font-semibold text-[#1D1D1D]">Home Ground:</span> {item.homeGround}
                </p>
              </div>

              {/* About the Club */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] mb-3">About the Club</h2>
                <p className="text-sm md:text-base text-[#323232] leading-relaxed">{item.about}</p>
              </div>

              {/* We Are Looking For */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">We Are Looking For:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-[#323232]">
                  <li>Midfielder</li>
                  <li>Defender</li>
                  <li>Goalkeeper</li>
                </ul>
              </div>

              {/* Skill Level */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Skill Level:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.level}</p>
              </div>

              {/* Age Group */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Age Group:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.ageGroup}</p>
              </div>

              {/* Experience Required */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Experience Required:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.experienceRequired}</p>
              </div>

              {/* Training Frequency */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Training Frequency:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.trainingFrequency}</p>
              </div>

              {/* Match Schedule */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Match Schedule:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.matchSchedule}</p>
              </div>

              {/* Season Duration */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Season Duration:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.seasonDuration}</p>
              </div>

              {/* What We Offer */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">What We Offer</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-[#323232]">
                  <li>Professional coaching</li>
                  <li>Regular match exposure</li>
                  <li>Safe & women-only environment</li>
                  <li>Skill development sessions</li>
                  <li>Team jerseys & equipment support</li>
                </ul>
              </div>

              {/* Head Coach */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Head Coach:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.headCoach}</p>
              </div>

              {/* Coaching Style */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Coaching Style:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.coachingStyle}</p>
              </div>

              {/* Trial Required */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Trial Required:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.trialRequired}</p>
              </div>

              {/* Trial Date */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Trial Date:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.trialDate}</p>
              </div>

              {/* Trial Time */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Trial Time:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.trialTime}</p>
              </div>

              {/* Trial Location */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Trial Location:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.trialLocation}</p>
              </div>

              {/* Posted By */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Posted By:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.postedBy}</p>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Contact Email:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.contactEmail}</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D] mb-2">Phone:</h3>
                <p className="text-sm md:text-base text-[#323232]">{item.phone}</p>
              </div>
            </div>

            {/* Right Sidebar - Register Interest Form */}
            <aside className="lg:col-span-1">
              <div className="bg-[#E7F1F1] rounded-lg p-6 lg:sticky lg:top-40 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
                <h2 className="text-xl font-bold text-[#1D1D1D] mb-6">Register Interest</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1D] mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Player"
                      className="w-full px-4 py-3 rounded-md bg-loginInput border-none text-sm text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none focus:ring-2 focus:ring-btn-primary"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1D] mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="enter your email"
                      className="w-full px-4 py-3 rounded-md bg-loginInput border-none text-sm text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none focus:ring-2 focus:ring-btn-primary"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1D] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="enter your phone number"
                      className="w-full px-4 py-3 rounded-md bg-loginInput border-none text-sm text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none focus:ring-2 focus:ring-btn-primary"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1D] mb-2">Position</label>
                    <input
                      type="text"
                      placeholder="write your position"
                      className="w-full px-4 py-3 rounded-md bg-loginInput border-none text-sm text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none focus:ring-2 focus:ring-btn-primary"
                    />
                  </div>

                  {/* Skill Level */}
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1D] mb-2">Skill Level</label>
                    <select className="w-full px-4 py-3 rounded-md bg-loginInput border-none text-sm text-[#1D1D1D] focus:outline-none focus:ring-2 focus:ring-btn-primary">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  {/* About Me */}
                  <div>
                    <label className="block text-sm font-medium text-[#1D1D1D] mb-2">About Me</label>
                    <textarea
                      placeholder="write about you"
                      rows="4"
                      className="w-full px-4 py-3 rounded-md bg-loginInput border-none text-sm text-[#1D1D1D] placeholder-[#5E5E5E] focus:outline-none focus:ring-2 focus:ring-btn-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-btn-primary hover:bg-[#0d655d] text-white font-medium px-6 py-2.5 rounded-md transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DiscoverDetails;
