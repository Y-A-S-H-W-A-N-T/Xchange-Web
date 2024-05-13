import mongoose from "mongoose";

const { Schema } = mongoose;

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
    members: [
        {
            user_vtu: {
                type: String,
            },
        },
    ],
    posts: [
        {
            post_title: {
                type: String,
                require: true
            },
            post_media: {
                type: String,
            },
            post_comments: [
                {
                    sender_vtu: {
                        type: String,
                    },
                    comment: {
                        type: String,
                    },
                },
            ]
        }
    ]
},{
    timestamps: true
})

const Community = mongoose.models['Communities'] || mongoose.model('Communities', communitySchema);

export default Community;