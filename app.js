const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const QuestionRoutes = require('./routes/QuestionRoutes')
const ConfigRoutes = require('./routes/ConfigRoutes')
const server = express();


mongoose.connect(process.env.DB).then((res) => {
  console.log('connected', "DB Connected")
})

server.use(express.json())
server.use(express.static('public')) // Just for testing, use a static html

// Routes
server.use('/', [require('./routes/fileupload')])
server.use('/question', QuestionRoutes)
server.use('/config', ConfigRoutes)


// Start the server
server.listen(7000, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
})