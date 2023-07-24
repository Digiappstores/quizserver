const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const morgan = require("morgan");
const createError = require('http-errors');
// require('./helpers/init_mongodb')
// require('./helpers/init_redis')
require('dotenv').config()

const { verifyAccessToken } = require('./helpers/jwt_helper')
const QuestionRoutes = require('./routes/QuestionRoutes')
const ConfigRoutes = require('./routes/ConfigRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const QuizRoutes = require('./routes/QuizRoutes')

const server = express();
server.use(morgan('dev'));
server.use(express.json())
server.use(express.urlencoded({ extended: true })) // Just for testing, use a static html
server.use(express.static('public')) // Just for testing, use a static html
server.use(cors());

mongoose.connect(process.env.DB).then((res) => {
  console.log('connected', "DB Connected")
})

// Routes
server.use('/', [require('./routes/fileupload')])
server.use('/question', verifyAccessToken, QuestionRoutes)
server.use('/config', verifyAccessToken, ConfigRoutes)
server.use('/quiz', verifyAccessToken, QuizRoutes)
server.use('/user', AuthRoutes)

server.use(async (req, res, next) => {
  next(createError.NotFound())
})

server.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

// Start the server
server.listen(7000, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
})