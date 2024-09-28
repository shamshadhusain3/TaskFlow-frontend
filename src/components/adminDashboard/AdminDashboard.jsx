// 
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import TaskForm from "../task/TaskForm";
import TaskList from "../task/TaskList";
import EmployeeList from "./EmployeeList";
import EmployeeCard from "./EmployeeCard";
import { 
    getAllEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee, 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../../services/UseApiService"; // Import the API functions
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminDashboard = () => {

  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("Task");
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  // Fetch employees and tasks on component mount
  useEffect(() => {
    loadEmployees();
    loadTasks();
  }, []);

  const loadEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const data = await getAllEmployees();

      // Get the current user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userEmpId = storedUser?.empId + " " + storedUser?.fName; // Extract empId from the user

      // Filter employees where employee.suser === userEmpId
      const filteredEmployees = data.filter((employee) => employee.suser === userEmpId);

      setEmployees(filteredEmployees);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // const loadTasks = async () => {
  //   setLoadingTasks(true);
  //   try {
  //     const data = await getAllTasks();
      
  //     setTasks(data);
  //   } catch (err) {
  //     console.error("Error fetching tasks:", err);
  //   } finally {
  //     setLoadingTasks(false);
  //   }
  // };

  const loadTasks = async () => {
    setLoadingTasks(true);
    
    // Retrieve the current user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const assignedBy = user.empId + "" + user.fName; // Combine empId and fName

    try {
      const data = await getAllTasks(); // Fetch all tasks from API
      
      // Filter the tasks based on the assignedBy field
      const filteredTasks = data.filter(task => task.assignedBy === assignedBy);

      setTasks(data); // Set the filtered tasks
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
};


  // Task CRUD Operations
  const handleTaskCRUD = async (action, taskData, id) => {
    try {
      if (action === "create") {
        await createTask(taskData);
        toast.success('Task created');
      } else if (action === "update") {
        await updateTask(id, taskData);
        toast.success('Task Updated');
      } else if (action === "delete") {
        await deleteTask(id);
        toast.success('Task Deleted');
      }
      loadTasks(); // Refetch tasks after CRUD operations
    } catch (err) {
      console.error(`Error ${action} task:`, err);
    }
  };

  // Employee CRUD Operations
  const handleEmployeeCRUD = async (action, employeeData, id) => {
    try {
      if (action === "create") {
        await createEmployee(employeeData);
        toast.success('Employee added');
      } else if (action === "update") {
        await updateEmployee(id, employeeData);
        toast.success('Employee updated');
      } else if (action === "delete") {
        await deleteEmployee(id);
        toast.success('Employee deleted');
      }
      loadEmployees(); // Refetch employees after CRUD operations
    } catch (err) {
      console.error(`Error ${action} employee:`, err);
    }
  };

  const totalTasks = tasks.length; 
  const totalPendingTasks = tasks.filter(task => task.status === "Pending").length;
  const totalCompletedTasks = tasks.filter(task => task.status === "Completed").length;

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
          totalEmployee={employees.length} // Employee count
        />
        {content === "Task" && (
          <>
            <TaskList 
              employees={employees}
              loading={loadingTasks}
              tasks={tasks}  
              onEdit={(id, taskData) => handleTaskCRUD("update", taskData, id)} 
              onDelete={(id) => handleTaskCRUD("delete", null, id)} 
            />
            <TaskForm 
              employees={employees} 
              loading={loadingTasks} 
              onSubmit={(taskData) => handleTaskCRUD("create", taskData)} 
            />
          </>
        )}
        {content === "Employee" && (
          <div className="px-10 flex w-full gap-10 flex-wrap">
            <div className="h-[50vh] w-[380px] bg-gray-100 flex items-center justify-center flex-wrap gap-8 p-10 overflow-auto">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <EmployeeCard
                    key={index}
                    name={employee.fName}
                    role={employee.role}
                    email={employee.email}
                    imageUrl={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG-5Wi8qZXluHi11q-AHGh8riznXRoltGVYQ&s'}
                  />
                ))
              ) : (
                <p>No employees found.</p>
              )}
            </div>
          </div>
        )}
        {content === "Employee" && (
          <EmployeeList
            employees={employees}
            onAdd={(employeeData) => handleEmployeeCRUD("create", employeeData)}
            onRemove={(id) => handleEmployeeCRUD("delete", null, id)}
            onUpdate={(id, employeeData) => handleEmployeeCRUD("update", employeeData, id)}
            loading={loadingEmployees}
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
