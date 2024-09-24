import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { gapi } from 'gapi-script'; // Ensure you've added gapi-script to your project

const GoogleCalendarCard = () => {
  const cardRef = useRef(null);
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Load Google API script
    const initClient = () => {
      gapi.client.init({
        apiKey: 'AIzaSyDzZjPWm0qhI5iUQfO2EFrkDaKSvTr6gbg',
        clientId: '676065544673-ek0c35fcpjlhnshfaiilp0uk82l3en84.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      }).then(() => {
        return gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        });
      }).then((response) => {
        const events = response.result.items;
        setCalendarEvents(events);
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <div
      ref={cardRef}
      className="max-w-md w-96 rounded-lg shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105"
    >
      <div className="p-4">
        <h3 className="text-xl font-semibold">Upcoming Google Calendar Events</h3>
        <ul className="mt-4 space-y-2">
          {calendarEvents.length > 0 ? (
            calendarEvents.map((event) => (
              <li key={event.id} className="text-gray-700">
                {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
              </li>
            ))
          ) : (
            <li>No upcoming events</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GoogleCalendarCard;
