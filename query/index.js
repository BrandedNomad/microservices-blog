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

const handleEvent = (type,data) =>{

    switch(type){
        case 'PostCreated': {
            let {id,title} = data;
            posts[id]={id,title,comments:[]};
            break;
        }
        case 'CommentCreated':{
            let {id,content,postId,status} = data;
            const post = posts[postId]
            post.comments.push({id,content,status})
            break;
        }
        case 'CommentUpdated': {
            let {id,content,postId,status} = data;
            const post = posts[postId]
            const comment = post.comments.find(comment=>{
                return comment.id === id;
            });
            comment.status = status;
            comment.content = content;
            break;
        }
        default:
            break;
    }

}

//Listens for events
server.post('/events',(req,res)=>{
    const {type,data} = req.body;

    handleEvent(type,data)

    res.status(200).send({});

})

server.listen(3003,async ()=>{
    console.log("Up and running on 3003");
    //checks the event bus for any missed events
    try{
        const res = await axios.get('http://eb-srv:3005/events')
        for(let event of res.data){
            console.log('processing event:', event.type);
            handleEvent(event.type,event.data)
        }
    }catch(e){
        console.log(e)
    }

})
