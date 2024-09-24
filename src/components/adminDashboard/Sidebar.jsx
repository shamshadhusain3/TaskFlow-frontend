import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({setContent}) => {

    const handleTask = () => {
        setContent('Task');
    }
    const handleEmployee = () => {
        setContent('Employee');
    }
    
    return (
        <div className=" hidden md:block h-full py-16 fixed left-0 bg-blue-gradient-2 text-white w-64 p-5">
            <h1 className="text-2xl font-bold mb-10">TaskFlow Admin</h1>
            <nav>
                <ul>
                    <li className="mb-4">
                        <NavLink className="hover:text-blue-300" activeClassName="text-blue-200">Dashboard</NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink onClick={handleTask} className="hover:text-blue-300" activeClassName="text-blue-200">Tasks</NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink onClick={handleEmployee} className="hover:text-blue-300" activeClassName="text-blue-200">Employees</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
