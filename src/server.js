const express = require('express')
const { port } = require('./config')

const { routerApi } = require('./routes')
const { connectDB } = require('./db/config')
const { boomErrorHandler, errorHandler } = require('./middlewares/error.handler')

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
routerApi(app)

// Error handlers
app.use(boomErrorHandler)
app.use(errorHandler)

// Db connection
connectDB()

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})
