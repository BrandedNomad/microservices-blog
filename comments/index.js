const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')

const server = express();
const port = 3002 || process.env.PORT

server.use(bodyParser.json())
server.use(cors())

const commentsByPostId = {};

server.get('/posts/:id/comments',(req,res)=>{
    res.status(200).send(commentsByPostId[req.params.id || []])

});


server.post('/posts/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id:commentId, content});
    commentsByPostId[req.params.id]= comments;


    res.status(201).send(comments)
})


server.listen(port,()=>{
    console.log("Server is up and running on port " + port)
})
