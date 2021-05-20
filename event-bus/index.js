const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const server = express();

server.use(bodyParser.json());


server.post('/events',(req,res)=>{
    const event = req.body;

    //Post service
    axios.post('http://localhost:3001/events',event).catch((e=>console.log(e)))
    //Comments Service
    axios.post('http://localhost:3002/events',event).catch((e=>console.log(e)))
    //Query Service
    axios.post('http://localhost:3003/events',event).catch((e=>console.log(e)))

    res.send({status:'OK'})

})

server.listen(3005,()=>{
    console.log("Up and running on 3005")
})
