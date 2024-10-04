import mongoose from "mongoose";

const Schema = mongoose.Schema;

const plantaCollection = 'Plantas'

const plantaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ['cactus', 'suculenta', 'flor', 'arbusto', 'árbol'],
    },
    cuidados: [{
      type: Schema.Types.ObjectId,
      ref: 'Cuidados'
  }]
  });

const plantaModel = mongoose.model(plantaCollection,plantaSchema);
export default plantaModel;