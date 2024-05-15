import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        await Community.findByIdAndUpdate(
            req.body.community_id,
            { $push: { posts: { post_title: req.body.title, post_media: req.body.media, post_comments: [] } } }
        )
        res.json({response: "Posted", status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in Posting", status: 400})
    }
}

  