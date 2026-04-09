import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import EventCard from './components/EventCard';

const MyEvents = () => {
  const initialEvents = [
  { 
    id: 1, 
    title: 'Sunday Football', 
    location: 'Richmond', 
    time: '6:00pm',
    imageSrc: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    status: 'Upcoming'
  },
  { 
    id: 2, 
    title: 'Basketball Championship', 
    location: 'Brooklyn Court', 
    time: '4:30pm',
    imageSrc: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    status: 'Upcoming'
  },
  { 
    id: 3, 
    title: 'Morning Tennis Club', 
    location: 'Central Park', 
    time: '8:00am',
    imageSrc: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4bd13?q=80&w=800&auto=format&fit=crop',
    status: 'Upcoming'
  },
  { 
    id: 4, 
    title: 'Swimming Gala', 
    location: 'Aquatic Center', 
    time: '10:00am',
    imageSrc: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=800&auto=format&fit=crop',
    status: 'Upcoming'
  },
  { 
    id: 5, 
    title: 'Cricket Friendly', 
    location: 'Oval Ground', 
    time: '11:00am',
    imageSrc: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop',
    status: 'Completed'
  },
  { 
    id: 6, 
    title: 'Evening Yoga', 
    location: 'Wellness Studio', 
    time: '7:00pm',
    imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    status: 'Completed'
  },
  { 
    id: 7, 
    title: 'Badminton Doubles', 
    location: 'Indoor Arena', 
    time: '5:00pm',
    imageSrc: 'https://images.unsplash.com/photo-1626225453014-4f58198f7143?q=80&w=800&auto=format&fit=crop',
    status: 'Completed'
  },
  { 
    id: 8, 
    title: 'Mountain Biking', 
    location: 'Green Valley', 
    time: '9:00am',
    imageSrc: 'https://images.unsplash.com/photo-1544191952-e56847844059?q=80&w=800&auto=format&fit=crop',
    status: 'Completed'
  },
];

  const [events, setEvents] = useState(initialEvents);

  const handleViewDetails = (eventId) => {
    console.log('View details for event:', eventId);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-8 h-8 text-btn-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Events</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            location={event.location}
            time={event.time}
            imageSrc={event.imageSrc}
            onViewDetails={() => handleViewDetails(event.id)}
            onDelete={() => handleDeleteEvent(event.id)}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found</p>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
