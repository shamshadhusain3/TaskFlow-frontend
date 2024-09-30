// import React, { useState } from "react";
// import { useDrop, useDrag, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { StyleButton } from "../ui/miniComponents/button/StyleButton";

// // Define the type for draggable items
// const ItemType = "TASK";

// const Task = ({ task, index, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: task.id, index, status: task.status },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       className={`p-3 mb-4 bg-gray-100 rounded-lg shadow-sm ${
//         isDragging ? "opacity-50" : ""
//       }`}
//     >
//       <div className="flex justify-between">
//       <h4 className="font-semibold">{task.title}</h4>
//       <div className="flex flex-col">
//         <p className={`${isProfile?'hidden':''} text-sm text-gray-600`}>{task.assignedTo}</p>
//       <p className="text-sm text-gray-600">ID: {task.taskId}</p>
//       </div>
//       </div>
//       <p className="text-sm text-gray-600">{task.description}</p>
//         <div className="flex gap-2 my-2 float-end">
//       <p className="text-sm text-red-300 font-bold">{task.dueDate}</p>

//         </div>
//       <div className="flex justify-between w-full mt-6">
//         <button
//           onClick={() => onEdit(task.id, { ...task })}
//           className="text-blue-500 hover:text-blue-700"
//         >
//           Edit
//         </button>
        
//           {isProfile ? (<button
//           onClick={() => onDetail(task)}
//           className="text-red-500 hover:text-red-700"
//         >Details
//         </button>) : (<button
//           onClick={() => onDelete(task.id)}
//           className="text-red-500 hover:text-red-700"
//         >Delete
//         </button>)}
//       </div>
//     </div>
//   );
// };

// const Column = ({ columnId, column, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => {
//       if (item.status !== columnId) {
//         moveTask(item.id, columnId);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   });

//   return (
//     <div
//       ref={drop}
//       className={`bg-white rounded-lg shadow-md p-5 w-[260px] mx-2 ${
//         isOver ? "bg-gray-200" : ""
//       }`}
//     >
//       <h3 className="font-bold text-lg mb-4">{column.name}</h3>
//       {column.tasks && column.tasks.map((task, index) => (
//         <Task
//           key={task.id}
//           onDetail={onDetail}
//           isProfile={isProfile}
//           task={task}
//           index={index}
//           moveTask={moveTask}
//           onEdit={onEdit} // Pass the handleEdit function
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// const TaskList = ({ tasks, onEdit, onDelete,employees, isProfile, onDetail }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [editedTask, setEditedTask] = useState({});

//   const columns = {
//     Pending: {
//       name: "Pending",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Pending") : [],
//     },
//     "In Progress": {
//       name: "In Progress",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "In Progress") : [],
//     },
//     Completed: {
//       name: "Completed",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Completed") : [],
//     },
//   };

//   const moveTask = (taskId, targetColumnId) => {
//     if (!Array.isArray(tasks)) return;

//     const taskToMove = tasks.find((task) => task.id === taskId);

//     if (!taskToMove) return; // Task not found

//     // Call the onEdit function to update the task's status
//     onEdit(taskId, { ...taskToMove, status: targetColumnId });
//   };

//   const handleEdit = (taskId, taskData) => {
//     setCurrentTask(taskData);
//     setEditedTask(taskData); // Set initial values for editing
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     onEdit(currentTask.id, editedTask); // Update task with new values
//     setIsModalOpen(false); // Close modal
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="p-10">
//         <h2 className="text-2xl font-bold mb-5">Task Board</h2>
//         <div className="flex flex-wrap md:flex-row gap-3 w-full justify-center">
//           {Object.entries(columns).map(([columnId, column]) => (
//             <Column
//             onDetail={onDetail}
//               key={columnId}
//               isProfile={isProfile}
//               columnId={columnId}
//               column={column}
//               moveTask={moveTask}
//               onEdit={handleEdit} // Pass the handleEdit function
//               onDelete={onDelete}
//             />
//           ))}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg w-[400px]">
//               <h2 className="text-lg font-bold mb-4">{isProfile? 'Edit status' :'Edit Task'}</h2>
//               <div className={`mb-4 ${isProfile?'hidden':''}`}>
//                 <label className={`block text-sm font-medium   text-gray-700`}>Name</label>
//                 <input
//                   name="name"
//                   value={editedTask.title}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full"
//                   type="text"
//                 />
//               </div>
//               <div className="mb-5">
//                 <label className={`mb-4 ${isProfile?'hidden':''}`}>Assigned To</label>
//                 <select
//                     name="assignedTo"
//                     value={editedTask.assignedTo}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md"
                    
