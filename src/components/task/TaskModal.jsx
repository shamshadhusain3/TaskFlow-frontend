// TaskModal.js
import React from 'react';
import { StyleButton } from '../ui/miniComponents/button/StyleButton';

const TaskModal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;
console.log(task)
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[90vw] md:w-[50vw] max-w-lg">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Task Details</h2>
        <p className="mb-2"><strong>Task Number:</strong> {task.id}</p>
        <p className="mb-2"><strong>Description:</strong> {task.description}</p>
        <p className="mb-2"><strong>Assigned On:</strong> {task.assignedDate}</p>
        <p className="mb-4"><strong>Submission Date:</strong> {task.dueDate}</p>
        <p className="mb-4"><strong>Remarks:</strong> {task.status}</p>
        <div className="flex justify-end">
          <StyleButton
            bg="bg-gradient-to-r from-[#284799] to-[#0899DE]"
            text="Close"
            hover="yellow"
            border="border-['#996F03']"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
