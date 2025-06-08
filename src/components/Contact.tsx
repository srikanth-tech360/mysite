import React, { useState, useEffect, useRef } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { Send, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    message: ''
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm } = 
    useFormValidation(initialValues, validateForm, submitForm);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  function validateForm(values: typeof initialValues) {
    const errors: Partial<typeof initialValues> = {};
    
    // Name validation
    if (!values.name) {
      errors.name = 'Name is required';
    } else if (values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    // Phone validation (optional but validate if provided)
    if (values.phone && !/^\+965\s?\d{7,8}$/.test(values.phone)) {
      errors.phone = 'Phone should be in format: +965 XXXXXXX';
    }
    
    // LinkedIn validation (optional but validate if provided)
    if (values.linkedin && !/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/.test(values.linkedin)) {
      errors.linkedin = 'Please enter a valid LinkedIn URL';
    }
    
    // Message validation
    if (!values.message) {
      errors.message = 'Message is required';
    } else if (values.message.length < 20) {
      errors.message = 'Message must be at least 20 characters';
    }
    
    return errors;
  }

  async function submitForm(values: typeof initialValues) {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`Thanks for your message, ${values.name}! I'll get back to you soon.`);
    resetForm();
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 bg-light-grey opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-electric-blue">
          Get In Touch
        </h2>
        <p className="text-center text-lg mb-12 max-w-xl mx-auto">
          Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
        </p>
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-[#2A2A2A] rounded-lg shadow-xl p-8 md:p-10"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 bg-white text-dark-grey rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue ${
                  errors.name && touched.name ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.name && touched.name && (
                <div className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.name}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 bg-white text-dark-grey rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue ${
                  errors.email && touched.email ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.email && touched.email && (
                <div className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+965 XXXXXXX"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 bg-white text-dark-grey rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue ${
                  errors.phone && touched.phone ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.phone && touched.phone && (
                <div className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/username"
                value={values.linkedin}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 bg-white text-dark-grey rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue ${
                  errors.linkedin && touched.linkedin ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.linkedin && touched.linkedin && (
                <div className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.linkedin}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 bg-white text-dark-grey rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue ${
                  errors.message && touched.message ? 'border-2 border-red-500' : ''
                }`}
              ></textarea>
              {errors.message && touched.message && (
                <div className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.message}
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 bg-electric-blue text-white font-medium rounded-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:shadow-electric-blue/20 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;