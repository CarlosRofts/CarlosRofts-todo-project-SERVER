const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    // console.log("req.body",req.body) 
    // console.log("req only",req) 

    //validacion de los valores que llegan por post (express)
    const errors = validationResult(req)//si hay retorna un array de errores (ver user(rutas))
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    // extraer email y psss
    const {email, password} = req.body

    try {
        // validar valores unicos (mongo methods) #ORM Validation
        let user = await User.findOne({email}) //retorno Booleano

        if(user){
            return res.status(400).json({msg: 'El Email ya esta registrado'})            
        }

        user= new User(req.body) // Crear
        //hashing password
        const salt = await bcryptjs.genSalt(10)//un salt genera un hash unico aunque se repitan los passwords 
        user.password = await bcryptjs.hash(password, salt) 

        await user.save() // Guardar

        // Crear y firmar JasonWebToken
        const payload = {
            user: { id: user.id }
        }
        // firmar
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 3600 //1hr
        }, (error, token) => { 
            if(error) throw error
            res.json({token})
        })


        // res.send("Usuario Creado Correctamente")
        // res.json({msg: 'Usuario Creado Correctamente'})


    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}