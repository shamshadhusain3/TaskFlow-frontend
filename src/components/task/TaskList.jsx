import React, { useState } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StyleButton } from "../ui/miniComponents/button/StyleButton";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// Define the type for draggable items
const ItemType = "TASK";

const Task = ({ task, index, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 mb-4 bg-gray-100 rounded-lg shadow-sm ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4 className="font-semibold">{task.name}</h4>
      <div className="flex justify-between">
      <div className="flex gap-2 my-1">
      <p className="text-sm text-red-300 font-bold">{task.dueDate}</p>

        </div>
      <div className="flex flex-col">
      <p className="text-sm text-gray-600">ID: {task.id}</p>
        <p className="text-sm text-gray-600">{task.assignedTo}</p>
      </div>
      </div>
      {/* <p className="text-sm text-gray-600">{task.description}</p> */}
        
      <div className="flex justify-between w-full ">
        <button
          onClick={() => onEdit(task.id, { ...task })}
          className="text-blue-500 hover:text-blue-700"
        >
          {isProfile ? 'Edit status' : 'Details'}
        </button>
        
          {isProfile ? (<button
          onClick={() => onDetail(task)}
          className="text-red-500 hover:text-red-700"
        >Details
        </button>) : (<button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >Delete
        </button>)}
      </div>
    </div>
  );
};

const Column = ({ columnId, column, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      if (item.status !== columnId) {
        moveTask(item.id, columnId);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-white rounded-lg shadow-md p-5 w-[260px] mx-2 ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      <h3 className="font-bold text-lg mb-4">{column.name}</h3>
      {column.tasks && column.tasks.map((task, index) => (
        <Task
          key={task.id}
          onDetail={onDetail}
          isProfile={isProfile}
          task={task}
          index={index}
          moveTask={moveTask}
          onEdit={onEdit} // Pass the handleEdit function
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const TaskList = ({ tasks, onEdit, onDelete, isProfile, onDetail,employees,loading,error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  console.log(isProfile,'profile')

  const columns = {
    Pending: {
      name: "Pending",
      tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Pending") : [],
    },
    "In Progress": {
      name: "In Progress",
      tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "In Progress") : [],
    },
    Completed: {
      name: "Completed",
      tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Completed") : [],
    },
  };

  const moveTask = (taskId, targetColumnId) => {
    if (!Array.isArray(tasks)) return;

    const taskToMove = tasks.find((task) => task.id === taskId);

    if (!taskToMove) return; // Task not found

    // Call the onEdit function to update the task's status
    onEdit(taskId, { ...taskToMove, status: targetColumnId });
    toast.success('Task moved successfully'); // Show success toast
  };

  const handleEdit = (taskId, taskData) => {
    setCurrentTask(taskData);
    setEditedTask(taskData); // Set initial values for editing
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onEdit(currentTask.id, editedTask); // Update task with new values
    setIsModalOpen(false); // Close modal
    toast.success('Task updated successfully'); // Show success toast
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-5">Task Board</h2>
        <div className="flex flex-wrap md:flex-row gap-3 w-full justify-center">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
            onDetail={onDetail}
              key={columnId}
              isProfile={isProfile}
              columnId={columnId}
              column={column}
              moveTask={moveTask}
              onEdit={handleEdit} // Pass the handleEdit function
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h2 className="text-lg font-bold mb-4">{isProfile? 'Edit status' :'Edit Task'}</h2>
              <div className={`mb-4 ${isProfile?'hidden':''}`}>
                <label className={`block text-sm font-medium   text-gray-700`}>Name</label>
                <input
                  name="name"
                  value={editedTask.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                  type="text"
                />
              </div>
              <div  className={`mb-4 ${isProfile?'hidden':''}`}>
                <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                 <select
                    name="assignedTo"
                    value={editedTask.assignedTo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Employee</option>
                    {loading && <option value="">Loading...</option>}
                    {error && <option value="">Error...</option>}
                    {employees?.map((employee, index) => (
                        <option key={index} value={employee.firstName}>
                            {employee.firstName  } {employee.lastName}-{employee.id}
                        </option>
                    ))}
                </select>
              </div>
              <div  className={`mb-4 ${isProfile?'hidden':''}`}>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editedTask.status}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Done
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:green-blue-600"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TaskList;
