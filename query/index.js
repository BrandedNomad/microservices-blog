const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

server = express()

server.use(bodyParser.json());
server.use(cors());

//store posts and comments
const posts={}

//retrieves post for client
server.get('/posts',(req,res)=>{
    res.send(posts)

})

//Listens for events
server.post('/events',(req,res)=>{
    const {type,data} = req.body;

    if(type === 'PostCreated'){
        const {id,title} = data;
        posts[id]={id,title,comments:[]};
    }

    if(type === 'CommentCreated'){
        const {id,content,postId} = data;
        const post = posts[postId]
        post.comments.push({id,content}) //WTF

    }

    console.log("from query",posts)

    res.status(200).send({});

})

server.listen(3003,()=>{
    console.log("Up and running on 3003")
})
