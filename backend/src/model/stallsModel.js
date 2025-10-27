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

module.exports = {
  addStall,
  addWorker,
  stallCheck
}



