import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema({
    sender_vtu: {
        type: String,
    },
    media: {
        type: String,
    },
    message: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const roomSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    private: {
        type: Boolean,
        default: false
    },
    passcode: {
        type: String
    },
    chats: [chatSchema]
},{
    timestamps: true
})

const Room = mongoose.models['ROOM'] || mongoose.model('ROOM', roomSchema);

export default Room;