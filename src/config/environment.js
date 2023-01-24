import * as dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 4500,
  DB_URI: process.env.DB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET
} 