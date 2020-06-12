const Project = require('../models/Project')
const {validationResult} = require('express-validator')

exports.newProject = async (req, res) => { 

     //validacion de los valores que llegan por post (express)
    const errors = validationResult(req)//si hay retorna un array de errores (ver projects(rutas))
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        // Crear nuevo proj.
        const project = new Project(req.body)

        project.creator =req.user.id // Asignar el creado del proy. con JWT | Generado en middeware (auth.js)
        project.save()
        res.json(project)

    } catch (error) {
        // console.log(error)
        res.status(500).send('Hubo un error')
    }

}

// Obtener proy. del usuario autenticado
exports.getProjects = async(req,res) =>{
    try{
        // console.log("From projectController",req.user)
            //consulta todos los campos | find(condicion) 
        const projects = await Project.find({ creator : req.user.id}).sort({created:-1}) //sort reacomodo inverso
        res.json({projects})
    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}


//Actualizar proy.
exports.updateProj = async(req,res) =>{

     //validacion de los valores que llegan por post (express)
     const errors = validationResult(req)//si hay retorna un array de errores (ver projects(rutas))
     if( !errors.isEmpty() ){
         return res.status(400).json({errors: errors.array()})
     }

     //Extraer innfo
     const {name} = req.body
     const newProj = {} //rescribira el anterior
     if (name) newProj.name = name //actualizar variable

     try {
        // Validar id // console.log(req.params.id)
        let project = await Project.findById(req.params.id)
        // Validar projecto
        if (!project) return res.status(404).json({msg: 'Proyecto no encontrado'})

        //validar creador (que solo el puede actualizar)
        if(project.creator.toString() !== req.user.id ){
            res.status(401).send('No autorizado')
        }
        //actualizar BDD
        project = await Project.findByIdAndUpdate({_id: req.params.id}, //como un where
            // The $set(mongo) operator replaces the value of a field with the specified value.
            // new (express) if true, return the modified document rather than the original. defaults to false (changed in 4.0) */
            {$set : newProj}, {new:true}
        ) 
        res.json({project}) 

         
     } catch (error) {
        res.status(500).send('Hubo un error en el servidor')
     }
}

// Eliminar por id 
exports.delProj = async(req,res) =>{

    try {

         // Validar id // console.log(req.params.id)
        let project = await Project.findById(req.params.id)
        // Validar projecto
        if (!project) return res.status(404).json({msg: 'Proyecto no encontrado'})

        //validar creador (que solo el puede actualizar)
        if(project.creator.toString() !== req.user.id ){
            res.status(401).send('No autorizado')
        }

        // eliminar proj.
        await Project.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Proyecto eliminado'})

    } catch (e) {
        res.status(500).send('Hubo un error en el servidor')        
    }



}

