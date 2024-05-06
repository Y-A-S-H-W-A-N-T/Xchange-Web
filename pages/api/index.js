import connect from '../../mongo.js'
import User from '../../Schema/UserSchema.js'
import Room from '../../Schema/RoomSchema.js'


export default async function GET(req,res) {
    try{
        await connect()
        const rooms = await Room.find({})
        res.json({Rooms: rooms})
    }
    catch(err)
    {
        res.json({message: 'Error in connecting to database'})
    }
  }