const { createUser, getUserByEmail, deleteUserByEmail,updateUser } = require("../model/userModel")
const generateToken = require('../utils/generateToken')
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

 const loginUser = async (req, res) => {
  
  try {
    const {email, password} = req.body;

    if (!email || !password){
      return res.status(400).json({error: "Email and password is required"})
    }
    const user = await getUserByEmail(email);
    if (!user){
      return res.status(400).json({error:"Invlaid email or password"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({error:"Invlaid email or password"})
    }
    
  const gtokenuser = {user_id: user.id, role: user.profession , email:email}

  const token = generateToken(gtokenuser)
  res.status(200).json({message:"Login successfully",token})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
 }

const getUser = async (req, res) => {
  try {
    const {email} = req.body;

    if (!email){
      return res.status(400).json({error: "Email is required"})
    }    
    const user = await getUserByEmail(email);
    if (!user){
      return res.status(400).json({error:"Invlaid email"})
    } else {
      return res.status(200).json(user)
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const updateUserById = async (req, res) =>{
  try{ 
    const {id, name,  phone_number, email, profession} = req.body;
    if (!name || !phone_number || !email || !profession){
      return res.status(400).json({error: "All fields are required"})
    }

    if(typeof name !== "string" || name.trim().length <= 3){
      return res.status(400).json({error:"Name must be at least 2 characters long"})
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if(!phoneRegex.test(phone_number)){
      return res.status(400).json({error:"phone number must be  10-15 digits"})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await updateUser({id, name,  phone_number, email, profession})
    res.status(201).json({
           message: "User Updated successfully",
           user,
       }) 
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const {email} = req.body;

    if (!email){
      return res.status(400).json({error: "Email is required"})
    }    
    const user = await getUserByEmail(email);
    if (!user){
      return res.status(400).json({error:"Invlaid email"})
    } 
    const dUser = deleteUserByEmail(email)
    res.status(200).json(dUser) 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  registerUser,
  loginUser,
  updateUserById,
  getUser,
  deleteUser
}