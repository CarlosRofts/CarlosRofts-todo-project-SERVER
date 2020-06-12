const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth');
const {check} = require('express-validator')

// Crear nueva tarea //url api/tasks
router.post('/',
    auth,
    [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('project', 'El proyecto es obligatorio').not().isEmpty()

    ],
    taskController.newTask
)

//Get a todas las tareas filtradas poor proy.
router.get('/',
    auth,
    taskController.getTasks   
)

//Actualizar Tarea' //id de la tarea a act.
router.put('/:id',
    auth,
    taskController.updTask   
)

router.delete('/:id',
    auth,
    taskController.delTask   
)

module.exports = router
