import React, { useState } from 'react';
import API from '../api/api';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone_number: '',
    email: '',
    profession: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const professions = [
    'volunteer',
    'manager', 
    'organizer', 
    'admin'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length <= 3) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Phone validation
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must be 10-15 digits';
    }

    // Profession validation
    if (!formData.profession) {
      newErrors.profession = 'Profession is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await API.post('/user', formData);
      console.log(response);
      
      setSuccess('User created successfully!');
      // Reset form
      setFormData({
        name: '',
        password: '',
        phone_number: '',
        email: '',
        profession: ''
      });
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else if (error.response?.status === 400) {
        setErrors({ submit: 'Email already exists' });
      } else {
        setErrors({ submit: 'Internal server error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#E0E0E0] mb-2">
              Register New User
            </h2>
            <p className="text-[#B0BEC5]">
              Create a new user account with the form below
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-900 border border-green-700 rounded-lg text-[#E0E0E0]">
              {success}
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-[#E0E0E0]">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                }`}
                placeholder="Enter password (min 8 characters)"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                  errors.phone_number 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                }`}
                placeholder="Enter phone number (10-15 digits)"
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-400">{errors.phone_number}</p>
              )}
            </div>

            {/* Profession Field */}
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-200 mb-2">
                 Profession *
            </label>
            <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-gray-100
                  ${errors.profession 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-600 focus:ring-blue-400 focus:border-blue-400'
                  }`}
              >
                <option value="" disabled hidden>Select a profession</option>
                {professions.map(prof => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
              {errors.profession && (
                <p className="mt-1 text-sm text-red-400">{errors.profession}</p>
              )}
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#90CAF9] hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-900 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-gray-900 rounded-full animate-spin mr-2"></div>
                  Creating User...
                </div>
              ) : (
                'Create User'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;