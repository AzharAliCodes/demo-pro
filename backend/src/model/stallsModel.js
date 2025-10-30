const pool = require('../config/db')

const stallCheck = async (stall_no) => {
const result = await pool.query("SELECT stall_no FROM stalls WHERE stall_no = $1",
      [stall_no])
      return result.rows[0]
}

const addStall = async (stall_no) => {
const result = await pool.query("INSERT INTO stalls (stall_no) VALUES ($1)", [stall_no]);
return result.rows[0]
}

const addWorker = async (stall_no, worker_name, worker_number, role) => {
const result = await pool.query(
      `INSERT INTO workers (stall_no, worker_name, worker_number, role)
       VALUES ($1, $2, $3, $4)`,
      [stall_no, worker_name, worker_number, role])
      return result.rows[0]
}


const searchByNumber = async (worker_number) =>{
const result = await pool.query("SELECT * FROM workers WHERE worker_number = $1",
      [worker_number])
      return result.rows[0]
}

const UpdateByNumber = async (stall_no, worker_name, worker_number,role,old_number) =>{
const result = await pool.query("UPDATE workers SET  stall_no = $1, worker_name = $2, worker_number = $3, role = $4 WHERE worker_number = $5; ",
      [stall_no, worker_name, worker_number,role,old_number])
      return result.rows[0]
}


module.exports = {
  addStall,
  addWorker,
  stallCheck,
  searchByNumber,
  UpdateByNumber
}


