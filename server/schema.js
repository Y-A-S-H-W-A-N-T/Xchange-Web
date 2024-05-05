const mongoose = require('mongoose')

const user = mongoose.Schema({
    vtu: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
    },
},{
    timestamps: true
})

const room = mongoose.Schema({
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
},{
    timestamps: true
})




const User = mongoose.model('VTU',user)
const Room = mongoose.model('ROOM',room)

module.exports = { User, Room }