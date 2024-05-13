import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        res.json(await Community.findOne({_id: req.body.community_id}))
    }
    catch(err)
    {
        res.json({response: "Error in Joining Community", status: 400})
    }
}

  