//                 >
//                     <option value="">Select Employee</option>
                  
//                     {Array.isArray(employees) && employees.length > 0 && 
//                         employees.map((employee) => (
//                             <option key={employee.id} value={`${employee.empId} ${employee.fName}`}>
//                                 {employee.fName} {employee.lName} - {employee.empId}
//                             </option>
//                         ))
//                     }
//                 </select>
//             </div>
//               <div  className={`mb-4 ${isProfile?'hidden':''}`}>
//                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   value={editedTask.description}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Status</label>
//                 <select
//                   name="status"
//                   value={editedTask.status}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>
//               <div className="mb-5">
//                 <label className={`mb-4 ${isProfile?'':'hidden'}`}>Comment</label>
//                 <textarea
//                     name="comment"
//                     value={editedTask.comment}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//             </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                   onClick={handleUpdate}
//                 >
//                   Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default TaskList;




// import React, { useState } from "react";
// import { useDrop, useDrag, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { toast } from "react-toastify"; // For notification on updates

// // Define the type for draggable items
// const ItemType = "TASK";

// const Task = ({ task, index, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: task.id, index, status: task.status },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       className={`p-3 mb-4 bg-gray-100 rounded-lg shadow-sm ${
//         isDragging ? "opacity-50" : ""
//       }`}
//     >
//       <div className="flex justify-between">
//         <h4 className="font-semibold">{task.title}</h4>
//         <div className="flex flex-col">
//           <p className={`${isProfile ? 'hidden' : ''} text-sm text-gray-600`}>
//             {task.assignedTo}
//           </p>
//           <p className="text-sm text-gray-600">ID: {task.taskId}</p>
//         </div>
//       </div>
//       <p className="text-sm text-gray-600">{task.description}</p>
//       <div className="flex gap-2 my-2 float-end">
//         <p className="text-sm text-red-300 font-bold">{task.dueDate}</p>
//       </div>
//       <div className="flex justify-between w-full mt-6">
//         <button
//           onClick={() => onEdit(task.id, { ...task })}
//           className="text-blue-500 hover:text-blue-700"
//         >
//           Edit
//         </button>

//         {isProfile ? (
//           <button
//             onClick={() => onDetail(task)}
//             className="text-red-500 hover:text-red-700"
//           >
//             Details
//           </button>
//         ) : (
//           <button
//             onClick={() => onDelete(task.id)}
//             className="text-red-500 hover:text-red-700"
//           >
//             Delete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const Column = ({ columnId, column, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => {
//       if (item.status !== columnId) {
//         moveTask(item.id, columnId);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   });

//   return (
//     <div
//       ref={drop}
//       className={`bg-white rounded-lg shadow-md p-5 w-[260px] mx-2 ${
//         isOver ? "bg-gray-200" : ""
//       }`}
//     >
//       <h3 className="font-bold text-lg mb-4">{column.name}</h3>
//       {column.tasks &&
//         column.tasks.map((task, index) => (
//           <Task
//             key={task.id}
//             onDetail={onDetail}
//             isProfile={isProfile}
//             task={task}
//             index={index}
//             moveTask={moveTask}
//             onEdit={onEdit} // Pass the handleEdit function
//             onDelete={onDelete}
//           />
//         ))}
//     </div>
//   );
// };

// const TaskList = ({ tasks, onEdit, onDelete, employees, isProfile, onDetail }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [editedTask, setEditedTask] = useState({});

//   const columns = {
//     Pending: {
//       name: "Pending",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Pending") : [],
//     },
//     "In Progress": {
//       name: "In Progress",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "In Progress") : [],
//     },
//     Completed: {
//       name: "Completed",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Completed") : [],
//     },
//   };

//   const moveTask = (taskId, targetColumnId) => {
//     if (!Array.isArray(tasks)) return;

//     const taskToMove = tasks.find((task) => task.id === taskId);

//     if (!taskToMove) return; // Task not found

//     // Call the onEdit function to update the task's status
//     onEdit(taskId, { ...taskToMove, status: targetColumnId });
//     toast.success(`Task moved to ${targetColumnId}!`);
//   };

