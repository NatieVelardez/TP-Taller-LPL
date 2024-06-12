const data = require('../../data/data.json')


const getAllCarreras = (req, res) => {
  res.status(200).json(data.carreras)
}


const getCarreraById = (req, res) => {
  const carrera = data.carreras.find(c => c.id == req.params.id);
  if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' })
  res.status(200).json(carrera)
}

const createCarrera = (req, res) => {
  const carrera = req.body

  
  let id = 1;
  if (data.carreras.length > 0) {
    const ids = data.carreras.map(d => d.id)
    id = Math.max(...ids) + 1;
  }

 
  let maxMateriaId = data.carreras.reduce((maxId, carrera) => Math.max(maxId, ...carrera.materias.map(m => m.id)), 0);
  const materias = carrera.materias.map((materia, index) => ({
    id: maxMateriaId + 1 + index,
    nombre: materia.nombre,
    cuatrimestral: materia.cuatrimestral,
    anio: materia.anio,
    carreraId: id,
  }))

  const nuevaCarrera = {
    id,
    nombre: carrera.nombre,
    grado: carrera.grado,
    universidad: carrera.universidad,
    materias
  }

  data.carreras.push(nuevaCarrera)
  res.status(201).json(nuevaCarrera)
}

//elimina una carrera por id
const deleteCarrera = (req, res) => {
  const carreraIndex = data.carreras.findIndex(c => c.id == req.params.id)
  if (carreraIndex === -1) return res.status(404).json({ message: 'Carrera no encontrada' })

  data.carreras.splice(carreraIndex, 1)
  res.status(200).json({ message: 'Carrera eliminada' })
}

//agrega una materia a una carrera por id
const addMateriaToCarrera = (req, res) => {
  const id = req.params.id;
  const idx = data.carreras.findIndex(d => d.id == id)

  if (idx < 0) {
    return res.status(404).json({
      error: `No se encuentra la carrera con el id ${id}`
    })
  }

  const materiaNombre = req.body.nombre

  // Verificamos si la materia ya existe en otra carrera
  const materiaExiste = data.carreras.some(c =>
    c.materias.some(m => m.nombre === materiaNombre)
  )
  if (materiaExiste) {
    return res.status(400).json({ message: 'La materia ya existe en otra carrera' })
  }

  const nuevaMateria = {
    id: data.carreras[idx].materias.length ? Math.max(...data.carreras[idx].materias.map(m => m.id)) + 1 : 1,
    ...req.body,
    carreraId: id
  }

  data.carreras[idx].materias.push(nuevaMateria)

  res.status(201).json(nuevaMateria)
}
const getMateriasByCarrera = (req, res) => {
  const carrera = data.carreras.find(c => c.id == req.params.id)
  if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' })
  res.status(200).json(carrera.materias);
}

module.exports = {
  getAllCarreras,
  getCarreraById,
  createCarrera,
  deleteCarrera,
  addMateriaToCarrera,
  getMateriasByCarrera, data
}
