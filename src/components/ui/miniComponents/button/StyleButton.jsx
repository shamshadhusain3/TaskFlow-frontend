import React, { useState } from 'react';
import "./style-button.css";

export const StyleButton = ({ text, bg, border, hover, onClick,Iswhite }) => {
  const [isBtnWhite, setIsBtnWhite] = useState(Iswhite);

  return (
    <button
      onClick={onClick}
      className={`px-2 py-2 flex justify-center ${isBtnWhite?'text-blue-500':'text-white'} text-blue-500 newBtn items-center newBtn   rounded-full 
      ${bg} ${border} transition-colors duration-100 ease-in-out hover:${hover} hover:${border}`}
    >
      <span className="group-hover:scale-110 transition-all ease-in-out duration-500">
        {text}
      </span>
    </button>
  );
};
