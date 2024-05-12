import News from '../../../Schema/NewsSchema.js'

export default async function POST(req,res) {
    try{
        res.json(await News.find({}))
    }
    catch(err)
    {
        res.json({response: "Error in fetching news", status: 400})
    }
}

  