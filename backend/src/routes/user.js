const express = require('express')
const pool = require('../config/db')
const router = express.Router();

router.post('/user',async (req, res) => {
  try{
    const {name, password, phone_number, email, profession} = req.body;

    if (!name || !password || !phone_number || !email || !profession){
      return res.status(400).json({error: "All fields are required"})
    }
   const result = await pool.query(
    `INSERT INTO users (name, password, phone_number, email, profession)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [name, password, phone_number, email, profession]
   )
   res.status(201).json({
    message: "User Created successfully",
    user: result.rows[0],
   }) 
  } catch (err){
    if (err.code === "23505"){
      res.status(400).json({error:"Email already exists"})
    } else{
      res.status(500).json({error:"Internal server error idar"})
    }
  }
})

module.exports = router;
