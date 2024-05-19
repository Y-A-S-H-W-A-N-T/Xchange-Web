import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    chats:[
        {
            sender_vtu: {
                type: String,
            },
            media: {
                type: String,
            },
            message: {
                type: String,
            },
        },
    ]
},{
    timestamps: true
})

const Room = mongoose.models['ROOM'] || mongoose.model('ROOM', roomSchema);

export default Room;