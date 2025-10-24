const express = require("express")
const dotenv = require("dotenv")
const userRoutes = require('./src/routes/userRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use("/api", userRoutes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})