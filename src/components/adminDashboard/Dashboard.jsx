import React from 'react';

const Dashboard = ({totalTasks,totalPendingTasks,totalCompletedTasks,totalEmployee}) => {
    return (
        <div className="p-5 sm:p-10 flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-bold mb-5">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg sm:text-xl font-semibold">Total Tasks</h3>
                    <p className="text-xl sm:text-2xl">{totalTasks}</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg sm:text-xl font-semibold">Completed Tasks</h3>
                    <p className="text-xl sm:text-2xl">{totalCompletedTasks}</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg sm:text-xl font-semibold">Active Employees</h3>
                    <p className="text-xl sm:text-2xl">{totalEmployee}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
