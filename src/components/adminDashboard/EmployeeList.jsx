import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ToastContainer, toast } from 'react-toastify';


const EmployeeList = ({ employees, onAdd, onRemove, onUpdate, loading, error }) => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({ fName: '', lName: '', role: '', email: '', password: '' });
    const formRef = useRef(null);

    useEffect(() => {
        if (showForm) {
            gsap.fromTo(formRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    }, [showForm]);

    const handleAddOrUpdateEmployee = async (event) => {
        event.preventDefault();
        const fName = event.target.first_name.value;
        const lName = event.target.last_name.value;
        const role = event.target.role.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const user = localStorage.getItem('user');
        const suserId = JSON.parse(user);
        const suser = suserId.empId+" "+suserId.fName;



        if (fName && lName && role && email && password) {
            if (isEditing) {
                // Update employee
                await onUpdate(currentEmployee.id, { fName, lName, role, email, password , suser});
                toast.success('Employee updated successfully!');
                setIsEditing(false);
            } else {
                // Add new employee
                await onAdd({ fName, lName, role, email, password, suser });
                toast.success('Employee added successfully!');
            }
            toggleForm();
        } else {
            toast.error('Please fill in all fields.');
        }
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleRemoveEmployee = async (employee) => {
        await onRemove(employee.id);
        toast.success('Employee removed successfully!');
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        if (!showForm) {
            setCurrentEmployee({ fName: '', lName: '', role: '', email: '' , password: '' , suser:''});
            setIsEditing(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-5 sm:p-10">
            <ToastContainer />
            <h2 className="text-2xl sm:text-3xl font-bold mb-5">Employee Management</h2>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-5">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="pb-4 text-sm sm:text-base">Name</th>
                            <th className="pb-4 text-sm sm:text-base">Role</th>
                            <th className="pb-4 text-sm sm:text-base">Email</th>
                            <th className="pb-4 text-sm sm:text-base">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(employees) && employees.map((employee, index) => (
                            <motion.tr
                                key={index}
                                className="border-t"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <td className="py-4 text-sm sm:text-base">{employee.fName} {employee.lName}</td>
                                <td className="text-sm sm:text-base">{employee.role}</td>
                                <td className="text-sm sm:text-base">{employee.email}</td>
                                <td className="text-sm sm:text-base">
                                    <button
                                        onClick={() => handleEditEmployee(employee)}
                                        className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleRemoveEmployee(employee)}
                                        className="bg-red-500 text-white rounded px-2 py-1"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={toggleForm}
                className="bg-green-500 text-white rounded px-3 py-2 mt-5"
            >
                {showForm ? 'Cancel' : 'Add Employee'}
            </button>

            {showForm && (
                <form
                    ref={formRef}
                    onSubmit={handleAddOrUpdateEmployee}
                    className="bg-gray-100 rounded-lg shadow-md p-4 mt-5"
                >
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            defaultValue={currentEmployee.fName}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            defaultValue={currentEmployee.lName}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm">Role</label>
                        <input
                            type="text"
                            id="role"
                            defaultValue={currentEmployee.role}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            defaultValue={currentEmployee.email}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            defaultValue={currentEmployee.password}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-3 py-2"
                    >
                        {isEditing ? 'Update Employee' : 'Add Employee'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default EmployeeList;
