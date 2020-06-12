const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    status:{
        type: Boolean,
        default:false, 
        require: true,
        trim: true
    },

    
    created: {
        type: Date,  
        default: () => Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project" //model
    }
})

module.exports = mongoose.model('Task', TaskSchema)