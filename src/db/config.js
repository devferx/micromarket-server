const mongoose = require('mongoose')
const {databaseUrl} = require('../config')

async function connectDB () {
  try {
    await mongoose.connect(databaseUrl)
    console.log('Database online')
  } catch (error) {
    console.log(error)
    throw new Error('Error initializing database')
  }
}

module.exports = {
  connectDB
}
