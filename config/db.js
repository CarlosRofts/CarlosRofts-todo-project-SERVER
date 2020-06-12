const mongoose = require('mongoose')
require('dotenv').config({ path: 'var.env' })

// Req. para conexión con mongoDB
const conectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        } ) //parameters:(url,{config})
        console.log("DB: Connection Success")
    } catch (error) {
        console.log("───────────── DB: Connection Failed─────────────")
        console.log(error)
        process.exit(1) //detiene la app si hay error
    }
}  
module.exports = conectDB    