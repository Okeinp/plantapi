import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cuidadoCollection = 'Cuidados';

const cuidadoSchema = new mongoose.Schema({
    planta_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Planta',
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ['riego', 'fertilización', 'poda', 'trasplante'], // Enum de tipos de cuidado
    },
    fecha_programada: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ['completado', 'pendiente'], // Enum para estado
      default: 'pendiente', // Estado por defecto
    },
  });

const cuidadoModel = mongoose.model(cuidadoCollection,cuidadoSchema);
export default cuidadoModel;