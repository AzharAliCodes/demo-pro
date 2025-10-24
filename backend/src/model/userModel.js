const pool = require('../config/db')

const createUser = async({name, password, phone_number, email, profession})=>{
   const result = await pool.query(
    `INSERT INTO users (name, password, phone_number, email, profession)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [name, password, phone_number, email, profession]
   )

    return result.rows[0]
}

const getUserByEmail = async (email) =>{
  try{
    const query = `SELECT * FROM users WHERE email = $1`
    const values = [email]
    
    const result = await pool.query(query, values)
    if (result.rows.length === 0){
      return null;
    }
    
    return result.rows[0]
  } catch (err){
    console.error("Error fetching user by email:",err)
    throw err
  }
}
module.exports = {
  createUser,
  getUserByEmail,
}