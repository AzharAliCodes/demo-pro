import React, { useState } from 'react';
import API from '../api/api';

const AddWorker = () => {
  const [formData, setFormData] = useState({
    stall_no: '',
    worker_name: '',
    worker_number: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const roles = [
    'owner',
    'worker'
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

    // Stall number validation
    if (!formData.stall_no.trim()) {
      newErrors.stall_no = 'Stall number is required';
    } else if (isNaN(formData.stall_no) || parseInt(formData.stall_no) <= 0) {
      newErrors.stall_no = 'Stall number must be a valid positive number';
    }

    // Worker name validation
    if (!formData.worker_name.trim()) {
      newErrors.worker_name = 'Worker name is required';
    } else if (formData.worker_name.trim().length < 2) {
      newErrors.worker_name = 'Worker name must be at least 2 characters long';
    }

    // Worker number validation
    if (!formData.worker_number.trim()) {
      newErrors.worker_number = 'Worker number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.worker_number)) {
      newErrors.worker_number = 'Worker number must be 10-15 digits';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Role is required';
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
      await API.post('/stalls', formData);
      setSuccess('Worker added successfully!');
      // Reset form
      setFormData({
        stall_no: '',
        worker_name: '',
        worker_number: '',
        role: ''
      });
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else if (error.response?.status === 400) {
        setErrors({ submit: 'Validation error. Please check your inputs.' });
      } else if (error.response?.status === 403) {
        setErrors({ submit: 'You do not have permission to add workers.' });
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
      stall_no: '',
      worker_name: '',
      worker_number: '',
      role: ''
    });
    setErrors({});
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#E0E0E0] mb-2">
            Add Worker to Stall
          </h2>
          <p className="text-[#B0BEC5]">
            Assign workers to stalls with their roles and contact information
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8">
            {success && (
              <div className="mb-6 p-4 bg-green-900 border border-green-700 rounded-lg text-[#E0E0E0]">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {success}
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-[#E0E0E0]">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errors.submit}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stall Number Field */}
              <div>
                <label htmlFor="stall_no" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Stall Number *
                </label>
                <input
                  type="number"
                  id="stall_no"
                  name="stall_no"
                  value={formData.stall_no}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                    errors.stall_no 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                  }`}
                  placeholder="Enter stall number"
                />
                {errors.stall_no && (
                  <p className="mt-1 text-sm text-red-400">{errors.stall_no}</p>
                )}
              </div>

              {/* Worker Name Field */}
              <div>
                <label htmlFor="worker_name" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Worker Name *
                </label>
                <input
                  type="text"
                  id="worker_name"
                  name="worker_name"
                  value={formData.worker_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                    errors.worker_name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                  }`}
                  placeholder="Enter worker's full name"
                />
                {errors.worker_name && (
                  <p className="mt-1 text-sm text-red-400">{errors.worker_name}</p>
                )}
              </div>

              {/* Worker Number Field */}
              <div>
                <label htmlFor="worker_number" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Worker Phone Number *
                </label>
                <input
                  type="tel"
                  id="worker_number"
                  name="worker_number"
                  value={formData.worker_number}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] placeholder-gray-500 ${
                    errors.worker_number 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                  }`}
                  placeholder="Enter worker's phone number (10-15 digits)"
                />
                {errors.worker_number && (
                  <p className="mt-1 text-sm text-red-400">{errors.worker_number}</p>
                )}
              </div>

              {/* Role Field */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#E0E0E0] ${
                    errors.role 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:ring-[#90CAF9] focus:border-[#90CAF9]'
                  }`}
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role} value={role} className="bg-gray-700">
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-400">{errors.role}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-[#E0E0E0] font-semibold rounded-lg transition-all duration-200"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-[#90CAF9] hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-gray-900 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-gray-900 rounded-full animate-spin mr-2"></div>
                      Adding Worker...
                    </div>
                  ) : (
                    'Add Worker'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-6 bg-gray-800 rounded-xl shadow-2xl p-6">
          <h3 className="text-lg font-semibold text-[#E0E0E0] mb-3">
            How it works
          </h3>
          <ul className="text-[#B0BEC5] space-y-2">
            <li className="flex items-start">
              <svg className="w-4 h-4 mr-2 mt-1 text-[#90CAF9] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>If the stall doesn't exist, it will be created automatically</span>
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 mr-2 mt-1 text-[#90CAF9] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Worker will be assigned to the specified stall with their role</span>
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 mr-2 mt-1 text-[#90CAF9] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Multiple workers can be added to the same stall</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddWorker;