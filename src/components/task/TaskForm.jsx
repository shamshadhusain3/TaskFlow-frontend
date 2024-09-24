import React, { useState } from 'react';

const TaskForm = ({ onSubmit , employees = [], loading, error }) => {
    const [task, setTask] = useState({ 
        name: '', 
        assignedTo: '', 
        description: '', 
        status: 'Pending', 
        dueDate: '' 
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask({ 
            name: '', 
            assignedTo: '', 
            description: '', 
            status: 'Pending', 
            dueDate: '' 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-10">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-bold">Task Name</label>
                <input
                    type="text"
                    name="name"
                    value={task.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-bold">Assigned To</label>
                {/* <select
                    name="assignedTo"
                    value={task.assignedTo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Employee</option>
                    {loading && <option value="">Loading...</option>}
                    {error && <option value="">Error...</option>}
                    {Array.isArray(employees) && employees.length > 0 && 
                        employees.map((employee) => (
                            <option key={employee.id} value={employee.firstName}>
                                {employee.firstName} {employee.lastName} - {employee.id}
                            </option>
                        ))
                    }
                </select> */}
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-bold">Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-bold">Status</label>
                <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-bold">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <button 
                type="submit"
                disabled={loading}  // Disable button if loading
                className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
                {loading ? 'Saving...' : 'Save Task'}
            </button>
            {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
        </form>
    );
};

export default TaskForm;
