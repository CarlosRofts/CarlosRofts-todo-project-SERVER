const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async(req,res) => { 
    //autentica a un usuario. ,valida y firma JWT | al logearce
    
    //validacion de los valores que llegan por post (express)
    const errors = validationResult(req)//si hay retorna un array de errores (check) (ver user(rutas))
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }
   

    const {email,password} = req.body
    try {
        //Validar usuario ya registrado ORM(mongo methods)
        let user = await User.findOne({ email }) //retorna consulta
        if(!user){
            return res.status(400).json({ msg: 'El usuario no existe' })
        }
        // Check Password
        const passcheck = await bcryptjs.compare(password, user.password)
        if(!passcheck){
            return res.status(400).json({msg: 'Password Incorrecto'})
        }

        // JWT
        // Crear y firmar JasonWebToken
        const payload = { user: {id: user.id} }
        // firmar
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000 //seg
        }, (error, token) => {
            if (error) throw error
            res.json({ token })
        })

    } catch (error) { console.log(error)}
}

//Obtiene los datos del usuario ya autentico/logeado | despues de login
exports.userAuth = async(req,res) => { //GET
    try {
        const user = await User.findById(req.user.id).select('-password') //exluimos el password por motivos de seguridad. 
        res.json({user}) //agrega al res un obj con la info del usuario
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})   
        
    }    

}

