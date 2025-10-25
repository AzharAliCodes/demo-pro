const pool = require('../config/db')

const createTicket = async (name , number,user_id) => {
    const result = await pool.query(
      `INSERT INTO tickets (name, number,user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [name, number,user_id]
    )
    return result.rows[0]
}


module.exports = {
  createTicket,
}