import Joi from "joi";

const cuidadoSchema = Joi.object({
    tipo: Joi.string().min(3).max(50).required().messages({
        "string.empty": "El tipo de cuidado es requerido",
        "string.min": "El tipo de cuidado debe tener al menos 3 caracteres",
        "string.max": "El tipo de cuidado no puede exceder los 50 caracteres",
    }),
    descripcion: Joi.string().min(3).max(200).required().messages({
        "string.empty": "La descripción del cuidado es requerida",
        "string.min": "La descripción debe tener al menos 3 caracteres",
        "string.max": "La descripción no puede exceder los 200 caracteres",
    }),
    frecuencia: Joi.string().min(3).max(50).required().messages({
        "string.empty": "La frecuencia del cuidado es requerida",
        "string.min": "La frecuencia debe tener al menos 3 caracteres",
        "string.max": "La frecuencia no puede exceder los 50 caracteres",
    })
});

const plantaSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.empty": "El nombre de la planta es requerido",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.max": "El nombre no puede exceder los 100 caracteres",
    }),
    tipo: Joi.string().min(3).max(50).required().messages({
        "string.empty": "El tipo de planta es requerido",
        "string.min": "El tipo de planta debe tener al menos 3 caracteres",
        "string.max": "El tipo de planta no puede exceder los 50 caracteres",
    }),
    cuidados: Joi.array().items(cuidadoSchema).min(1).required().messages({
        "array.min": "Debe proporcionar al menos un cuidado para la planta",
    }),
});

const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.empty": "El nombre es requerido",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.max": "El nombre no puede exceder los 50 caracteres",
    }),
    lastname: Joi.string().min(3).max(50).required().messages({
        "string.empty": "El apellido es requerido",
        "string.min": "El apellido debe tener al menos 3 caracteres",
        "string.max": "El apellido no puede exceder los 50 caracteres",
    }),
    username: Joi.string().min(3).max(50).required().messages({
        "string.empty": "El nombre de usuario es requerido",
        "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
        "string.max": "El nombre de usuario no puede exceder los 50 caracteres",
    }),
    password: Joi.string().min(6).max(100).required().messages({
        "string.empty": "La contraseña es requerida",
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.max": "La contraseña no puede exceder los 100 caracteres",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "El correo electrónico es requerido",
        "string.email": "El correo electrónico debe ser válido",
    })
});


const plantasValidation = (data) => {
    return plantaSchema.validate(data, { abortEarly: false }); 
};

const cuidadoValidation = (data) => {
    return cuidadoSchema.validate(data, { abortEarly: false });
}

const userValidation = (data) => {
    return userSchema.validate(data, { abortEarly: false });
}

export { plantasValidation, cuidadoValidation, userValidation };
