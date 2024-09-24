// Task.js
import React, { useState } from 'react';

import TaskModal from './TaskModal';
import RemarkModal from './RemarkModal';
import TaskList from './TaskList'

const Task = ({tasks, updateTask}) => {
  const [isProfile, setIsProfile] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);

  console.log(isProfile,'profile task')


  const handleShowDetails = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  };

  const handleShowRemarks = (task) => {
    setSelectedTask(task);
    setIsRemarkModalOpen(true);
  };

  const handleCloseRemarkModal = () => {
    setIsRemarkModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveRemark = (taskNo, newRemark) => {
    setTasks(tasks.map(task =>
      task.taskNo === taskNo ? { ...task, remarks: newRemark } : task
    ));

  };


  return (
    <div className="card-container flex flex-col justify-center items-center mt-12 gap-5 border-2 border-b-blue-500 mb-5 py-6">
      <TaskList tasks={tasks}  onEdit={updateTask}  isProfile={isProfile} onDetail={handleShowDetails} />
      {/* {tasks.map(task => (
        <TaskCard
          key={task.taskNo}
          task={task}
          onShowDetails={handleShowDetails}
          onShowRemarks={handleShowRemarks}
        />
      ))} */}
      {selectedTask && (
        <TaskModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          task={selectedTask}
        />
      )}
      {selectedTask && (
        <RemarkModal
          isOpen={isRemarkModalOpen}
          onClose={handleCloseRemarkModal}
          task={selectedTask}
          onSaveRemark={handleSaveRemark}
        />
      )}
    </div>
  );
};

export default Task;
