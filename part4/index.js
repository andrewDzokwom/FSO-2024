const {app} = require('./app')
const {PORT} = require('./utils/config')
console.log(PORT);

app.listen(PORT, ()=>{
  console.log(`Server running on address http://localhost:${PORT}`);
  
})
