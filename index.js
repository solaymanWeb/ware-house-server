const express = require('express');
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())

//user = db_user2
//pass = oqBJ7drJE3tXh14E







app.get('/',(req, res)=>{
    res.send('Hello server')
})

app.listen(port,()=>{
    console.log('listening port',port)
})