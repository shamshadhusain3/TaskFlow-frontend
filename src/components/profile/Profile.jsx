import React, { useEffect } from 'react'
import Navbar from '../header/Navbar'
import Header from '../header/Header'
import { StyleButton } from '../ui/miniComponents/button/StyleButton'

import Task from '../task/Task'
import UpcomingEvents from './UpcomingEvents'
import ProfileDetail from './ProfileDetail'
import Goals from './Goals'

import Team from './Team'
import useApiService from '../../services/UseApiService'


function Profile() {
  const [content, setContent] = React.useState('Task');


const showContent={
  Task:'Task',
  Profile:'Profile',
  Goals:'Goals',
  Team:'Team',
}

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
  // getEmployees("http://localhost:8080/api/v1/employees");
  getTasks("http://localhost:8080/api/v1/tasks");
}, []);

// Task CRUD Operations
// const createTask = (taskData) => {
//   createTask1("http://localhost:8080/api/v1/tasks", taskData)
//     .then(() => {
//       getTasks("http://localhost:8080/api/v1/tasks"); // Refetch tasks after creation
//     })
//     .catch((err) => console.error("Error creating task:", err));
// };

const updateTask = (id, taskData) => {
  updateTask1("http://localhost:8080/api/v1/tasks", id, taskData)
    .then(() => {
      getTasks("http://localhost:8080/api/v1/tasks"); // Refetch tasks after update
    })
    .catch((err) => console.error("Error updating task:", err));
};

// const deleteTask = (id) => {
//   removeTask("http://localhost:8080/api/v1/tasks", id)
//     .then(() => {
//       getTasks("http://localhost:8080/api/v1/tasks"); // Refetch tasks after deletion
//     })
//     .catch((err) => console.error("Error deleting task:", err));
// };


  const handleProfile=() => {
    setContent('Profile')
    console.log('profile added to dashboard')
  }
  const handleTask=() => {
    setContent('Task')

    console.log('task added to dashboard')
  }
  const handleGoals=() => {
    setContent('Goals')

    console.log('goals added to dashboard')
  }
  const handleTeam=() => {
    setContent('Team')

    console.log('Team added to dashboard')
  }
  return (
    <div>
        <Header navTitle='Dashboard'/>
        <Navbar/>
        <div className="container">
            <div className="user-detail h-1/3 w-full p-10 flex flex-col gap-3 items-center justify-center mt-[2rem] border-b-2 border-blue-500">
                <div className="img">
                <img src="images/userImage.png" alt="userPhoto" />
                </div>
                <div className="userDetail flex flex-col justify-center items-center">
                  <h1 className='user-name font-bold text-xl '>Astha Sachan</h1>
                  <h1 className="user-id text-slate-600 font-semibold text-lg">U1234</h1>
                  </div>
            </div>
            <div className="buttonSection h-40 md:h-[20vh] w-full border-b-2 border-blue-400 btn-container flex justify-center items-center flex-wrap gap-x-4">
             
                
             <div className="flex gap-4 md:gap-4">
             <StyleButton
             onClick={handleProfile}
                bg='blue'
                 text="Profile"
                hover="blue"
                border="border-['#254898']"
                />
                <StyleButton
                onClick={handleTask}
                    bg='sky'
                 text="Tasks"
                hover="sky"
                border="border-['#186AB5']"
                />
             </div>
             <div className="flex gap-4 md:gap-4">
             <StyleButton
                onClick={handleGoals}

                bg='yellow'
                 text="Goals"
                hover="yellow"
                border="border-['#996F03']"
                />
                <StyleButton
                onClick={handleTeam}

                    bg='green'
                 text="My Team"
                hover="green"
                border="border-['#0DA882']"
                />
                
             </div>
                
              
            </div>
        </div>
       
       {
        showContent.Task===content && <Task tasks={tasks} updateTask={updateTask} />
       }
       {
        showContent.Profile===content && <ProfileDetail/>
       }
       {
        showContent.Goals===content && <Goals/>
       }
       {
        showContent.Team===content && <Team/>
       }

    </div>
  )
}

export default Profile