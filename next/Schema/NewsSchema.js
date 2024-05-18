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
    }
},{
    timestamps: true
})

const News = mongoose.models['News'] || mongoose.model('News', newsSchema);

export default News;