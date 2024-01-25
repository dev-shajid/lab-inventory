import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['user', 'head', 'asistant', 'manager'],
        default: 'user',
        required: true,
    },
    // provider: {
    //     type: String,
    //     enum: ['google','github','email'],
    //     required:true,
    // },
    isVerified:{
        type: Boolean,
        default: false,
    },
    phone:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)