
const { data } = require('../controladores/carrera.controllers')

const existemateriasById = (req, res, next) => {
    const id = req.params.id
   
    for (const carrera of data.carreras) {
      
        const materia = carrera.materias.find(m => m.id == id)
        if (materia) return next()
    }
   
    return res.status(404).json({
        error: `No se encuentra la materia con el id ${id}`
    })
}

module.exports = { existemateriasById }