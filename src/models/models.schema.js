const Joi = require("joi")

const materiaSchema = Joi.object({
  nombre: Joi.string().required().messages({
      "string.empty": "El nombre de la materia no puede estar vacío",
      "any.required": "El nombre de la materia es requerido"
  }),
  cuatrimestral: Joi.number().integer().required().messages({
      "number.integer": "El valor cuatrimestral debe ser un número entero",
      "number.empty": "El valor cuatrimestral no puede estar vacío",
      "any.required": "El valor cuatrimestral es requerido"
  }),
  anio: Joi.number().integer().required().messages({
      "number.integer": "El año debe ser un número entero",
      "number.empty": "El año no puede estar vacío",
      "any.required": "El año es requerido"
  }),
  carreraId: Joi.number().integer().required().messages({
    "number.integer": "El id de la carrera debe ser un número entero",
      "number.empty": "El Id de la carrera no puede estar vacío",
      "any.required": "El Id de la carrera es requerido"
  })
})

const carreraSchema = Joi.object({
    nombre: Joi.string().max(50).required().messages({
        "string.max": " El nombre de la carrera debe contener como máximo {#limit}",
        "string.empty": "El nombre de la carrera no puede ser vacío",
        "any.required": "El nombre de la carrera es requerido"
    }),
    grado: Joi.string().max(50).required().valid("Titulo intermedio", "Licenciatura", "De grado").messages({
        "string.max": "El nombre de grado debe contener como máximo {#limit}",
        "any.required": "El nombre de grado es requerido",
        "any.only": "Los nombres de grado solo pueden ser: Titulo Intermedio, Licenciatura, De grado"
    }),
    universidad: Joi.string().max(50).required().messages({
        "string.max": "El nombre de la Universidad debe contener como máximo {#limit}",
        "string.empty": "El nombre de la Universidad no puede ser vacío",
        "any.required": "El nombre de la Universidad es requerido"
    }),
    materias: Joi.array().items(materiaSchema).required().messages({
        "any.required": "Las Materias son requeridas"
    })
})



module.exports = { materiaSchema, carreraSchema }
