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

const updateUser = async ({ id, name, phone_number, email, profession }) => {
  const result = await pool.query(
    `UPDATE users
     SET 
       name = COALESCE($1, name),
       phone_number = COALESCE($2, phone_number),
       email = COALESCE($3, email),
       profession = COALESCE($4, profession)
     WHERE id = $5
     RETURNING *`,
    [name, phone_number, email, profession, id]
  );

  return result.rows[0];
};

const deleteUserByEmail = async (email) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE email = $1
     RETURNING *`,
    [email]
  );

  return result.rows[0];
};


module.exports = {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUserByEmail,
}