const mongoose = require('mongoose')

// Schema de usuarios
// TYPES : mongoosejs.com/docs/schematypes.html
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
        unique: true,

    },
    date: {
        type: Date,  
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)