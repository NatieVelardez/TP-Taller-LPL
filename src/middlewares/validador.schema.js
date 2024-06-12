const Joi = require('joi');

const data = require('../../data/data.json')

const validateSchema = (schema)=> {
  return (req, res, next) => {
    const {error} = schema.validate(req.body, {abortEarly: false});
    if (error){
      return res.status(400).json({ errores: error.details.map (error =>({
        atributo: error.path[0],
        error: error.message
      }))
    })
    }
    next()
  }
}

const validateCarreraName = (req, res, next) => {
  const carrera = req.body;
  const carreraExiste = data.carreras.some(c => c.nombre === carrera.nombre)
  if (carreraExiste) {
    return res.status(400).json({ message: 'La carrera ya existe' })
  }
  next()
}

const validateMaterias = (req, res, next) => {
  const carrera = req.body;
  for (const materia of carrera.materias) {
    const materiaExiste = data.carreras.some(c =>
      c.materias.some(m => m.nombre === materia.nombre)
    );
    if (materiaExiste) {
      return res.status(400).json({ message: `La materia "${materia.nombre}" ya existe en otra carrera` })
    }
  }
  next()
}

module.exports = {
  validateCarreraName,
  validateMaterias, 
  validateSchema
}
