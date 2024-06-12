
const { Router } = require('express')
const router = Router()
const materiasController = require('../controladores/materias.controllers')
const { existemateriasById } = require('../middlewares/materias.middlewares')

router.get('/materias', materiasController.getAllMaterias)
router.get('/materias/:id', existemateriasById, materiasController.getMateriaById)
router.delete('/materias/:id', existemateriasById, materiasController.deleteMateria)

module.exports = router






