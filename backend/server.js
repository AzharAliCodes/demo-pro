const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const userRoutes = require('./src/routes/userRoutes')
const ticketRoutes = require('./src/routes/ticketRoutes')
const scanRoutes = require('./src/routes/scanRoutes')
const stallsRoutes = require('./src/routes/stallsRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use("/api", userRoutes)
app.use("/api", ticketRoutes)
app.use("/api", scanRoutes)
app.use("/api", stallsRoutes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})