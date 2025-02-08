const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>{
  res.send('This is to  prove  that the server is communicating with the backend')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log(`Server running on address http://locashost:${PORT}`);
  
})