import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const EmployeeCard = ({ name, role, email, imageUrl }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="max-w-md w-96 rounded-lg flex justify-between flex-wrap items-center shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-105"
    >
      <img
        className="w-[88px] h-[88px] object-cover rounded-full ml-4"
        src={imageUrl}
        alt={`${name}'s photo`}
      />
      <div className="p-4 flex flex-col gap-1 ">
        <h3 className="text-xl font-semibold items-end ">{name}</h3>
        <p className="text-gray-700 ">{role}</p>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
