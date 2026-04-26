import React from 'react';
import EventCard from '../../myEvents/components/EventCard';


const UpcomingEvents = ({ events = [] }) => {
  const defaultEvents = [
    { id: 1, title: 'Sunday Football', location: 'Richmond', time: '6:00pm' },
    { id: 2, title: 'Sunday Football', location: 'Richmond', time: '6:00pm' },
    { id: 3, title: 'Sunday Football', location: 'Richmond', time: '6:00pm' },
  ];

  const eventsList = events.length > 0 ? events : defaultEvents;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#111827] mb-6">Upcoming Event</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {eventsList.map(event => (
          <EventCard 
            key={event.id}
            title={event.title}
            location={event.location}
            time={event.time}
            imageSrc={event.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
