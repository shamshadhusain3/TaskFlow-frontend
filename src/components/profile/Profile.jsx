import React, { useEffect, useState, useContext } from 'react';
import Header from '../header/Header';
import { StyleButton } from '../ui/miniComponents/button/StyleButton';
import Task from '../task/Task';
import ProfileDetail from './ProfileDetail';
import { toast, ToastContainer } from 'react-toastify';
import Goals from './Goals';
import Team from './Team';
import { getAllTasks, getCurrentUser, updateTask } from '../../services/UseApiService';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const [content, setContent] = useState('Task');
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  
  const me = localStorage.getItem('user');
  const userme = JSON.parse(me);
  const assignedto = userme.empId + " " + userme.fName; // Combine empId and fName

  const showContent = {
    Task: 'Task',
    Profile: 'Profile',
    Goals: 'Goals',
    Team: 'Team',
  };

  // Fetch tasks and current user on mount
  useEffect(() => {
  
    const loadTasks = async () => {
      
     // Retrieve the current user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const data = await getAllTasks(); // Fetch all tasks from API
    
        setTasks(data); // Set the filtered tasks
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        
      }
  };
  loadTasks()

  }, [isAuthenticated]);

  // Task update operation
  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      const updatedTasks = await getAllTasks(); // Refetch tasks after update
      setTasks(updatedTasks);
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const filteredTasks = tasks.filter(task => task.assignedTo === assignedto);

  console.log('filteredTasks',filteredTasks)
  console.log('tasks',tasks)

 
  // Handlers for changing content
  const handleContentChange = (newContent) => {
    setContent(newContent);
    console.log(`${newContent} added to dashboard`);
  };

  return (
    <div>
      <Header navTitle="Dashboard" />
      <div className="container">
        <div className="user-detail h-1/3 w-full p-10 flex flex-col gap-3 items-center justify-center mt-[2rem] border-b-2 border-blue-500">
          <div className="img">
            <img src="images/userImage.png" alt="userPhoto" />
          </div>
          <div className="userDetail flex flex-col justify-center items-center">
            <h1 className="user-name font-bold text-xl">{userme?.fName} {userme?.lName}</h1>
            <h1 className="user-id text-slate-600 font-semibold text-lg">{userme?.email}</h1>
          </div>
        </div>
        <div className="buttonSection h-40 md:h-[20vh] w-full border-b-2 border-blue-400 btn-container flex justify-center items-center flex-wrap gap-x-4">
          <div className="flex gap-4 md:gap-4">
            <StyleButton
              onClick={() => handleContentChange('Profile')}
              bg="blue"
              text="Profile"
              hover="blue"
              border="border-['#254898']"
            />
            <StyleButton
              onClick={() => handleContentChange('Task')}
              bg="sky"
              text="Tasks"
              hover="sky"
              border="border-['#186AB5']"
            />
          </div>
          <div className="flex gap-4 md:gap-4">
            <StyleButton
              onClick={() => handleContentChange('Goals')}
              bg="yellow"
              text="Goals"
              hover="yellow"
              border="border-['#996F03']"
            />
            <StyleButton
              onClick={() => handleContentChange('Team')}
              bg="green"
              text="My Team"
              hover="green"
              border="border-['#0DA882']"
            />
          </div>
        </div>
      </div>

      {content === showContent.Task && <Task tasks={filteredTasks} updateTask={handleUpdateTask} />}
      {content === showContent.Profile && <ProfileDetail me={userme} />}
      {content === showContent.Goals && <Goals />}
      {content === showContent.Team && <Team />}
      <ToastContainer />
    </div>
  );
}

export default Profile;
