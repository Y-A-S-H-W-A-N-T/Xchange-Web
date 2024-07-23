const PORT = 8000;
import { Room } from './schema.js';
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDef.js'
import resolvers from './resolver.js'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGOOSE_URL

mongoose.connect(MONGO_URL).then(()=>console.log("DATABASE CONNECTED"))

import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

app.use(bodyParser.json())

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
  socket.on('connected',async(room_id)=>{
      console.log("Room Chat")
      const room_chats = await Room.findOne({ _id: room_id }, { chats: 1 })
      const pastMessages = room_chats ? room_chats.chats : []
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
})


const startApolloServer = async()=>{
  const apolloserver = new ApolloServer({typeDefs, resolvers})
  
  await apolloserver.start()
  
  apolloserver.applyMiddleware({app, path: '/graphql'})
  console.log("Running ApolloServer")
}
startApolloServer()

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})