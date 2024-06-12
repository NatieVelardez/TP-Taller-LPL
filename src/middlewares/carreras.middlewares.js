const { data } = require('../controladores/carrera.controllers')

const existecarreraById = (req, res, next) => {
    const id = req.params.id
    const idx = data.carreras.findIndex( d => d.id == id)
    if (idx < 0) {
        return res.status(404).json({
            error: `No se encuentra la carrera con el id ${id}`
        })
    }
    next()
}

module.exports = { existecarreraById }


