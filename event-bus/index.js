const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const server = express();

server.use(bodyParser.json());


server.post('/events',(req,res)=>{
    const event = req.body;

    axios.post('http://localhost:3000/events',event).catch((e=>console.log(e)))
    axios.post('http://localhost:3001/events',event).catch((e=>console.log(e)))
    axios.post('http://localhost:3002/events',event).catch((e=>console.log(e)))

    res.send({status:'OK'})

})
