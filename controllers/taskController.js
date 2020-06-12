const Task = require('../models/Task')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')

//Crear nueva tarea
exports.newTask = async (req, res) => { 
    //validacion de los valores que llegan por post (express)
    const errors = validationResult(req)//si hay retorna un array de errores (ver projects(rutas))
    if( !errors.isEmpty() ) return res.status(400).json({errors: errors.array()})
    
    try {
        const {project} = req.body // Extraer proy.
        
        // Validar Existencia
        const proj = await Project.findById(project)
        if (!proj) return res.status(404).json({msg: 'Proyecto no encontrado'})
        //Validar que el proyecto sea del usuario autenticodo //validar creador (que solo el puede actualizar)
        if(proj.creator.toString() !== req.user.id ){
            res.status(401).send('No autorizado')
        }

        //crear tarea
        const task = new Task(req.body)
        await task.save()
        res.json({task})



    } catch (error) {
        res.status(500).send('Hubo un error')

    }

}


//Get tareas por proy.
exports.getTasks = async (req, res) => { 

    try {
        const {project} = req.query // Extraer id proy. (enviando desde el cliente como params) por eso el .query
        
        // Validar Existencia
        const proj = await Project.findById(project)
        if (!proj) return res.status(404).json({msg: 'Proyecto no encontrado'})
        //Validar que el proyecto sea del usuario autenticodo //validar creador (que solo el puede actualizar)
        if(proj.creator.toString() !== req.user.id ){
            res.status(401).send('No autorizado')
        }

        // filtrar por id del proyecto
        const tasks = await Task.find({ project }).sort({created:-1}) //select all + inverse by created(date)
        res.json({tasks})

    } catch (error) {
    // console.log(error)   
    res.status(500).send('Hubo un error')
     
    }

}

exports.updTask = async (req, res) => {
    // console.log(req.body)
    try {
        const {project , name , status} = req.body // Extraer proy.

        // Validar Existencia de la tarea
        let task = await Task.findById(req.params.id) //consulta por id de tarea. 
        if(!task) return res.status(401).send('La tarea no existe')

        // extraer id proy.
        const proj = await Project.findById(project)
        //Validar que el proyecto sea del usuario autenticodo //validar creador (que solo el puede actualizar)
        if(proj.creator.toString() !== req.user.id ){
            res.status(401).send('No autorizado')
        }

        //Crear obj con la nueva inf.
        const newTask = {}
        newTask.name = name
        newTask.status = status

        // Guarda BDD
        task = await Task.findOneAndUpdate({ _id: req.params.id },
            newTask,{new:true}
        )
        res.json({task})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')

        
    }
 }

//  Eliminar Tarea
exports.delTask = async (req, res) => {    
    try {
        const {project } = req.query // Extraer ID proy.
        // console.log('query',req.query)// console.log('params',req.params)// console.log('body',req.body)

        // Validar Existencia de la tarea
        let task = await Task.findById(req.params.id) 
        if(!task) return res.status(401).send('La tarea no existe')

        // extraer id proy.
        const proj = await Project.findById(project)
        //Validar que el proyecto sea del usuario autenticodo //validar creador (que solo el puede actualizar)
        if(proj.creator.toString() !== req.user.id ){
            res.status(401).send('No autorizado')
        }

        // Eliminar
        await Task.findByIdAndRemove({_id: req.params.id})
        res.json({msg : 'Tarea Eliminada'})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')

        
    }
}

