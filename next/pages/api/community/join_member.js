import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        await Community.updateOne(
            { _id: req.body.communit_id },
            { $push: { members: { user_vtu: req.body.user_vtu } } }
        )     
        res.json({response: "User Joined the Community", status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in Joining Community", status: 400})
    }
}

  