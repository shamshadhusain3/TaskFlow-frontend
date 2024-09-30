// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/all';
// import TeamMembers from './TeamMembers'



// // Register ScrollTrigger with GSAP
// gsap.registerPlugin(ScrollTrigger);



// const About = () => {
//   useEffect(() => {
//     // GSAP animation with ScrollTrigger
//     gsap.fromTo(
//       '.team-member',
//       { opacity: 0, y: 50 },
//       {
//         opacity: 1,
//         y: 0,
//         stagger:0.3,
//         // stagger: {
//         //   each: 0.2,
//         //   from: 'center',
//         //   grid: 'auto',
//         //   ease: 'power2.inOut',
//         //   // repeat: -1
//         // },
//         duration: 0.8,
//         ease: 'power3.out',
//         scrollTrigger: {
//           trigger: '.team-member',
//           start: 'top 80%', // Animation starts when the top of the element is 80% from the top of the viewport
//           end: 'bottom top', // Animation ends when the bottom of the element reaches the top of the viewport
//           toggleActions: 'play none none reverse', // Play animation when entering view, reverse when leaving view
//           markers: false, // Set to true to see the start/end markers
//         }
//       }
//     );
//   }, []);

//   return (
//     <div id='about' className="bg-gray-100 py-16">
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet The Team</h2>
//           <p className="text-lg text-gray-600">
//             We are the Logic Legion, a team of dedicated professionals committed to delivering exceptional solutions.
//           </p>
//         </motion.div>
//        <TeamMembers/>
//       </div>
//     </div>
//   );
// };

// export default About;



import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import TeamMembers from './TeamMembers';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const teamRef = useRef(null); // Create a ref for the team members container

  useEffect(() => {
    const elements = teamRef.current.children; // Get all team member elements

    // GSAP animation with ScrollTrigger
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamRef.current, // Set the trigger to the container of team members
          start: 'top 80%', // Animation starts when the top of the container is 80% from the top of the viewport
          end: 'bottom top', // Animation ends when the bottom of the container reaches the top of the viewport
          toggleActions: 'play none none reverse', // Play animation when entering view, reverse when leaving view
          scrub: true, // Allow scrubbing for smoother interaction
          markers: false, // Set to true to see the start/end markers
        }
      }
    );

    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id='about' className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet The Team</h2>
          <p className="text-lg text-gray-600">
            We are the Logic Legion, a team of dedicated professionals committed to delivering exceptional solutions.
          </p>
        </motion.div>
        <div ref={teamRef}> {/* Attach the ref here */}
          <TeamMembers />
        </div>
      </div>
    </div> 
  );
};

export default About;
