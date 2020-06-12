const jwt = require('jsonwebtoken')

// MIDDLEWARE: conecta dos aplicaciones para que se puedan pasar fácilmente datos 
// y bases de datos por una “canalización”. El uso de middleware permite
// a los usuarios hacer solicitudes 

module.exports = function(req,res,next){
    //Leer token del header
    const token = req.header('x-auth-token')
    // console.log(token)


    // Validar Token
    if(!token){
        return res.status(401).json({msg: ' No hay Token, permiso no valido'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRET) //verifica el token por si ya expiro o se intenta adivinar el token
        req.user = cifrado.user //crea un obj en el req. que contine el token con los datos del usuario autenticado
        next() //sig. middleware
    } catch (error) {
        return res.status(401).json({msg: 'Token no valido'})  
    }
}