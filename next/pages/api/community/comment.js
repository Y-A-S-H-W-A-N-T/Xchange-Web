import Community from '../../../Schema/CommunitySchema.js'

export default async function POST(req,res) {
    try{
        const test = await Community.updateOne(
            { _id: req.body.community_id, 'posts._id': req.body.post_id },
            { $push: { 'posts.$.post_comments': {sender_vtu: req.body.comment_sender, comment: req.body.comment_payload} } }
        )
        res.json({response: "Commented", status: 200})
    }
    catch(err) 
    {
        res.json({response: "Error in Commenting", status: 400})
    }
}

  