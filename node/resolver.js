import { News } from './schema.js'

const resolvers = {
    Query: {
        getNews: async()=>{
            return await News.find({})
        }
    },
    // Mutation: {
    //     addBook: async(root,args)=>{
    //         const newBook = new Book({
    //             author: args.author,
    //             copies: args.copies,
    //             books: args.books
    //         })
    //         await newBook.save()
    //         return newBook
    //     },
    //     updateBook: async(root,args)=>{
    //         return await Book.findOneAndUpdate(
    //             { _id: args.id },
    //             { $set:  { books: args.books, copies: args.copies } },
    //             { new: true }
    //         )
    //     },
    //     deleteBook : async(root,args)=>{
    //         return await Book.findOneAndDelete({_id: args.id})
    //     }
    // }
}

export default resolvers