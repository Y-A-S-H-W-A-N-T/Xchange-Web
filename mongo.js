import mongoose from "mongoose"

const connect = async()=>{
    const MONGO_URL = 'mongodb+srv://yashwant:yashwant@cluster0.n8lyem8.mongodb.net/Xchange?retryWrites=true&w=majority&appName=Cluster0'
    try{
        await mongoose.connect(MONGO_URL)
    }
    catch(err){
        console.log(err)
    }
}

export default connect