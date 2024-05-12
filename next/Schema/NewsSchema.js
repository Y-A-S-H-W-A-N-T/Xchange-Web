import mongoose from "mongoose";

const { Schema } = mongoose;

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
    },
    comments: [
        {
            sender_vtu: {
                type: String,
            },
            comment: {
                type: String,
            },
        },
    ]
},{
    timestamps: true
})

const News = mongoose.models['News'] || mongoose.model('News', newsSchema);

export default News;