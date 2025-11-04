import React, { useState, } from 'react';
import API from '../api/api';

const UserUpdate = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone_number: '',
    email: '',
    profession: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const professions = [
    'volunteer',
    'manager', 
    'organizer', 
    'admin'
  ];

  // Function to search for user by ID or email
  const searchUser = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    setErrors({});
    setUserFound(false);

    try {
      // This endpoint would need to be implemented in your backend
      const response = await API.get(`/users/search?query=${encodeURIComponent(searchQuery)}`);
      const user = response.data

      console.log(user[0].id);
      
      
      setFormData({
        id: user[0].id,
        name: user[0].name || '',
        phone_number: user[0].phone_number || '',
        email: user[0].email || '',
        profession: user[0].profession || ''
      });
      setUserFound(true);
      setSuccess('User found! You can now update their information.');
    } catch (error) {
      if (error.response?.status === 404) {
        setErrors({ search: 'User not found. Please check the ID or email.' });
      } else {
        setErrors({ search: 'Error searching for user.' });
      }
    } finally {
      setSearchLoading(false);
    }
  };

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

    // ID validation
    if (!formData.id) {
      newErrors.id = 'User ID is required';
    }

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
      await API.put('/user', formData);
      setSuccess('User updated successfully!');
      // Reset form after successful update
      setTimeout(() => {
        setFormData({
          id: '',
          name: '',
          phone_number: '',
          email: '',
          profession: ''
        });
        setUserFound(false);
        setSearchQuery('');
      }, 2000);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else if (error.response?.status === 400) {
        setErrors({ submit: 'Validation error. Please check your inputs.' });
      } else if (error.response?.status === 403) {
        setErrors({ submit: 'You do not have permission to update users.' });
      } else if (error.response?.status === 401) {
        setErrors({ submit: 'Please log in to perform this action.' });
      } else {
        setErrors({ submit: 'Internal server error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      phone_number: '',
      email: '',
      profession: ''
    });
    setUserFound(false);
    setSearchQuery('');
    setErrors({});
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#E0E0E0] mb-2">
            Update User
          </h2>
          <p className="text-[#B0BEC5]">
            Search for a user and update their information
          </p>
        </div>

        {/* Search Section */}
        {!userFound && (
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-[#E0E0E0] mb-4">
              Find User to Update
            </h3>
            
            <form onSubmit={searchUser} className="space-y-4">
              <div>
                <label htmlFor="searchQuery" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Search by User ID or Email *
                </label>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90CAF9] focus:border-[#90CAF9] transition-colors text-[#E0E0E0] placeholder-gray-500"
                  placeholder="Enter user ID or email address"
                  required
                />
              </div>

              {errors.search && (
                <p className="text-sm text-red-400">{errors.search}</p>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={searchLoading || !searchQuery.trim()}
                  className="flex-1 py-3 px-4 bg-[#90CAF9] hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-900 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {searchLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-gray-900 rounded-full animate-spin mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    'Search User'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Update Form Section */}
        {userFound && (
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#E0E0E0]">
                  Update User Information
                </h3>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-[#E0E0E0] rounded-lg transition-colors"
                >
                  Search Different User
                </button>
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
                {/* User ID Field (read-only) */}
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                    User ID *
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-[#E0E0E0] cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-[#B0BEC5]">
                    User ID cannot be changed
                  </p>
                </div>

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
                  <label htmlFor="profession" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                    Profession *
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] ${
                      errors.profession 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                    }`}
                  >
                    <option value="">Select a profession</option>
                    {professions.map(prof => (
                      <option key={prof} value={prof} className="bg-gray-700">
                        {prof}
                      </option>
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
                      Updating User...
                    </div>
                  ) : (
                    'Update User'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUpdate;