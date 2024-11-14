import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

export const  Server = mongoose.model('Server', serverSchema);
