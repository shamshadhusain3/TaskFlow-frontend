import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import TaskForm from "../task/TaskForm";
import TaskList from "../task/TaskList";
import EmployeeList from "./EmployeeList";
import EmployeeCard from "./EmployeeCard";
import useApiService from "../../services/UseApiService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleCalendarCard from "./GoogleCalendarCard ";


export const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("Task");

  // Use custom API service hook
  const { 
    data: employees = [],  // Initialize employees to an empty array
    get: getEmployees, 
    create: createEmployee1, 
    update: updateEmployee1, 
    remove: removeEmployee, 
    loading: loadingEmployees, 
    error: errorEmployees 
  } = useApiService();

  const { 
    data: tasks = [], // Initialize tasks to an empty array
    get: getTasks, 
    create: createTask1, 
    update: updateTask1, 
    remove: removeTask, 
    loading: loadingTasks, 
    error: errorTasks 
  } = useApiService();

  // Fetch employees and tasks on component mount
  useEffect(() => {
    getEmployees("http://localhost:8080/api/v1/employees");
    getTasks("http://localhost:8080/api/v1/tasks");
  }, []);

  // Task CRUD Operations
  const createTask = (taskData) => {
    createTask1("http://localhost:8080/api/v1/tasks", taskData)
    .then(() => {
      getTasks("http://localhost:8080/api/v1/tasks"); // Refetch tasks after creation
      toast.success('Task created');
      })
      .catch((err) => console.error("Error creating task:", err));
  };

  const updateTask = (id, taskData) => {
    updateTask1("http://localhost:8080/api/v1/tasks", id, taskData)
    
    .then(() => {
      getTasks("http://localhost:8080/api/v1/tasks"); // Refetch tasks after update
      toast.success('Task Updated');
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const deleteTask = (id) => {
    removeTask("http://localhost:8080/api/v1/tasks", id)
    
    .then(() => {
      getTasks("http://localhost:8080/api/v1/tasks"); // Refetch tasks after deletion
      toast.success('Task Deleted');
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Employee CRUD Operations
  const createEmployee = (employeeData) => {
    createEmployee1("http://localhost:8080/api/v1/employees", employeeData)
    
    .then(() => {
      getEmployees("http://localhost:8080/api/v1/employees"); // Refetch employees after creation
      toast.success('Employee added');
      })
      .catch((err) => console.error("Error creating employee:", err));
  };

  const updateEmployee = (id, employeeData) => {
    updateEmployee1("http://localhost:8080/api/v1/employees", id, employeeData)
    
    .then(() => {
      getEmployees("http://localhost:8080/api/v1/employees"); // Refetch employees after update
      toast.success('Employee updated');
      })
      .catch((err) => console.error("Error updating employee:", err));
  };

  const deleteEmployee = (id) => {
    removeEmployee("http://localhost:8080/api/v1/employees", id)
    
    .then(() => {
      getEmployees("http://localhost:8080/api/v1/employees"); // Refetch employees after deletion
      toast.success('Employee deleted');
      })
      .catch((err) => console.error("Error deleting employee:", err));
  };

  const totalTasks = Array.isArray(tasks) ? tasks.length : 0; // Safeguard against null
  const totalPendingTasks = Array.isArray(tasks) ? tasks.filter((task) => task.status === "Pending").length : 0;
  const totalCompletedTasks = Array.isArray(tasks) ? tasks.filter((task) => task.status === "Completed").length : 0;

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex w-full">
      <Sidebar setContent={setContent} />
      <div className="p-2 md:w-[70vw] md:absolute md:left-96 left-0">
        <Dashboard
          totalTasks={totalTasks}
          totalCompletedTasks={totalCompletedTasks}
          totalPendingTasks={totalPendingTasks}
          totalEmployee={Array.isArray(employees) ? employees.length : 0} // Safeguard against null
        />
        {content === "Task" && (
          <TaskList 
            employees={employees}
            loading={loadingTasks}
            error={errorTasks}
            tasks={tasks}  
            
            onEdit={updateTask} 
            onDelete={deleteTask} 
          />
        )}
         {content === "Task" && (
          <TaskForm 
            employees={employees} 
            loading={loadingTasks} 
            error={errorTasks} 
            onSubmit={createTask} 
          />
        )}
       { content === "Employee" && <div className="px-10 flex w-full gap-10 flex-wrap">
          <div className="h-[50vh] w-[380px] bg-gray-100 flex items-center justify-center flex-wrap gap-8 p-10 overflow-auto">
            {Array.isArray(employees) && employees.length > 0 ? (
              employees.map((employee, index) => (
                <EmployeeCard
                  key={index}
                  name={employee.firstName}
                  role={employee.role}
                  email={employee.email}
                  imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG-5Wi8qZXluHi11q-AHGh8riznXRoltGVYQ&s'}
                />
              ))
            ) : (
              <p>loading...</p>
            )}
          </div>
          <GoogleCalendarCard/>
        </div>}

        {content === "Employee" && (
          <EmployeeList
            employees={employees}
            onAdd={createEmployee}
            onRemove={deleteEmployee}
            onUpdate={updateEmployee}
            loading={loadingEmployees}
            error={errorEmployees}
            toggleForm={toggleForm}
            showForm={showForm}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
