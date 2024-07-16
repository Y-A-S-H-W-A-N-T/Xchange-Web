import { Community, News, Room } from './schema.js'

const resolvers = {
    Query: {
        getNews: async()=>{
            return await News.find({})
        },
        getRooms: async()=>{
            return await Room.find({})
        },
        getCommunities: async()=>{
            return await Community.find({})
        }
    },
    Mutation: {
        addNews: async(_,args)=>{
            const newNews = new News({
                headline: args.headline,
                description: args.description,
                image: args.image
            })
            return await newNews.save()
        },
        addRoom: async (_, { input }) => {
            const newRoom = new Room(input);
            return await newRoom.save();
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