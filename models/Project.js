const mongoose = require('mongoose')
const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    
    creator: { //simula un joint"(FK)
        type: mongoose.Schema.Types.ObjectId,//campo de User 
        ref: 'User' //Tabla User
    },
    created: {
        type: Date,  
        default:() => Date.now()
    }
})

module.exports = mongoose.model('Project', ProjectSchema)