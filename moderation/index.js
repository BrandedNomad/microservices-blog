const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const server = express()

server.use(bodyParser.json())

//receives event when comment has been created
server.post('/events',async (req,res)=>{
    const {type, data} = req.body

    if(type==='CommentCreated'){
        const status = data.content.includes('Orange') ? 'rejected': 'approved'

        await axios.post("http://localhost:3005/events", {
            type:'CommentModerated',
            data:{
                id:data.id,
                postId:data.postId,
                status,
                content: data.content
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    res.status(200).send({})

})

server.listen(3004,()=>{
    console.log("up and running on port 3004")
})
