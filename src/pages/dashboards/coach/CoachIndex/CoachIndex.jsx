// import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
// import Card from '../../../../components/ui/Card';
// import Button from '../../../../components/ui/Button';
// import { IoLocationOutline } from 'react-icons/io5';
// import PageHeader from '../../../../components/ui/PageHeader';
// import SectionHeader from '../../../../components/ui/SectionHeader';
// import CreateRecruitmentModal from '../../../../components/ui/CreateRecruitmentModal';
// import EventModal from '../../../../components/ui/EventModal';

// const CoachIndex = () => {
//   const [isPostModalOpen, setIsPostModalOpen] = useState(false);
//   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
//   return (
//     <div className="dashboardPy dashboardSpaceY">
//       {/* Profile header */}
//       <Card className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6">
//         <div className="flex flex-col lg:flex-row items-center gap-4">
//           <img
//             src="/coachindex.jpg"
//             alt="coach"
//             className="w-28 h-28 rounded-lg object-cover shadow-sm"
//           />

//           <div>
//             <PageHeader title="Northside Elite Football" />
//             <p className="text-base text-secondary-text mt-1 flex items-center gap-1 "> <IoLocationOutline />Manchester, UK</p>
//             <p className="text-base text-description mt-2 max-w-2xl">
//               Leading the way in youth female development. Our mission is to provide
//               professional-grade training and competition for girls aged 12-18 across the North West.
//             </p>
//           </div>
//         </div>

//         <div className="self-stretch lg:self-auto flex items-center justify-end w-full lg:w-auto">
//           <Link to="/coach/settings" className="w-full lg:w-auto lg:ml-2">
//             <Button className="w-full lg:w-auto px-4 py-2 rounded-lg" variant="primary">Edit Profile</Button>
//           </Link>
//         </div>
//       </Card>

//       {/* Two column area */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recruitment Ads */}
//         <Card className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold">Recruitment Ads</h3>
//             <button onClick={() => setIsPostModalOpen(true)} className="text-btn-primary font-medium">+ Post New</button>
//           </div>

//           <div className="space-y-7.5">
//             {[{
//               title: 'U16 Goalkeeper Wanted',
//               applicants: 12,
//               status: 'Active'
//             }, {
//               title: 'Senior Midfielder - Trial Days',
//               applicants: 45,
//               status: 'Active'
//             }, {
//               title: 'Assistant Coach (Volunteer)',
//               applicants: 3,
//               status: 'Pending'
//             }].map((ad, i) => (
//               <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-4">
//                 <div>
//                   <h4 className="font-medium">{ad.title}</h4>
//                   <p className="text-base text-secondary-text mt-1">{ad.applicants} Applicants</p>
//                   <Link to="#" className="text-btn-primary text-base mt-2 inline-block">View Listing</Link>
//                 </div>
//                 <div className="text-base">
//                   <span className={`px-3 py-1 rounded-full text-xs ${ad.status === 'Active' ? 'bg-[#E7F1F1] text-[#0F766E]' : 'bg-[#FFDAB9] text-[#FF7700]'}`}>{ad.status}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Your Events */}
//         <Card className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-xl font-semibold">Your Events</h3>
//             <button onClick={() => setIsEventModalOpen(true)} className="text-btn-primary font-medium">+ Create Event</button>
//           </div>

//           <div className="space-y-4">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white border border-gray-100 rounded-lg p-4">
//                 <div className="flex items-center gap-4 flex-1">
//                   <div className="text-center bg-gray-50 rounded-lg w-14 h-14 flex flex-col items-center justify-center">
//                     <div className="text-base text-[#676767]">OCT</div>
//                     <div className="font-semibold !text-[#0F766E]">21</div>
//                   </div>
//                   <div>
//                     <h4 className="font-medium">Open Trial Morning</h4>
//                     <p className={`text-base mt-1 ${i < 2 ? 'text-[#0F766E]' : 'text-[#FF7700]'}`}>
//                       {i < 2 ? 'Approved' : 'Pending'}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="w-full lg:w-auto mt-3 lg:mt-0">
//                   <Button variant="outline" className="w-full lg:w-auto !bg-[#0F766E] !text-white rounded-lg px-2 md:px-4 py-2">See Details</Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//       <CreateRecruitmentModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
//       <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} mode="create" />
//     </div>
//   );
// };

// export default CoachIndex;







import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import CreateRecruitmentModal from '../../../../components/ui/CreateRecruitmentModal';
import EventModal from '../../../../components/ui/EventModal';
import ProfileHeader from './components/ProfileHeader';
import RecruitmentAds from './components/RecruitmentAds';
import EventsList from './components/EventsList';
import RecentPlayerActivity from './components/RecentPlayerActivity';

const CoachIndex = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Mock Data for Table
  const playersActivity = [
    { name: "Devon Lane", phone: "(405) 555-0128", email: "jackson.graham@example.com", message: "Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam", date: "12 Mar 26" },
    { name: "Wade Warren", phone: "(603) 555-0123", email: "alma.lawson@example.com", message: "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus bl", date: "12 Mar 26" },
    { name: "Robert Fox", phone: "(209) 555-0104", email: "nevaeh.simmons@example.com", message: "Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus bl", date: "12 Mar 26" },
    { name: "Cameron Williamson", phone: "(303) 555-0105", email: "tim.jennings@example.com", message: "Donec sed erat ut magna suscipit mattis. Aliquam erat volutpat. Morbi in orci risus. Donec pretium f", date: "12 Mar 26" },
    { name: "Marvin McKinney", phone: "(704) 555-0127", email: "michael.mitc@example.com", message: "In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo", date: "12 Mar 26" },
    { name: "Esther Howard", phone: "(239) 555-0108", email: "georgia.young@example.com", message: "Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibus. P", date: "12 Mar 26" },
  ];

  return (
    <div className="dashboardPy dashboardSpaceY">
      {/* Profile header (moved to component) */}
      <Card className="flex flex-col lg:flex-row items-center justify-between gap-4 p-6">
        <ProfileHeader />
        <div className="self-stretch lg:self-auto flex items-center justify-end w-full lg:w-auto">
          <Link to="/coach/settings" className="w-full lg:w-auto lg:ml-2">
            <Button className="w-full lg:w-auto px-4 py-2 rounded-lg" variant="primary">Edit Profile</Button>
          </Link>
        </div>
      </Card>

      {/* Two column area (Same as your code) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruitment Ads (moved to component) */}
        <Card className="p-6">
          <RecruitmentAds onPost={() => setIsPostModalOpen(true)} />
        </Card>

        {/* Events (moved to component) */}
        <Card className="p-6">
          <EventsList onCreateEvent={() => setIsEventModalOpen(true)} />
        </Card>
      </div>

      {/* --- RECENT PLAYER ACTIVITY TABLE START --- */}
      
        <RecentPlayerActivity players={playersActivity} />
    
      {/* --- RECENT PLAYER ACTIVITY TABLE END --- */}

      <CreateRecruitmentModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} mode="create" />
    </div>
  );
};

export default CoachIndex;