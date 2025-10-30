const jwt = require("jsonwebtoken")
require('dotenv').config();


const generateToken = (user) =>{
    return jwt.sign(
        {user_id: user.user_id, role: user.role, email: user.email},
        process.env.JWT_SECRET
    )
}

module.exports = generateToken;