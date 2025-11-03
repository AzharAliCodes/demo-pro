import React, { useState, useEffect } from 'react';
import API from '../api/api';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');
    const response = await API.get('/atickets')
      setTickets(response.data.user);
      setTotalCost(response.data.totalCost);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError(err.response?.data?.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#90CAF9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#E0E0E0]">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#90CAF9]">Support Tickets</h1>
            <p className="text-[#B0BEC5] mt-2">Manage and view all support requests</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-[#FFB74D] text-[#121212] px-4 py-2 rounded hover:bg-[#FFA726] transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 mb-8 border border-[#B0BEC5]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-[#B0BEC5] text-sm">Total Tickets</p>
              <p className="text-3xl font-bold text-[#90CAF9] mt-2">{tickets.length}</p>
            </div>
            <div className="text-center">
              <p className="text-[#B0BEC5] text-sm">Total Cost</p>
              <p className="text-3xl font-bold text-[#FFB74D] mt-2">{totalCost}</p>
            </div>
            <div className="text-center">
              <p className="text-[#B0BEC5] text-sm">Cost per Ticket</p>
              <p className="text-3xl font-bold text-[#E0E0E0] mt-2">20</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-[#E0E0E0] p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="bg-[#1E1E1E] rounded-lg p-8 text-center border border-[#B0BEC5]">
            <p className="text-[#B0BEC5] text-lg">No tickets found for this user</p>
            <p className="text-[#90CAF9] mt-2">All support requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#1E1E1E] rounded-lg p-6 border border-[#B0BEC5] hover:border-[#90CAF9] transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#E0E0E0]">
                      {ticket.title || `Ticket #${ticket.id}`}
                    </h3>
                    <p className="text-[#B0BEC5] mt-1">
                      Created: {formatDate(ticket.created_at)}
                    </p>
                    <h3 className="text-xl font-semibold text-[#E0E0E0]">
                      {ticket.title || `${ticket.name}`}<br/>
                      {ticket.title || `${ticket.number}`}<br/>
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    {ticket.status && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.status === 'open' 
                          ? 'bg-green-900 text-green-300'
                          : ticket.status === 'in_progress'
                          ? 'bg-blue-900 text-blue-300'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    )}
                    {ticket.priority && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.priority === 'high'
                          ? 'bg-red-900 text-red-300'
                          : ticket.priority === 'medium'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-green-900 text-green-300'
                      }`}>
                        {ticket.priority}
                      </span>
                    )}
                  </div>
                </div>

                {ticket.description && (
                  <p className="text-[#E0E0E0] mb-4">{ticket.description}</p>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-[#B0BEC5]">
                  <div className="text-[#B0BEC5] text-sm">
                    Ticket ID: {ticket.id} • User ID: {ticket.user_id}
                  </div>
                  <div className="text-[#FFB74D] font-semibold">
                    20
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchTickets}
            className="bg-[#90CAF9] text-[#121212] px-6 py-3 rounded-lg hover:bg-[#64B5F6] transition-colors font-semibold"
          >
            Refresh Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;