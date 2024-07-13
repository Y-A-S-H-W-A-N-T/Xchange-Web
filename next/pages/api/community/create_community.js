import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        const community = Community({
            leader_vtu: req.body.vtu,
            name: req.body.name,
            description: req.body.description,
            members: [
                {
                    user_vtu: req.body.vtu
                }
            ],
            posts: []
        })
        const newCommunity = await community.save()
        res.json({response: "Community Created", status: 200, data: newCommunity})
    }
    catch(err)
    {
        res.json({response: "Error in creating Community", status: 400})
    }
}

  