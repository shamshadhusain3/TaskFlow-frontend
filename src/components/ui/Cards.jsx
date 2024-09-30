// import React from 'react';
// import './Card.css'

// const Card = ({ title, content, imageSrc, footer }) => {
//   return (
  
// <div id='services' className=" flip-card h-[40vh] w-[80vw]  md:h-[38vh] md:w-[24vw] rounded-xl  group">
//       <div className=" flip-card-inner ">
//         {/* Front Side */}
//         <div className=" flip-card-front bg-white ">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
//             <p className="text-gray-600 mb-4">{content}</p>
//           {footer && (
//             <div className="pt-4 mt-4 border-t border-gray-200">
//               {footer}
//             </div>
//           )}
//           </div>
//         </div>

//         {/* Back Side */}
//         <div className="card-back flip-card-back">
//           {imageSrc && (
//             <img
//               className="w-full h-full object-cover transition-transform duration-500 rounded-2xl"
//               src={imageSrc}
//               alt={title}
//             />
//           )}
//         </div>
//       </div>
//     </div>







//   );
// };

// export default Card;



// import React, { useRef, useEffect } from 'react';
// import gsap from 'gsap';
// import './Card.css';

// const Card = ({ title, content, imageSrc, footer }) => {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const card = cardRef.current;
//     const flipTimeline = gsap.timeline({ paused: true });

//     // GSAP Animation for flip effect
//     flipTimeline.to(card.querySelector('.flip-card-inner'), {
//       rotateY: 180,
//       ease: "power2.inOut",
//       duration: 1,
//     });

//     // Play animation on hover
//     card.addEventListener('mouseenter', () => {
//       flipTimeline.play();
//     });

//     // Reverse animation on mouse leave
//     card.addEventListener('mouseleave', () => {
//       flipTimeline.reverse();
//     });

//     return () => {
//       // Cleanup event listeners
//       card.removeEventListener('mouseenter', () => {});
//       card.removeEventListener('mouseleave', () => {});
//     };
//   }, []);

//   return (
//     <div ref={cardRef} className="flip-card h-[40vh] w-[90vw] md:h-[38vh] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] rounded-xl group perspective mx-auto md:mx-0">
//       <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d">
//         {/* Front Side */}
//         <div className="flip-card-front absolute w-full h-full bg-white p-4 shadow-lg rounded-lg flex flex-col justify-center items-center backface-hidden">
//           <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
//           <p className="text-gray-600 mb-4">{content}</p>
//           {footer && (
//             <div className="pt-4 mt-4 border-t border-gray-200">
//               {footer}
//             </div>
//           )}
//         </div>

//         {/* Back Side */}
//         <div className="flip-card-back absolute w-full h-full bg-gray-100 p-4 flex items-center justify-center backface-hidden rotateY-180">
//           {imageSrc && (
//             <img
//               className="w-full h-full object-cover transition-transform duration-500 rounded-2xl"
//               src={imageSrc}
//               alt={title}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;



import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Card.css';

const Card = ({ title, content, imageSrc, footer }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const flipTimeline = gsap.timeline({ paused: true });

    // GSAP Animation for flip effect
    flipTimeline.to(card.querySelector('.flip-card-inner'), {
      rotateY: 180,
      ease: "power2.inOut",
      duration: 1,
    });

    // Desktop hover-based flip effect
    const handleMouseEnter = () => flipTimeline.play();
    const handleMouseLeave = () => flipTimeline.reverse();

    if (window.innerWidth >= 768) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    // Scroll-based flip effect for mobile/tablet (only if screen is less than 768px)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7 && window.innerWidth < 768) {
            flipTimeline.play(); // Play flip animation when 30% of the card is in view
          } else {
            flipTimeline.reverse(); // Reverse flip animation if less than 30% is in view
          }
        });
      },
      { threshold: [0.7] } // Set threshold to 30% visibility
    );

    observer.observe(card);

    // Cleanup
    return () => {
      if (window.innerWidth >= 768) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, []);

  return (
    <div ref={cardRef} className="flip-card h-[40vh] w-[90vw] md:h-[38vh] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] rounded-xl group perspective mx-auto md:mx-0">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d">
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full bg-white p-4 shadow-lg rounded-lg flex flex-col justify-center items-center backface-hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{content}</p>
          {footer && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              {footer}
            </div>
          )}
        </div>

        {/* Back Side */}
        <div className="flip-card-back absolute w-full h-full bg-gray-100 p-4 flex items-center justify-center backface-hidden rotateY-180">
          {imageSrc && (
            <img
              className="w-full h-full object-cover transition-transform duration-500 rounded-2xl"
              src={imageSrc}
              alt={title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
