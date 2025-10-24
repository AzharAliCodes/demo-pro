const { createUser } = require("../model/userModel")

const registerUser = async (req, res) => {
  try{
    const {name, password, phone_number, email, profession} = req.body;

    if (!name || !password || !phone_number || !email || !profession){
      return res.status(400).json({error: "All fields are required"})
    }
    const user = await createUser({name, password, phone_number, email, profession})
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