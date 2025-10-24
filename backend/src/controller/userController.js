const { createUser } = require("../model/userModel")
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
  try{
    const {name, password, phone_number, email, profession} = req.body;

    if (!name || !password || !phone_number || !email || !profession){
      return res.status(400).json({error: "All fields are required"})
    }

    if(typeof name !== "string" || name.trim().length <= 3){
      return res.status(400).json({error:"Name must be at least 2 characters long"})
    }

    if(password.length < 8){
      return res.status(400).json({error:"Password must be atleast 8 character"})
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if(!phoneRegex.test(phone_number)){
      return res.status(400).json({error:"phone number must be  10-15 digits"})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await createUser({name, password: hashedPassword, phone_number, email, profession})
    res.status(201).json({
           message: "User Created successfully",
           user,
       }) 

  } catch (err){
    if (err.code === "23505"){
      res.status(400).json({error:"Email already exists"})
    } else{
      res.status(500).json({error:"Internal server error idar"})
    }
  }
}

module.exports = registerUser