const { Router } = require('express')
const router = Router()
const carrerasController = require('../controladores/carrera.controllers')
const { validateSchema, validateCarreraName, validateMaterias } = require('../middlewares/validador.schema')
const { existecarreraById } = require('../middlewares/carreras.middlewares')
const { carreraSchema } = require('../models/models.schema')

router.get('/carreras', carrerasController.getAllCarreras)
router.get('/carreras/:id', existecarreraById, carrerasController.getCarreraById)
router.post('/carreras', validateSchema(carreraSchema), validateCarreraName, validateMaterias, carrerasController.createCarrera)
router.delete('/carreras/:id', existecarreraById, carrerasController.deleteCarrera)
router.post('/carreras/:id/materias', existecarreraById, carrerasController.addMateriaToCarrera)
router.get('/carreras/:id/materias', existecarreraById, carrerasController.getMateriasByCarrera)

module.exports = router




