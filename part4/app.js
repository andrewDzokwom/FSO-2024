const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config  = require('./utils/config')
const Blog = require('./models/blog')

const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect(config.MONGODB_URI)
  .then(()=>{
    console.log('Connected successfully!');
    
  })
  .catch((error)=>{
    console.log(error.message);
    console.log('failed to connect!');
  })


app.get('/', (req, res)=>{
  res.json({
    message: "This is working!"
  })
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT || 3000


module.exports = {app}