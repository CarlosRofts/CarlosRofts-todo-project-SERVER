// Rutas para crear auth usuarios
const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// LOGIN
// middleware: Auth un usuario // url: api/auth -> Definido en index.js
router.post('/',

    // Express validartions (rules in router results in controller)
        // check(campo a validar, mensaje de error, reglas)
    [
        check('email', 'Agrega un email valido').isEmail(),
    ],
    authController.authUser
)

//Obtiene el usuario ya autentico | despues de login
router.get('/',
    auth,   
    authController.userAuth
)


module.exports = router;

