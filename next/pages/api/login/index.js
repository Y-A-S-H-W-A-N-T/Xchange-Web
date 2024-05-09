import connect from '../../../mongo'
import User from '../../../Schema/UserSchema.js'


export default async function POST(req,res) {
    try{
        const Found = await User.find(req.body)
        Found.length>0? res.status(200).json({message: 'User Found', name: Found[0].name, vtu: Found[0].vtu}) : res.json({status: 400,message: 'User Not Found'})
    }
    catch(err)
    {
        res.json(req.body.vtu)
    }
  }