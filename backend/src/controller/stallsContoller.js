const {addStall,stallCheck,addWorker,ChekIdCard,addIdCard} = require('../model/stallsModel')

const addingWorker = async (req, res) => {
  try {
    const { stall_no, worker_name, worker_number, role } = req.body;

    if (!stall_no || !worker_name || !worker_number || !role) {
     return res.status(400).json({ error: "All fields are required" })
    }
    const stallChecking = await stallCheck(stall_no)

    if (!stallChecking) {
      const result = await addStall(stall_no)
    }
    const addMember = await addWorker(stall_no, worker_name, worker_number, role)
    res.status(200).json({ message: "Member added successfully" }, addMember);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Intenal Server error" });
  }
}


module.exports = {
  addingWorker
}


 