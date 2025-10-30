const jwt = require("jsonwebtoken")

const generateToken = (user) =>{
    return jwt.sign(
        {user_id: user.user_id, role: user.role, email: user.email},
        process.env.JWT_SECERT
    )
}

module.exports = generateToken;