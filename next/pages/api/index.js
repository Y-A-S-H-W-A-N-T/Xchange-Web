import connect from '../../mongo.js'

export default async function GET(req,res) {
    try{
        connect()
        res.json({msg: 'Connected to Database'})
    }
    catch(err)
    {
        res.json({message: 'Error in connecting to database'})
    }
  }