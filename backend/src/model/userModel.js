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

module.exports = {
  createUser,
}