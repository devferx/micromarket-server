require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL
}

module.exports = config
