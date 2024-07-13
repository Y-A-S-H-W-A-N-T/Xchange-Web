const PORT = 8000;
const { User, Room, News } = require('./schema')


const mongoose = require('mongoose')
const MONGO_URL = 'mongodb+srv://yashwant:yashwant@cluster0.n8lyem8.mongodb.net/Xchange?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(MONGO_URL).then(()=>console.log("DATABASE CONNECTED"))

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors')
const body_parser = require('body-parser')

const app = express();
const server = http.createServer(app);


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

app.use(body_parser.json())

  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
  socket.on('connected',async(room_id)=>{
      console.log("Room Chat")
      const room_chats = await Room.findOne({ _id: room_id }, { chats: 1 })
      const pastMessages = room_chats ? room_chats.chats : [];
      socket.emit('pastMessages', pastMessages);
    })
      socket.on('chat',async(data)=>{
        const message = {
          sender_vtu: data.sender_vtu,
          media: data.media,
          message: data.message
        }
        const result = await Room.updateOne(
          {_id: data.room_id },
          { $push: { chats: message } }
        )
        console.log(result)
        socket.emit('chat',data)
    })
});


app.get('/news',async(req,res)=>{
  const result = await News.find({})
  res.send(result)
})


app.post('/addnews',async(req,res)=>{
  console.log(req.body)
  const newNews = new News(req.body)
  const response = await newNews.save()
  console.log(response)
  res.send(response)
})


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})