//   const handleEdit = (taskId, taskData) => {
//     setCurrentTask(taskData);
//     setEditedTask(taskData); // Set initial values for editing
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     onEdit(currentTask.id, editedTask); // Update task with new values
//     setIsModalOpen(false); // Close modal
//     toast.success("Task updated successfully!");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="p-10">
//         <h2 className="text-2xl font-bold mb-5">Task Board</h2>
//         <div className="flex flex-wrap md:flex-row gap-3 w-full justify-center">
//           {Object.entries(columns).map(([columnId, column]) => (
//             <Column
//               key={columnId}
//               onDetail={onDetail}
//               isProfile={isProfile}
//               columnId={columnId}
//               column={column}
//               moveTask={moveTask}
//               onEdit={handleEdit} // Pass the handleEdit function
//               onDelete={onDelete}
//             />
//           ))}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg w-[400px]">
//               <h2 className="text-lg font-bold mb-4">
//                 {isProfile ? "Edit status" : "Edit Task"}
//               </h2>
//               <div className={`mb-4 ${isProfile ? "hidden" : ""}`}>
//                 <label className="block text-sm font-medium text-gray-700">Title</label>
//                 <input
//                   name="title"
//                   value={editedTask.title}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full"
//                   type="text"
//                 />
//               </div>
//               <div className="mb-5">
//                 <label className={`mb-4 ${isProfile ? "hidden" : ""}`}>Assigned To</label>
//                 <select
//                   name="assignedTo"
//                   value={editedTask.assignedTo}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="">Select Employee</option>
//                   {Array.isArray(employees) &&
//                     employees.map((employee) => (
//                       <option key={employee.id} value={`${employee.empId} ${employee.fName}`}>
//                         {employee.fName} {employee.lName} - {employee.empId}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               <div className={`mb-4 ${isProfile ? "hidden" : ""}`}>
//                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   value={editedTask.description}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Status</label>
//                 <select
//                   name="status"
//                   value={editedTask.status}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>
//               <div className="mb-5">
//                 <label className="block text-sm font-medium text-gray-700">Priority</label>
//                 <select
//                   name="priority"
//                   value={editedTask.priority}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="Low">Low</option>
//                   <option value="Medium">Medium</option>
//                   <option value="High">High</option>
//                 </select>
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={handleUpdate}
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Update Task
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default TaskList;








// import React, { useState, useEffect } from "react";
// import { useDrop, useDrag, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { gsap } from "gsap";
// import { toast } from "react-toastify";

// const ItemType = "TASK";

// const priorityStyles = {
//   High: "bg-red-300",
//   Medium: "bg-yellow-300",
//   Low: "bg-green-300",
// };

// const Task = ({ task, index, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: task.id, index, status: task.status },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   useEffect(() => {
//     gsap.fromTo(
//       `.task-${task.id}`,
//       { opacity: 0, y: -20 },
//       { opacity: 1, y: 0, duration: 0.5 }
//     );
//   }, [task.id]);

//   return (
//     <div
//       ref={drag}
//       className={`task-${task.id} p-3 mb-4 rounded-lg shadow-sm transition-transform duration-200 ${isDragging ? "opacity-50" : ""} ${priorityStyles[task.priority]}`}
//     >
//       <div className="flex justify-between">
//         <h4 className="font-semibold">{task.title}</h4>
//         <div className="flex flex-col">
//           <p className={`${isProfile ? 'hidden' : ''} text-sm text-gray-600`}>
//             {task.assignedTo}
//           </p>
//           <p className="text-sm text-gray-600">ID: {task.taskId}</p>
//         </div>
//       </div>
//       <p className="text-sm text-gray-600">{task.description}</p>
//       <div className="flex gap-2 my-2 float-end">
//         <p className="text-sm text-red-300 font-bold">{task.dueDate}</p>
//       </div>
//       <div className="flex justify-between w-full mt-6">
//         <button
//           onClick={() => onEdit(task.id, { ...task })}
//           className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
//         >
//           Edit
//         </button>

