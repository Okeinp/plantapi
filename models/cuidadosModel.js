import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cuidadoCollection = 'Cuidados';

const cuidadoSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    frecuencia: {
        type: String,
        required: true
    }
});

const cuidadoModel = mongoose.model(cuidadoCollection, cuidadoSchema);
export default cuidadoModel;