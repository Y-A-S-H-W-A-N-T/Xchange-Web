import mongoose from "mongoose";

const { Schema } = mongoose;

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
});

const User = mongoose.models['VTU'] || mongoose.model('VTU', userSchema);

export default User;
