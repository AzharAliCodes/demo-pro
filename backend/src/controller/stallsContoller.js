const {addStall,stallCheck,addWorker,searchByNumber,UpdateByNumber} = require('../model/stallsModel')

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

const searchingUser = async (req,res) => {
  try{
    const {worker_number} = req.body
    const result = await searchByNumber(worker_number)
    if (!result){
      return res.status(404).json({ error: "User not found" })
    }
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Intenal Server error" });
  }
}

const upadteUser = async (req,res) => {
  try{
    const {old_number, stall_no, worker_name, worker_number,role} = req.body
    const result = await searchByNumber(old_number)
    if (!result){
      return res.status(404).json({ error: "User not found" })
    }

    const result2 = await UpdateByNumber(stall_no, worker_name, worker_number,role, old_number)
    res.status(200).json({result2})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Intenal Server error" });
  }
}


module.exports = {
  addingWorker,
  searchingUser,
  upadteUser
}


 