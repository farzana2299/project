//connect env file
require('dotenv').config()
//import express
const express=require('express')
//import cors
const cors=require('cors')
const router=require('./router/router')
require('./database/connections')
//server creation
const server=express()
//server use cors
server.use(cors()) //host cheyyanath kond frontend url kodkkilla
//convert json data from frontend to js
server.use(express.json())
// //call router file
server.use(router)
//set port
const PORT=4000||process.env.PORT 
//export upload folder to client
server.use('/uploads',express.static('./uploads'))

server.listen(PORT,()=>{
    console.log(`-------Server started at the port ${PORT}-------`);
})
