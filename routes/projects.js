// Rutas para crear proj. (ENDPOINT)
const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth');
const {check} = require('express-validator')

// MIDDLEWARES
 // url: api/projects -> Definido en index.js
router.post('/',
    auth, //middleware - Checa que el token sea valido y que haya autenticación del usuario
    [ check('name' , 'El nombre del proyecto es obligatorio').not().isEmpty()],
    projectController.newProject
)
// Obtener todos 
router.get('/',
    auth, //middleware
    projectController.getProjects
)
// Actualizar (via  ID)
router.put('/:id',
    auth, //middleware
    [ check('name' , 'El nombre del proyecto es obligatorio').not().isEmpty() ],
    projectController.updateProj  
)  

router.delete('/:id',
    auth, //middleware
    projectController.delProj  
)  


module.exports = router
