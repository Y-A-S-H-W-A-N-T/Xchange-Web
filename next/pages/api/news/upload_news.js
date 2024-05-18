import News from '../../../Schema/NewsSchema.js'

export default async function POST(req,res) {
    try{
        const news = News({
            headline: req.body.headline,
            description: req.body.description,
            image: req.body.image
        })
        await news.save()
        res.json({response: "News Uploaded", status: 200})
    }
    catch(err)
    {
        res.json({response: "Error in uploading news", status: 400})
    }
}

  