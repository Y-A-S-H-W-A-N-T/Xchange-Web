import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    console.log(req.body)
    try{
        await Community.findByIdAndUpdate(
            {_id: req.body.community_id,},
            { $pull: { members: {user_vtu: req.body.user_vtu} } }
        )
        res.json({response: `Removed ${req.body.user_vtu} from the community`, status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in Removing User from Community", status: 400})
    }
}

  