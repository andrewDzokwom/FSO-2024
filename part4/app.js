const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config  = require('./utils/config')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)
mongoose.connect(config.MONGODB_URI)
  .then(()=>{
    console.log('Connected successfully!');
    
  })
  .catch((error)=>{
    console.log(error.message);
    console.log('failed to connect!');
  })


const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>{
  res.json({
    message: "This is working!"
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log(`Server running on address http://localhost:${PORT}`);
  
})