import React from 'react'
import { motion } from 'framer-motion';


function TeamMembers() {
    const teamMembers = [
        { name: 'Shamshad Husain', role: 'Leader', image: 'images/sd.png' },
        { name: 'Abhishek Tiwari', role: 'Developer', image: 'images/abhishek.png' },
        { name: 'Astha Sachan', role: 'Designer', image: 'images/astha.png' },
        { name: 'Harsh Shukla', role: 'Tester', image: 'images/harsh.png' }
      ];
  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
    {teamMembers.map((member, index) => (
      <motion.div
        key={index}
        className="team-member bg-white shadow-lg rounded-lg overflow-hidden w-72 text-center"
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <img src={member.image} alt={member.name} className=" object-cover h-56 w-56 translate-x-7 translate-y-2 rounded-full" />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
          <p className="text-gray-600">{member.role}</p>
        </div>
      </motion.div>
    ))}
  </div>
  )
}

export default TeamMembers
