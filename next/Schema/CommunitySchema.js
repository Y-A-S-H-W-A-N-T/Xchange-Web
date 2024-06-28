import mongoose from "mongoose";

const { Schema } = mongoose;

const postCommentSchema = new Schema({
    sender_vtu: {
        type: String
    },
    comment: {
        type: String
    }
})

const memberSchema = new Schema({
    user_vtu: {
        type: String
    }
})

const postSchema = new Schema({
    post_title: {
        type: String
    },
    post_media: {
        type: String
    },
    post_comments: [postCommentSchema]
})

const communitySchema = new Schema({
    leader_vtu: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    members: [memberSchema],
    posts: [postSchema]
},{
    timestamps: true
})

const Community = mongoose.models['Communities'] || mongoose.model('Communities', communitySchema);

export default Community;