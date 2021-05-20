const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')

const server = express();
const port = 3001 || process.env.PORT

server.use(bodyParser.json())
server.use(cors());

const posts = {};

server.get('/posts',(req,res)=>{
    res.status(200).send(posts)

});


server.post('/posts',async (req,res)=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body;
    posts[id] = {
        id,
        title
    };

    await axios.post('http://localhost:3005/events',{
        type:"PostCreated",
        data: {
            id,
            title
        }
    }).catch(e=>console.log(e))

    res.status(201).send(posts[id])
})

//Events
server.post("/events",(req,res)=>{
    console.log("received event", req.body.type)
    res.status(200).send({})
})


server.listen(port,()=>{
    console.log("Server is up and running on port " + port)
})
