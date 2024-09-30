// import React from 'react'
// import { motion } from 'framer-motion';


// function TeamMembers() {
//     const teamMembers = [
//         { name: 'Shamshad Husain', role: 'Leader', image: 'images/sd.png' },
//         { name: 'Abhishek Tiwari', role: 'Developer', image: 'images/abhishek.png' },
//         { name: 'Astha Sachan', role: 'Designer', image: 'images/astha.png' },
//         { name: 'Harsh Shukla', role: 'Tester', image: 'images/harsh.png' }
//       ];
//   return (
//     <div className="flex flex-wrap justify-center items-center gap-8">
//     {teamMembers.map((member, index) => (
//       <motion.div
//         key={index}
//         className="team-member bg-white shadow-lg rounded-lg overflow-hidden w-72 text-center"
//         whileHover={{ scale: 1.05, y: -10 }}
//         transition={{ duration: 0.3 }}
//       >
//         <img src={member.image} alt={member.name} className=" object-cover h-56 w-56 translate-x-7 translate-y-2 rounded-full" />
//         <div className="p-4">
//           <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
//           <p className="text-gray-600">{member.role}</p>
//         </div>
//       </motion.div>
//     ))}
//   </div>
//   )
// }

// export default TeamMembers


import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TeamMembers() {
    const teamMembers = [
        { name: 'Shamshad Husain', role: 'Leader', image: 'images/sd.png' },
        { name: 'Abhishek Tiwari', role: 'Developer', image: 'images/abhishek.png' },
        { name: 'Astha Sachan', role: 'Designer', image: 'images/astha.png' },
        { name: 'Harsh Shukla', role: 'Tester', image: 'images/harsh.png' }
    ];

    const memberRefs = useRef([]);

    useEffect(() => {
        // Iterate through each team member and create scroll-triggered animations
        memberRefs.current.forEach((memberRef, index) => {
            gsap.fromTo(
                memberRef,
                { opacity: 0, y: 50 },  // Start position and opacity
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: memberRef,
                        start: 'top 70%', // Start animation when 70% of the card is in view
                        toggleActions: 'play none none none',  // Only play once when scrolling down
                    },
                    delay: index * 0.3, // Staggered delay for each card
                }
            );
        });

        return () => {
            // Cleanup GSAP scroll triggers on unmount
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-center gap-8">
            {teamMembers.map((member, index) => (
                <motion.div
                    key={index}
                    ref={el => memberRefs.current[index] = el} // Assign each member card to the refs array
                    className="team-member bg-white shadow-lg rounded-lg overflow-hidden w-72 text-center"
                    whileHover={{ scale: 1.05, y: -10 }}  // Hover animation
                    transition={{ duration: 0.3 }}
                >
                    <img src={member.image} alt={member.name} className="object-cover h-56 w-56 translate-x-7 translate-y-2 rounded-full" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default TeamMembers;
