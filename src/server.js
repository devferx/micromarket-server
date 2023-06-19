const express = require('express')
const { port } = require('./config')

const { routerApi } = require('./routes')
const { connectDB } = require('./db/config')

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
routerApi(app)

// Db connection
connectDB()

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})
