const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const QuestionRoutes = require('./routes/QuestionRoutes')
require('dotenv').config()

const server = express();



const db = "mongodb+srv://das:das@cluster0.c7cmfub.mongodb.net/questions?retryWrites=true&w=majority"

mongoose.connect(db).then((res) => {
  console.log('connected', "res")
})

// Ensure that S3 Bucket is properly loaded
console.log('S3 BUCKET', process.env.AWS_S3_BUCKET)

// Middleware Plugins
// server.use(bodyParser.json())
// server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.json())
server.use(express.static('public')) // Just for testing, use a static html

// Routes
server.use('/', [require('./routes/fileupload')])
server.use('/question', QuestionRoutes)


// Start the server
server.listen(7000, error => {
  if (error) console.error('Error starting', error)
  else console.log('Started at http://localhost:7000')
})