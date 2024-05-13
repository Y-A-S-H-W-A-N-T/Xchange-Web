import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        res.json(await Community.find({}))
    }
    catch(err)
    {
        res.json({response: "Error in fetching Community", status: 400})
    }
}

  