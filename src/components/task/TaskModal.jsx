import React, { useEffect, useRef } from 'react';
import { StyleButton } from '../ui/miniComponents/button/StyleButton';
import { gsap } from 'gsap';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const TaskModal = ({ isOpen, onClose, task }) => {
    const modalRef = useRef();

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, y: 50, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const priorityStyles = {
        High: {
            color: 'text-red-600',
            borderColor: 'border-red-600',
            icon: <FaExclamationCircle className="mr-1 text-red-600" />,
            bgColor: 'bg-red-100',
        },
        Medium: {
            color: 'text-yellow-600',
            borderColor: 'border-yellow-600',
            icon: <FaExclamationCircle className="mr-1 text-yellow-600" />,
            bgColor: 'bg-yellow-100',
        },
        Low: {
            color: 'text-green-600',
            borderColor: 'border-green-600',
            icon: <FaCheckCircle className="mr-1 text-green-600" />,
            bgColor: 'bg-green-100',
        },
    };

    const statusStyles = {
        Completed: {
            bgColor: 'bg-green-500',
            textColor: 'text-white',
        },
        'In Progress': {
            bgColor: 'bg-blue-500',
            textColor: 'text-white',
        },
        Pending: {
            bgColor: 'bg-yellow-500',
            textColor: 'text-white',
        },
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-[90vw] md:w-[80vw] lg:w-[50vw] max-w-lg transform transition-all"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Task Details</h2>
                    <button
                        className="text-gray-400 hover:text-gray-600 transition transform hover:scale-110"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Task Number</p>
                        <p className="text-gray-900">{task.id}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Description</p>
                        <p className="text-gray-900">{task.description}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Assigned On</p>
                        <p className="text-gray-900">{task.startDate}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Due Date</p>
                        <p className="text-gray-900">{task.endDate}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Remark</p>
                        <p className="text-gray-900">{task.comment}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-600">Status</p>
                        <span
                            className={`inline-block py-1 px-2 rounded-full ${statusStyles[task.status].bgColor} ${statusStyles[task.status].textColor}`}
                        >
                            {task.status}
                        </span>
                    </div>
                    <div className={`flex justify-between items-center border-l-4 p-3 ${priorityStyles[task.priority].borderColor} rounded-lg transition-all`}>
                        <p className={`font-medium ${priorityStyles[task.priority].color}`}>
                            Priority
                        </p>
                        <div className={`flex items-center px-2 py-1 rounded-full ${priorityStyles[task.priority].bgColor}`}>
                            {priorityStyles[task.priority].icon}
                            <span className={`${priorityStyles[task.priority].color} font-semibold`}>
                                {task.priority}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <StyleButton
                        bg="bg-gradient-to-r from-purple-500 to-blue-500"
                        text="Close"
                        hover="hover:bg-gradient-to-r from-blue-500 to-purple-500"
                        border="border-none"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
