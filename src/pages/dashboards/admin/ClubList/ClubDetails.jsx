import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, MapPin, X } from 'lucide-react';
import ClubListDetailsc from './ClubListDetailsc';

export default function ClubDetails({ product, onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clubDetails = {
    clubName: 'Rising Winners FC',
    clubType: "Women's Football Club",
    clubOwner: 'Dinah Freetzel',
    motto: 'Building champions through community sport',
    founded: '2019',
    yearRegistration: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    ownerName: 'Logan Kibler',
    email: 'logan@loganemail.com',
    phone: '+88 7735 882024',
    userRole: 'Club Owner',
    accountStatus: 'Active',
    joinedDate: 'March 12, 2025',
    totalMembers: 128,
    activePlayers: 94,
    coaches: 8,
    teams: 5,
    upcomingSessions: 14,
    eventHosted: 15,
    recruitmentPosts: 5,
    recruitmentReplies: 3,
    groundName: 'Royal Sports Arena',
    address: '45 Edgeware Road, London, UK',
    type: 'Outdoor / Indoor',
    floodLights: 'Yes',
    changeRooms: 'Multiple',
    parking: 'Available',
    medicalSupport: 'On-site',
    description:
      'Royal Strikers Cricket Club is a professional sports club focused on developing young and talented players in both cricket and football. The club provides modern training facilities, experienced coaches, and competitive match exposure to help athletes reach their full potential.',
  };

  // Merge values from `product` (passed from ClubList) with defaults
  const details = {
    ...clubDetails,
    clubName: product?.name ?? clubDetails.clubName,
    clubOwner: product?.owner ?? clubDetails.clubOwner,
    phone: product?.phone ?? clubDetails.phone,
    address: product?.location ?? clubDetails.address,
    logo:
      product?.logo ??
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&q=60&auto=format&fit=crop',
    motto: product?.motto ?? clubDetails.motto,
  };

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1593&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Player',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1597260390013-62759ab52867?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Goalkeeper',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1693683223591-59fb0ec0ce86?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Match',
    },
  ];

  const ClubDetailsImg =
    'https://images.unsplash.com/photo-1629977007371-0ba395424741?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBmb290YmFsbHxlbnwwfHwwfHx8MA%3D%3D';
  return (
    <div className="min-h-screen  dashboardPy dashboardSpaceY">
      {/* Header */}
      <div className=" py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2   text-[#0F766E] transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Club header: logo, name & motto */}
      <div className=" pb-2">
        <div className="flex items-center gap-4 rounded-lg m">
          <img
            src={details.logo}
            alt={details.clubName + ' logo'}
            className="h-20 w-20 rounded-full border object-cover"
          />
      
        </div>
      </div>

      {/* Main Content */}
      <div className=" pb-6">
        {/* Hero Image */}
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={ClubDetailsImg}
            alt="Club"
            className="aspect-[1111/558] max-h-120 w-full rounded-[12px] object-cover"
          />
        </div>

        {/* Gallery */}
        <div className="mb-6">
          {/* <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium">See All</a> */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            {galleryImages.map((image) => (
              <img
                key={image.id}
                src={image.src}
                alt={image.alt}
                className="aspect-[357/243] w-full max-w-[557px] cursor-pointer rounded-2xl object-cover"
                onClick={() => setIsModalOpen(true)}
              />
            ))}
          </div>
        </div>


        <div className='text-[#0F766E] underline pb-2'>See All</div>

        {/* Club Info Grid */}

        <div className="mb-6 flex flex-col-reverse md:flex-row justify-between gap-6">
       <div className="space-y-4 md:max-w-2/4">

  {/* Basic Club Info */}
  <p className="text-base  text-gray-900"><strong>Club Name :</strong> {details.clubName}</p>
  <p className="text-base  text-gray-900"><strong>Club Type :</strong> {details.clubType}</p>
  <p className="text-base  text-gray-900"><strong>Club Game :</strong> {details.clubOwner}</p>
  <p className="text-base  text-gray-900"><strong>Games :</strong> Cricket & Football</p>
  <p></p>
  <p className="text-base  text-gray-900 flex  gap-2"><MapPin /> {details.yearRegistration}</p>
  <p className="text-base  text-gray-900"><strong>Founded :</strong> {details.founded}</p>
  <p className="text-xl  text-gray-900"><strong>Club Description </strong> </p>
  <p className='text-base  text-gray-900 pb-2'>{details.description}</p>

  {/* Club Stats */}
  <p className="text-base  text-gray-900">Total Members : {details.totalMembers}</p>
  <p className="text-base  text-gray-900">Active Players : {details.activePlayers}</p>
  <p className="text-base  text-gray-900">Coaches : {details.coaches}</p>
  <p className="text-base  text-gray-900">Teams : {details.teams}</p>
  <p className="text-base  text-gray-900">Upcoming Sessions : {details.upcomingSessions}</p>
  <p className="text-base  text-gray-900">Events Hosted : {details.eventHosted}</p>
  <p className="text-base  text-gray-900">Recruitment Posts : {details.recruitmentPosts}</p>
  <p className="text-base  text-gray-900">Recruitment Replies : {details.recruitmentReplies}</p>

  {/* Facilities & Grounds */}
  <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4">Facilities & Grounds</h3>
  <p className="text-base  text-gray-900"><strong>Ground Name :</strong> {details.groundName}</p>
  <p className="text-base  text-gray-900"><strong>Address :</strong> {details.address}</p>
  <p className="text-base  text-gray-900"><strong>Type :</strong> {details.type}</p>
  <p className="text-base  text-gray-900"><strong>Flood Lights :</strong> {details.floodLights}</p>
  <p className="text-base  text-gray-900"><strong>Change Rooms :</strong> {details.changeRooms}</p>
  <p className="text-base  text-gray-900"><strong>Parking :</strong> {details.parking}</p>
  <p className="text-base  text-gray-900"><strong>Medical Support :</strong> {details.medicalSupport}</p>
      
      
      
      
</div>
      
         <div className="h-65 w-full max-w-sm rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-3">
              <p className="text-base font-medium text-black">
                <strong>Owner Name:</strong> {details.ownerName}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-base font-medium text-black">
                <strong>Email:</strong> {details.email}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-base font-medium text-black">
                <strong>Phone:</strong> {details.phone}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-base font-medium text-black">
                <strong>User Role:</strong> {details.userRole}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-base font-medium text-black">
                <strong>Account Status:</strong> {details.accountStatus}
              </p>
            </div>

            <div>
              <p className="text-base font-medium text-black">
                <strong>Joined Date:</strong> {details.joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Image */}
      {isModalOpen && (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black py-4">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-white p-1 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <img
              src="https://images.unsplash.com/photo-1531748369411-4e1121627773?w=1200&h=600&fit=crop"
              alt="Club"
              className="h-auto w-full"
            />
          </div>
        </div>
      )}




      <ClubListDetailsc/>
    </div>



  );
}
