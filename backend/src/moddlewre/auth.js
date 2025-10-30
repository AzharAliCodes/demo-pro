const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader)
        return res.status(401).json({error: "No token provided"})

    const token = authHeader.split(" ")[1]
    if(!token)
        return res.status(401).json({error: "Invlid token format"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err){
        console.error("JWT verfiy error", err.message)
        return res.status(401).json({error: "Invalid token"})   
    }
}

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"]
        if (!authHeader)
           return res.status(401).json({error: "No token provided"})
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const issuedBy = decoded.role 
        if(!allowedRoles.includes(issuedBy)){
            return res.status(403).json({error: "Access denied"})
        }
        next()
    }
}
module.exports = {
    authenticate,
    authorize
}