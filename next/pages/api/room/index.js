import Room from '../../../Schema/RoomSchema.js'

export default async function POST(req,res) {
    if(req.method === 'POST'){
        try{
            const room = Room({
                name: req.body.name,
                private: req.body.private,
                passcode: req.body.passcode
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
        res.json(await Room.find({}))
    }
  }

  