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
            const newRoom = new Room(input)
            return await newRoom.save()
        },
        addCommunity: async(_,{ input }) => {
            try{
                const newCommunity = new Community(input)
                return await newCommunity.save()
            }
            catch(err){
                console.log(err)
            }
        },
        addPostToCommunity: async(_,{ communityID, post }) => {
            console.log(communityID,"-",post)
            const response = await Community.findByIdAndUpdate(
                communityID,
                { $push: { posts: post } },
                { new: true }
            )
            return response
        },
        joinCommunity: async(_,{ communityID, vtu }) => {
            const response = await Community.findByIdAndUpdate(
                {   
                    _id: communityID,
                },
                { $push: { members: { user_vtu: vtu } } },
                { new: true }
            )
            return response
        }
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