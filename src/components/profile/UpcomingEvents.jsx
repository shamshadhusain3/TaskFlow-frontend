import React from 'react';

const events = [
  { id: 1, title: 'React Conference', date: '2024-09-15', location: 'San Francisco, CA' },
  { id: 2, title: 'Tailwind CSS Workshop', date: '2024-10-05', location: 'New York, NY' },
  { id: 3, title: 'JavaScript Summit', date: '2024-11-20', location: 'Austin, TX' },
];

const UpcomingEvents = () => {
  return (
    <div className="w-4xl md:w-full mx-auto p-6 text-blue-500">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {events.map(event => (
            <li key={event.id} className="p-4 hover:bg-gray-100 transition">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500">{event.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingEvents;
