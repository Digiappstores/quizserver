const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userId: {
        type: Number,
    },
    username: {
        type: String,
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
    }
});

UserSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
})
const User = mongoose.model('user', UserSchema)
module.exports = User
