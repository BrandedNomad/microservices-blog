const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios');

const server = express();
const port = 3002 || process.env.PORT

server.use(bodyParser.json())
server.use(cors())

const commentsByPostId = {};

server.get('/posts/:id/comments',(req,res)=>{
    res.status(200).send(commentsByPostId[req.params.id || []])

});


server.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id:commentId, content});
    commentsByPostId[req.params.id]= comments;


    await axios.post('http://localhost:3005/events',{
        type:'CommentCreated',
        data: {
            id:commentId,
            content,
            postId: req.params.id
        }
    }).catch((e=>console.log(e)))

    res.status(201).send(comments)
})

//Events
server.post("/events",(req,res)=>{
    console.log("received event", req.body.type)
    res.status(200).send({})
})


server.listen(port,()=>{
    console.log("Server is up and running on port " + port)
})
