import React from 'react';
import './Card.css'

const Card = ({ title, content, imageSrc, footer }) => {
  return (
  
<div id='services' className=" flip-card h-[40vh] w-[80vw]  md:h-[38vh] md:w-[24vw] rounded-xl  group">
      <div className=" flip-card-inner ">
        {/* Front Side */}
        <div className=" flip-card-front bg-white ">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{content}</p>
          {footer && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              {footer}
            </div>
          )}
          </div>
        </div>

        {/* Back Side */}
        <div className="card-back flip-card-back">
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
