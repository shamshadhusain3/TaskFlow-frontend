import React from 'react'
import Header from '../header/Header'
import Navbar from '../header/Navbar'
import HeroSection from './HeroSection'
import { MacbookScrollDemo } from './MacbookScrollDemo'
import Card from '../ui/Cards'

import Footer from '../Footer'

import About from '../About'

import ContactUs from '../ContactUs'



function LandingPage() {
  return (
    <div  >
  <Header navTitle="TaskFlow" />

        
{/* navbar */}
<Navbar/>
{/* Hero Section */}
<HeroSection/>

{/* MacbookScrollDemo */}
<div className="  ">

<MacbookScrollDemo/>

</div>
<div className="flex flex-col gap-6 md:flex-row md:flex-wrap justify-center items-center min-h-screen bg-gray-100 p-4">
<Card
 title="Beautiful Card"
 content="This is a beautiful card component created with React and Tailwind CSS. It has an image, title, content, and an optional footer."
 imageSrc="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
 footer={<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>}
/>
<Card
 title="Beautiful Card"
 content="This is a beautiful card component created with React and Tailwind CSS. It has an image, title, content, and an optional footer."
 imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
 footer={<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>}
/>
<Card
 title="Beautiful Card"
 content="This is a beautiful card component created with React and Tailwind CSS. It has an image, title, content, and an optional footer."
 imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
 footer={<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>}
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
   </div>
  )
}

export default LandingPage
