// Rutas para crear usuarios (END POINT)
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')

// Middewares
// Crea un usuario // url: api/usuarios -> Definido en index.js
router.post('/',

    // Express validartions (rules in router results in controller)
        // check(campo a validar, mensaje de error, reglas)
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 })
    ],
    userController.createUser
)
module.exports = router;

 