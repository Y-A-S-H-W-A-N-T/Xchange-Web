import { News } from './schema.js'

const resolvers = {
    Query: {
        getNews: async()=>{
            return await News.find({})
        }
    },
    Mutation: {
        addNews: async(root,args)=>{
            const newNews = new News({
                headline: args.headline,
                description: args.description,
                image: args.image
            })
            await newNews.save()
            return newNews
        },
        // updateNews: async(root,args)=>{
        //     return await Book.findOneAndUpdate(
        //         { _id: args.id },
        //         { $set:  { books: args.books, copies: args.copies } },
        //         { new: true }
        //     )
        // },
        // deleteNews : async(root,args)=>{
        //     return await Book.findOneAndDelete({_id: args.id})
        // }
    }
}

export default resolvers