//         {isProfile ? (
//           <button
//             onClick={() => onDetail(task)}
//             className="text-red-500 hover:text-red-700 transition-colors duration-200"
//           >
//             Details
//           </button>
//         ) : (
//           <button
//             onClick={() => onDelete(task.id)}
//             className="text-red-500 hover:text-red-700 transition-colors duration-200"
//           >
//             Delete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const Column = ({ columnId, column, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: ItemType,
//     drop: (item) => {
//       if (item.status !== columnId) {
//         moveTask(item.id, columnId);
//         toast.success(`Task moved to ${column.name}`);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   });

//   return (
//     <div
//       ref={drop}
//       className={`bg-white rounded-lg shadow-md p-5 w-full max-w-xs mx-2 transition-colors duration-200 ${isOver ? "bg-gray-200" : "bg-white"}`}
//     >
//       <h3 className="font-bold text-lg mb-4">{column.name}</h3>
//       {column.tasks && column.tasks.map((task, index) => (
//         <Task
//           key={task.id}
//           onDetail={onDetail}
//           isProfile={isProfile}
//           task={task}
//           index={index}
//           moveTask={moveTask}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// const TaskList = ({ tasks, onEdit, onDelete, employees, isProfile, onDetail }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [editedTask, setEditedTask] = useState({});

//   const columns = {
//     Pending: {
//       name: "Pending",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Pending") : [],
//     },
//     "In Progress": {
//       name: "In Progress",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "In Progress") : [],
//     },
//     Completed: {
//       name: "Completed",
//       tasks: Array.isArray(tasks) ? tasks.filter((task) => task.status === "Completed") : [],
//     },
//   };

//   const moveTask = (taskId, targetColumnId) => {
//     if (!Array.isArray(tasks)) return;

//     const taskToMove = tasks.find((task) => task.id === taskId);

//     if (!taskToMove) return;

//     onEdit(taskId, { ...taskToMove, status: targetColumnId });
//   };

