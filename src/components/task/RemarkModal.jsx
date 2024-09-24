// RemarkModal.js
import React, { useState } from 'react';
import { StyleButton } from '../ui/miniComponents/button/StyleButton';

const RemarkModal = ({ isOpen, onClose, task, onSaveRemark }) => {
  const [remark, setRemark] = useState(task.remarks || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveRemark(task.taskNo, remark);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[90vw] md:w-[50vw] max-w-lg">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Add Remark</h2>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter your remark here..."
        />
        <div className="flex justify-end gap-4">
          <StyleButton
            bg="bg-gradient-to-r from-[#284799] to-[#0899DE]"
            text="Save"
            hover="yellow"
            border="border-['#996F03']"
            onclick={handleSave}
          />
          <StyleButton
            bg="bg-gradient-to-r from-[#998C28] to-[#DEB308]"
            text="Cancel"
            hover="green"
            border="border-['#0DA882']"
            onclick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;
