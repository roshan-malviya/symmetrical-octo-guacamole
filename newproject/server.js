const express = require("express")
// const a = require('./client/src/uploads')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({extended : false}))
app.use('/details',require('./routes/details'))

app.get("/",(req,res)=>{
    console.log("hello world");
})


const PORT = 5000;

app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))
