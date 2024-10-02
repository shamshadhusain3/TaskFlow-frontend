import React from 'react'
import Header from '../header/Header'
import Navbar from '../header/Navbar'
import HeroSection from './HeroSection'
import { MacbookScrollDemo } from './MacbookScrollDemo'
import { toast, ToastContainer } from 'react-toastify';

import Card from '../ui/Cards'

import Footer from '../Footer'

import About from '../About'

import ContactUs from '../ContactUs'



function LandingPage() {
  return (
    <div  >
  <Header navTitle="TaskFlow" />

<HeroSection/>


<div className="  ">

<MacbookScrollDemo/>

</div>

<div className="flex flex-col gap-6 md:flex-row md:flex-wrap justify-center items-center min-h-screen bg-gray-100 p-4">
  <Card
    title="Task Management"
    content="Assign tasks, set priorities, and track progress with real-time updates."
    imageSrc="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    footer={<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Explore Tasks</button>}
  />
  
  <Card
    title="Team Collaboration"
    content="Collaborate with teams and monitor progress efficiently."
    imageSrc="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    footer={<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Manage Teams</button>}
  />
  
  <Card
    title="Employee Management"
    content="Manage employee records and roles for seamless operations."
    imageSrc="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    footer={<button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">View Employees</button>}
  />
</div>


<div className="about">
    <About/>
</div>
<div className="contact">
<ContactUs />
</div>


{/* Footer */}
<Footer/>
<ToastContainer/>
   </div>
  )
}

export default LandingPage
