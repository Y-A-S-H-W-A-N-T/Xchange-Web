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
        await community.save()
        res.json({response: "Community Created", status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in creating Community", status: 400})
    }
}

  