//   const handleEdit = (taskId, taskData) => {
//     setCurrentTask(taskData);
//     setEditedTask(taskData);
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedTask((prevTask) => ({
//       ...prevTask,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     onEdit(currentTask.id, editedTask);
//     setIsModalOpen(false);
//     toast.success("Task updated successfully!");
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="p-10 bg-gray-50 min-h-screen">
//         <h2 className="text-2xl font-bold mb-5 text-center">Task Board</h2>
//         <div className="flex flex-wrap md:flex-row gap-3 w-full justify-center">
//           {Object.entries(columns).map(([columnId, column]) => (
//             <Column
//               onDetail={onDetail}
//               key={columnId}
//               isProfile={isProfile}
//               columnId={columnId}
//               column={column}
//               moveTask={moveTask}
//               onEdit={handleEdit}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>

//         {/* Enhanced Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg animate__animated animate__zoomIn">
//               <h2 className="text-lg font-bold mb-4 text-center">Edit Task</h2>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   name="title"
//                   value={editedTask.title}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   type="text"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Assigned To</label>
//                 <select
//                   name="assignedTo"
//                   value={editedTask.assignedTo}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Employee</option>
//                   {Array.isArray(employees) && employees.length > 0 && 
//                     employees.map((employee) => (
//                       <option key={employee.id} value={`${employee.empId} ${employee.fName}`}>
//                         {employee.fName} {employee.lName} - {employee.empId}
//                       </option>
//                     ))
//                   }
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   value={editedTask.description}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Priority</label>
//                 <select
//                   name="priority"
//                   value={editedTask.priority}
//                   onChange={handleInputChange}
//                   className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={handleUpdate}
//                   className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default TaskList;









// added with priorityt


import React, { useState, useEffect } from "react";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { gsap } from "gsap";
import { toast } from "react-toastify";
import { FaExclamationTriangle, FaCheckCircle, FaHourglassHalf } from "react-icons/fa"; // Import icons for priority

const ItemType = "TASK";

// Status styles
const statusStyles = {
  Pending: "bg-blue-200",
  "In Progress": "bg-yellow-200",
  Completed: "bg-green-200",
};

// Priority indicators
const priorityIcons = {
  High: <FaExclamationTriangle className="text-red-500" />,
  Medium: <FaHourglassHalf className="text-yellow-500" />,
  Low: <FaCheckCircle className="text-green-500" />,
};

const Task = ({ task, index, moveTask, onEdit, onDelete, isProfile, onDetail }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id, index, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    gsap.fromTo(
      `.task-${task.id}`,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [task.id]);

  return (
    <div
      ref={drag}
      className={`task-${task.id} p-3 mb-4 rounded-lg shadow-md transition-transform duration-200 ${isDragging ? "opacity-50" : ""} ${statusStyles[task.status]}`}
    >
      <div className="flex justify-between">
        <h4 className="font-semibold">{task.title}</h4>
        <div className="flex flex-col">
          <p className={`${isProfile ? 'hidden' : ''} text-sm text-gray-600`}>
            {task.assignedTo}
          </p>
          <p className="text-sm text-gray-600">ID: {task.taskId}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex gap-2 my-2 float-end">
        <p className="text-sm text-red-300 font-bold">{task.dueDate}</p>
      </div>
      <div className="flex justify-between w-full mt-6">
        {/* Displaying the priority icon */}
        <span className="flex items-center text-sm">
          {priorityIcons[task.priority]} <span className="ml-1">{task.priority}</span>
        </span>
        <button
          onClick={() => onEdit(task.id, { ...task })}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          Edit
        </button>
        {isProfile ? (
          <button
            onClick={() => onDetail(task)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            Details
          </button>
        ) : (
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            Delete
          </button>
        )}
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
        toast.success(`Task moved to ${column.name}`);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-white rounded-lg shadow-md p-5 w-full max-w-xs mx-2 transition-colors duration-200 ${isOver ? "bg-gray-200" : "bg-white"}`}
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
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const TaskList = ({ tasks, onEdit, onDelete, employees, isProfile, onDetail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});

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

    if (!taskToMove) return;

    onEdit(taskId, { ...taskToMove, status: targetColumnId });
  };

  const handleEdit = (taskId, taskData) => {
    setCurrentTask(taskData);
    setEditedTask(taskData);
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
    onEdit(currentTask.id, editedTask);
    setIsModalOpen(false);
    toast.success("Task updated successfully!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-10 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-5 text-center">Task Board</h2>
        <div className="flex flex-wrap md:flex-row gap-3 w-full justify-center">
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              onDetail={onDetail}
              key={columnId}
              isProfile={isProfile}
              columnId={columnId}
              column={column}
              moveTask={moveTask}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Enhanced Modal */}
      

         {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="relative bg-gradient-to-r from-blue-100 to-white rounded-2xl shadow-xl p-8 w-[450px] transition-transform transform hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeInDown">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-2 border-b pb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{isProfile ? 'Edit Status' : 'Edit Task'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-red-500 hover:text-red-700 transition-colors">
                ✖
              </button>
            </div>
        
            {/* Task Name */}
            <div className={`mb-2 ${isProfile ? 'hidden' : ''}`}>
              <label className="block text-sm text-gray-700 mb-2">Task Name</label>
              <input
                name="name"
                value={editedTask.title}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-sm"
                placeholder="Enter task name"
              />
            </div>
        
            {/* Assigned To */}
            <div className={`mb-2 ${isProfile ? 'hidden' : ''}`}>
              <label className="block text-sm text-gray-700 mb-2">Assigned To</label>
              <select
                name="assignedTo"
                value={editedTask.assignedTo}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-sm"
              >
                <option value="">Select Employee</option>
                {Array.isArray(employees) && employees.length > 0 &&
                  employees.map((employee) => (
                    <option key={employee.id} value={`${employee.empId} ${employee.fName}`}>
                      {employee.fName} {employee.lName} - {employee.empId}
                    </option>
                  ))
                }
              </select>
            </div>
        
            {/* Description */}
            <div className={`mb-2 ${isProfile ? 'hidden' : ''}`}>
              <label className="block text-sm text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-sm"
                placeholder="Enter task description"
              />
            </div>
        
            {/* Status */}
            <div className="mb-2">
              <label className="block text-sm text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={editedTask.status}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-sm"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
        
            <div  className={`mb-4 ${isProfile ? 'hidden' : ''}`}>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              <div className={`mb-4 ${isProfile?'':'hidden'}`}>
                  <label className="block text-sm text-gray-700 mb-2">Comment</label>
                  <textarea
                      name="comment"
                      value={editedTask.comment}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                  />
              </div>
              
              <div  className={`mb-4 ${isProfile ? 'hidden' : ''}`}>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all duration-200"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
        
            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
        
            {/* Footer */}
            <div className="mt-4 text-center text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
            
          </div>
        </div>
        
        )}
      </div>
    </DndProvider>
  );
};

export default TaskList;
