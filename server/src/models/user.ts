import mongoose, { Schema } from 'mongoose';

//const { Schema } = mongoose;

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('User', user);