const mongoose = require('mongoose')

const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    image: {
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

const userSchema = new Schema({
    vtu: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    }
}, {
    timestamps: true
})

const newsSchema = new Schema({
    headline: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
},{
    timestamps: true
})

const Room = mongoose.models['ROOM'] || mongoose.model('ROOM', roomSchema);
const User = mongoose.models['VTU'] || mongoose.model('VTU', userSchema);
const News = mongoose.models['NEWS'] || mongoose.model('NEWS', newsSchema);

module.exports = { Room, User, News };
