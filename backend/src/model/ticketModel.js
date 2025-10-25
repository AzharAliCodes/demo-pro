const pool = require('../config/db')

const createTicket = async (name , number,user_id) => {
  try{
    const result = await pool.query(
      `INSERT INTO tickets (name, number,user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [name, number,user_id]
    )
    return result.rows[0]
  } catch (err) {
    console.error(err);
  }
}

const AddUrl = async (ticket_url, id) => {
  try{
    const result = await pool.query("UPDATE tickets SET ticket_url = $1 WHERE id = $2 RETURNING *", [
      ticket_url,
      id,
    ])
    return result.rows[0]
  }catch (err) {
    console.error(err);
  }
}

const viewTicket = async (user_id) => {
  try{
   const result = await pool.query("SELECT * FROM tickets WHERE user_id = $1",[user_id])  
   return result.rows
  }catch (err) {
    console.error(err);
  }
}

const viewAllTicket = async () => {
  try{
   const result = await pool.query("SELECT * FROM tickets")  
   return result.rows
  }catch (err) {
    console.error(err);
  }
}
module.exports = {
  createTicket,
  AddUrl,
  viewTicket,
  viewAllTicket
}