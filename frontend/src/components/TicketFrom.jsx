import { useState, useEffect } from 'react';
import API from '../api/api'
import TicketPrinter from './TicketPrinter';

function TicketForm() {
  const userId = localStorage.getItem('user_id') 
  const userIdInt = parseInt(userId)
  const [members, setMembers] = useState([{ name: '', number: '', id: userIdInt }])
  const [message, setMessage] = useState('')
  const [ID, setID] = useState(0)
  const [people, setPeople] = useState(0)
  const [showTicketPrinter, setShowTicketPrinter] = useState(false)


  useEffect(() => {
    setPeople(members.length) 
  }, [members])

  useEffect(() =>{
    console.log(ID)
  }, [ID])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/tickets", { members })
      if (res.status !== 200) {       
        throw new Error('Failed to submit');
      }
      console.log(res.data.user[0].id);
      setID(res.data.user[0].id)
      
      setShowTicketPrinter(true)
      setMessage('Tickets submitted successfully!');


      setTimeout(() => {
      setShowTicketPrinter(false)
      setMembers([{ name: '', number: '', id: userIdInt }]);
    }, 3000);
    } catch (err) {
      setMessage('Error submitting tickets.');
      console.error(err);
      setShowTicketPrinter(false)
    }
  };

  const handleNumberChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedMembers = [...members];
      updatedMembers[index].number = value;
      setMembers(updatedMembers);
    }
  };

  const handleNameChange = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index].name = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    setMembers([...members, { name: '', number: '', id: userIdInt }]);
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers)
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-6 text-[#90CAF9] text-center">
            Support Login
          </h1>

          {members.map((member, index) => (
            <div key={index} className="mb-4 border-b border-[#B0BEC5] pb-4 relative">
              <label className="block mb-2 text-[#E0E0E0]">Name</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Enter name"
                className="w-full mb-2 px-4 py-2 rounded-lg bg-[#263238] border border-[#B0BEC5] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]"
                required
              />

              <label className="block mb-2 text-[#E0E0E0]">Number</label>
              <input
                type="text"
                value={member.number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                placeholder="Enter number"
                className="w-full px-4 py-2 rounded-lg bg-[#263238] border border-[#B0BEC5] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#90CAF9]"
                required
              />
              
              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="w-full mb-4 py-2 rounded-lg bg-[#4DB6AC] hover:bg-[#26A69A] text-[#121212] font-semibold transition"
          >
            Add Member
          </button>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#FFB74D] hover:bg-[#FFA726] text-[#121212] font-semibold transition"
          >
            Submit Tickets
          </button>

          {message && (
            <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
      {console.log(people) }
      {showTicketPrinter && <TicketPrinter tickets={{ ID, people }} />}
    </>
  )
}

export default TicketForm;