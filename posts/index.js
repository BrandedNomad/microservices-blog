const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')

const server = express();
const port = 3001 || process.env.PORT

server.use(bodyParser.json())

const posts = {};

server.get('/posts',(req,res)=>{
    res.status(200).send(posts)

});


server.post('/posts',(req,res)=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body;
    posts[id] = {
        id,
        title
    };

    res.status(201).send(posts[id])
})


server.listen(port,()=>{
    console.log("Server is up and running on port " + port)
})
