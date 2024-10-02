import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { FaUser, FaEnvelope, FaPen, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(descriptionRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        'service_2d6ypxo',
        'template_8ws0b5e',
        formData,
        '4MxLrm5kexyfZYvat'
      );
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Animate success message
      gsap.to('.success-message', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      
      setTimeout(() => {
        gsap.to('.success-message', {
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }, 3000);
      toast.success('Your message has been sent successfully. Thank you for contacting us!');
      
    } catch (error) {
      console.error(error);
      setSubmitMessage('Failed to send message. Please try again.');
      
      // Animate error message
      gsap.to('.error-message', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      setTimeout(() => {
        gsap.to('.error-message', {
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }, 3000);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl">
      <h1 ref={titleRef} className="text-5xl font-bold text-center text-gray-900 mb-6">Get in Touch</h1>
      <p ref={descriptionRef} className="text-center text-gray-700 mb-8 text-lg">
        We're excited to hear from you! Whether you have a question, need advice, or just want to say hello.
      </p>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="peer pl-10 w-full px-4 py-2 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition duration-200"
              placeholder="Your Name"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer pl-10 w-full px-4 py-2 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition duration-200"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div className="relative">
          <FaPen className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="peer pl-10 w-full px-4 py-2 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition duration-200"
            placeholder="Subject"
          />
        </div>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full h-32 px-4 py-2 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition duration-200"
            placeholder="Your Message"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center bg-blue-500 text-white font-bold py-2 rounded transition duration-200 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          <FaPaperPlane className="mr-2" /> {/* Send icon */}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {submitMessage && (
        <div className={`mt-4 text-center ${submitMessage.includes('successfully') ? 'success-message text-green-600' : 'error-message text-red-600'}`}>
          {submitMessage}
        </div>
      )}
      <div className="pt-8 mt-8 border-t border-gray-200 text-center flex flex-col gap-3 items-center">
        <a className="text-indigo-500 my-4">logiclegion@gmail.com</a>
        <span className="inline-flex">
          <a href="#" className="text-gray-500">
            <FaFacebook className="w-5 h-5" />
          </a>
          <a href="#" className="ml-4 text-gray-500">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="ml-4 text-gray-500">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="ml-4 text-gray-500">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default ContactUs;
