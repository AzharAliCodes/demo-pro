const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader)
        return res.status(401).json({error: "No token provided"})

    const token = authHeader.split("")[1]
    if(!token)
        return res.status(401).json({error: "Invlid token format"})

}