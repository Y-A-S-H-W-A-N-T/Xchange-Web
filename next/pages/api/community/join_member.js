import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        await Community.findOneAndUpdate(
            {
              _id: req.body.community_id,
              "members.user_vtu": { $ne: req.body.user_vtu }
            },
            { $push: { members: { user_vtu: req.body.user_vtu } } }
          )  
          res.json({response: "User Joined the Community", status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in Joining Community", status: 400})
    }
}

  