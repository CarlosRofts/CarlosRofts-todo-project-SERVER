const express = require('express')
const connectDB = require('./config/db')
// Crear Server
const app = express()
const cors = require('cors')

// Connect DB
connectDB()

// Habilitar cors  (recibir peticiones de otro dominio)
    //requisito para comunicar con el front end ya que cors bloquea el acceso al backend 
    //cuando este se encuentra separado del front end por politicas de seguridad.
    // al config. asegurarce de no tener nada en la BDD
app.use(cors())

// Habilitar  express.json (alternativa a BodyParser)
    //al usar expr..json el header(postman) debe ir: value:application/json 
app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 5000; //app herocku/local port 

// Definir Routing (temporal)
// app.get('/',(req,res) =>{
//     res.send('HELLO WORLD')
// } )

// Importar Rutas //middlewares
app.use('/api/users', require('./routes/users')) 
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/projects', require('./routes/projects')) 
app.use('/api/tasks', require('./routes/tasks')) 

// run app  
app.listen(PORT, () =>{
    console.log(`Servidor Iniciado en el puerto ${PORT}`)
})


//#vid 23.1 Trabajando los proyectos y tareas ...