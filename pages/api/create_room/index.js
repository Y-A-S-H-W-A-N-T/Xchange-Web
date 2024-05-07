import { response } from 'express'
import connect from '../../../mongo'
import Room from '../../../Schema/RoomSchema.js'

export default async function POST(req,res) {
    try{
        await connect()
        const room = Room({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        })
        await room.save()
        res.json({response: "Chat Room Saved", status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in saving Chat Room", status: 400})
    }
  }