
const data = require('../../data/data.json')

const getAllMaterias = (req, res) => {
  const materias = data.carreras.reduce((acc, carrera) => acc.concat(carrera.materias), [])
  res.status(200).json(materias)
}

const getMateriaById = (req, res) => {
  const materias = data.carreras.reduce((acc, carrera) => acc.concat(carrera.materias), [])
  const materia = materias.find(m => m.id == req.params.id)
  if (!materia) return res.status(404).json({ message: 'Materia no encontrada' })
  res.status(200).json(materia)
}

const deleteMateria = (req, res) => {
  for (const carrera of data.carreras) {
    const materiaIndex = carrera.materias.findIndex(m => m.id == req.params.id)
    if (materiaIndex !== -1) {
      carrera.materias.splice(materiaIndex, 1)
      return res.status(200).json({ message: 'Materia eliminada' })
    }
  }
  res.status(404).json({ message: 'Materia no encontrada' })
}

module.exports = {
  getAllMaterias,
  getMateriaById,
  deleteMateria, data
}

