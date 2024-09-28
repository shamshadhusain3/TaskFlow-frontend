// import React from 'react';

// const ProfileDetail = ({me}) => {
//   return (
//     <div className="w-[90%] md:w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
//       <div className="bg-blue-gradient-2 p-6 flex items-center gap-[4.5rem]">
//         <div className="flex items-center">
//           <img
//             src="/images/userImage.png"
//             alt="profile"
//             className="w-20 h-20 rounded-full object-cover border-2 border-white"
//           />
//         </div>
//           <div className="flex flex-col justify-center items-center gap-4">
//           <div className="ml-4 text-white">
//             <h2 className="text-xl font-semibold">Profile</h2>
//           </div>
//         <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded">
//           Update Pic.
//         </button>
//           </div>
//       </div>
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-gray-600 font-semibold">Name :</span>
//           <span className="text-black">{me?.fName} {me?.lName}</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-gray-600 font-semibold">EmpId :</span>
//           <span className="text-black">{me?.empId}</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-gray-600 font-semibold">Email :</span>
//           <span className="text-black">{me?.email}</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-gray-600 font-semibold">manager :</span>
//           <span className="text-black">{me?.suser}</span>
//         </div>
//         <div className="flex items-center justify-between mb-8">
//           <span className="text-gray-600 font-semibold">Phone :</span>
//           <span className="text-black">{me?.phone}</span>
//         </div>
//         <button className="w-full bg-blue-gradient-2 text-white font-semibold py-2 rounded hover:bg-blue-gradient hover:transition-all hover:duration-300 hover:ease-in-out  transition duration-300">
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileDetail;



// ProfileDetail.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProfileDetail = ({ me }) => {
    const profileRef = useRef();

    useEffect(() => {
        gsap.fromTo(
            profileRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
    }, []);

    return (
        <div
            ref={profileRef}
            className="max-w-lg md:max-w-3xl mx-auto my-6 p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        >
            <div className="flex flex-col items-center bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-t-lg shadow-lg text-center">
                <img
                    src="/images/userImage.png"
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 hover:scale-110"
                />
                <h2 className="text-3xl font-bold text-white mt-4">Profile</h2>
                <button className="mt-2 bg-white text-blue-700 font-semibold py-1 px-4 rounded-lg shadow hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
                    Update Pic
                </button>
            </div>
            <div className="p-4">
                {/** Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/** Name Card */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-semibold">Name:</span>
                            <span className="text-gray-900">{me?.fName} {me?.lName}</span>
                        </div>
                    </div>
                    {/** EmpId Card */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-semibold">EmpId:</span>
                            <span className="text-gray-900">{me?.empId}</span>
                        </div>
                    </div>
                    {/** Email Card */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-semibold">Email:</span>
                            <span className="text-gray-900">{me?.email}</span>
                        </div>
                    </div>
                    {/** Manager Card */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-semibold">Manager:</span>
                            <span className="text-gray-900">{me?.suser}</span>
                        </div>
                    </div>
                    {/** Phone Card */}
                    {/* <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-semibold">Phone:</span>
                            <span className="text-gray-900">{me?.phone}</span>
                        </div>
                    </div> */}
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105">
                    Update
                </button>
            </div>
        </div>
    );
};

export default ProfileDetail;
