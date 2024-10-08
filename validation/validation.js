import Joi from "joi";

const cuidadoSchema = Joi.object({
    tipo: Joi.string().required().messages({
        "string.empty": "El tipo de cuidado es requerido",
    }),
    descripcion: Joi.string().min(3).max(200).required().messages({
        "string.empty": "La descripción del cuidado es requerida",
    }),
    frecuencia: Joi.string().required().messages({
        "string.empty": "La frecuencia del cuidado es requerida",
    })
});


const plantaSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "El nombre de la planta es requerido",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.max": "El nombre no puede exceder los 100 caracteres",
    }),
    tipo: Joi.string().required().messages({
        "string.empty": "El tipo de planta es requerido",
    }),
    cuidados: Joi.array().items(cuidadoSchema).min(1).required().messages({
        "array.min": "Debe proporcionar al menos un cuidado para la planta",
    }),
});

// Función de validación
const plantasValidation = (data) => {
    return plantaSchema.validate(data, { abortEarly: false }); 
};

export { plantasValidation };
