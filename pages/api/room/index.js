import connect from '../../../mongo'
import Room from '../../../Schema/RoomSchema.js'

export default async function POST(req,res) {
    if(req.method === 'POST'){
        try{
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
    else if(req.method === 'GET'){
        const rooms = await Room.find({})
        res.json(rooms)
    }
  }

  