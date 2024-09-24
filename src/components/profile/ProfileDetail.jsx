import React from 'react';

const ProfileDetail = () => {
  return (
    <div className="w-[90%] md:w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
      <div className="bg-blue-gradient-2 p-6 flex items-center gap-[4.5rem]">
        <div className="flex items-center">
          <img
            src="/images/userImage.png"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-white"
          />
        </div>
          <div className="flex flex-col justify-center items-center gap-4">
          <div className="ml-4 text-white">
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
        <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded">
          Update Pic.
        </button>
          </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-semibold">Name :</span>
          <span className="text-black">Astha Sachan</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-semibold">EmpId :</span>
          <span className="text-black">U2325</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-semibold">Email :</span>
          <span className="text-black">sachan***@gmail.com</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-semibold">Password :</span>
          <span className="text-black">U2325</span>
        </div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-gray-600 font-semibold">Phone :</span>
          <span className="text-black">885*****22</span>
        </div>
        <button className="w-full bg-blue-gradient-2 text-white font-semibold py-2 rounded hover:bg-blue-gradient hover:transition-all hover:duration-300 hover:ease-in-out  transition duration-300">
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileDetail;
