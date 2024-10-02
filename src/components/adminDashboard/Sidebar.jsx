// import { AuthContext } from '../../context/AuthContext';
// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';

// const Sidebar = ({setContent,isShow}) => {
//     const { logout } = useContext(AuthContext);  // Access authenticated

//     const handleTask = () => {
//         setContent('Task');
//     }
//     const handleEmployee = () => {
//         setContent('Employee');
//     }
    
//     return (
//         <div className={` ${isShow?'':'hidden'} w-[9rem] md:block h-full py-16 fixed left-0 bg-blue-gradient-2 text-white sm:w-[13rem] lg:w-64 p-5`}>
//             <h1 className="text-2xl font-bold mb-10">TaskFlow Admin</h1>
//             <nav>
//                 <ul>
//                     <li className="mb-4">
//                         <NavLink className="hover:text-blue-300 text-blue-200">Dashboard</NavLink>
//                     </li>
//                     <li className="mb-4">
//                         <NavLink onClick={handleTask} className="hover:text-blue-300 text-blue-200">Tasks</NavLink>
//                     </li>
//                     <li className="mb-4">
//                         <NavLink onClick={handleEmployee} className="hover:text-blue-300 text-blue-200">Employees</NavLink>
//                     </li>

//                     <li className="mb-4">
//                         <NavLink onClick={logout} className="hover:text-blue-300 text-blue-200">Logout</NavLink>
//                         </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Sidebar;





import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({setContent,isShow}) => {
    const { logout } = useContext(AuthContext);  // Access authenticated

    const handleTask = () => {
        setContent('Task');
    }
    const handleEmployee = () => {
        setContent('Employee');
    }
    
    return (
        <div className={` ${isShow?'visible':'hidden'}  w-[9rem] md:block h-full z-10 transition-all ease-in-out py-16 fixed left-0 bg-blue-gradient-2 text-white sm:w-[13rem] lg:w-64 p-5`}>
            <h1 className="text-2xl font-bold mb-10">TaskFlow Admin</h1>
            <nav>
                <ul>
                    <li className="mb-4">
                        <NavLink className="hover:text-blue-300 text-blue-200">Dashboard</NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink onClick={handleTask} className="hover:text-blue-300 text-blue-200">Tasks</NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink onClick={handleEmployee} className="hover:text-blue-300 text-blue-200">Employees</NavLink>
                    </li>

                    <li className="mb-4">
                        <NavLink onClick={logout} className="hover:text-blue-300 text-blue-200">Logout</NavLink>
                        </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
