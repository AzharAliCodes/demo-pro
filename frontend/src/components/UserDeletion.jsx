import React, { useState } from 'react';
import API from '../api/api';

const UserDeletion = () => {
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSearchLoading(true);
    setErrors({});
    setUserInfo(null);
    setSuccess('');

    try {
      // First search for the user to confirm existence
      // You'll need to implement this search endpoint
      const response = await API.get(`/users/search?query=${encodeURIComponent(email)}`);
      const user = response.data;
      
      setUserInfo({
        name: user[0].name,
        email: user[0].email,
        profession: user[0].profession,
        phone_number: user[0].phone_number
      });
    } catch (error) {
      if (error.response?.status === 404) {
        setErrors({ search: 'User not found with this email address.' });
      } else {
        setErrors({ search: 'Error searching for user.' });
      }
    } finally {
      setSearchLoading(false);
    }
  };


  const handleDelete = async () => {
    setLoading(true);
    setErrors({});

    try {
      await API.delete('/user', { data: { email } });
      setSuccess('User deleted successfully!');
      setUserInfo(null);
      setEmail('');
      setShowConfirmation(false);
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else if (error.response?.status === 400) {
        setErrors({ submit: 'Invalid email address or user not found.' });
      } else if (error.response?.status === 403) {
        setErrors({ submit: 'You do not have permission to delete users.' });
      } else if (error.response?.status === 401) {
        setErrors({ submit: 'Please log in to perform this action.' });
      } else {
        setErrors({ submit: 'Internal server error' });
      }
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setUserInfo(null);
    setErrors({});
    setSuccess('');
    setShowConfirmation(false);
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#E0E0E0] mb-2">
            Delete User
          </h2>
          <p className="text-[#B0BEC5]">
            Permanently remove a user from the system
          </p>
        </div>


        {/* Search Section */}
        {!userInfo && (
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-[#E0E0E0] mb-4">
              Find User to Delete
            </h3>
            
            <form onSubmit={searchUser} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Enter User Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#90CAF9] focus:border-[#90CAF9] transition-colors text-[#E0E0E0] placeholder-gray-500"
                  placeholder="Enter user's email address"
                  required
                />
              </div>

              {errors.search && (
                <p className="text-sm text-red-400">{errors.search}</p>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={searchLoading || !email.trim()}
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

        {/* User Info & Deletion Section */}
        {userInfo && !showConfirmation && (
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[#E0E0E0]">
                  Confirm User Deletion
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

              {/* User Information Card */}
              <div className="bg-gray-700 rounded-lg p-6 mb-6 border border-gray-600">
                <h4 className="text-lg font-medium text-[#E0E0E0] mb-4">
                  User Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#B0BEC5]">Name</label>
                    <p className="text-[#E0E0E0]">{userInfo.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#B0BEC5]">Email</label>
                    <p className="text-[#E0E0E0]">{userInfo.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#B0BEC5]">Profession</label>
                    <p className="text-[#E0E0E0]">{userInfo.profession}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#B0BEC5]">Phone</label>
                    <p className="text-[#E0E0E0]">{userInfo.phone_number}</p>
                  </div>
                </div>
              </div>

              {/* Final Warning */}
              <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-200 font-medium">This action cannot be undone</span>
                </div>
                <p className="text-red-300 text-sm mt-2">
                  All user data, including their profile information and associated records, will be permanently deleted.
                </p>
              </div>

              <button
                onClick={openConfirmation}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Delete User Permanently
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-[#E0E0E0] mb-2">
                  Confirm Deletion
                </h3>
                
                <p className="text-[#B0BEC5] mb-6">
                  Are you sure you want to delete <strong className="text-[#E0E0E0]">{userInfo?.name}</strong> ({userInfo?.email})? This action cannot be undone.
                </p>

                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-[#E0E0E0] text-sm">
                    {errors.submit}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={closeConfirmation}
                    disabled={loading}
                    className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-500 text-[#E0E0E0] font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      'Delete Permanently'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDeletion;