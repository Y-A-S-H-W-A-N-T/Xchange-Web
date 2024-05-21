import Room from '../../../Schema/RoomSchema.js'

export default async function POST(req,res) {
    try{
        console.log(req.body)
        const pass = await Room.find({_id: req.body.room_id},'passcode')
        pass[0].passcode == req.body.pass ? res.json({response: "Correct room pass", status: 200}) : res.json({response: "Wrong room pass", status: 500})
    }
    catch(err)
    {
        res.json({response: "Error in Pass Code Verification in chat room", status: 400})
    }
  }

  