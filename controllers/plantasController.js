import plantaModel from "../models/plantasModel.js";
import cuidadoModel from "../models/cuidadosModel.js";
import { plantasValidation } from "../validation/validation.js";

const createPlanta = async (req, res) => {
    const { error } = plantasValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details.map(err => err.message).join(", ") });
    }
    try {
        const { name, tipo, cuidados } = req.body;

        const cuidadoIds = await Promise.all(cuidados.map(async (cuidado) => {
            let existingCuidado = await cuidadoModel.findOne({ tipo: cuidado.tipo, descripcion: cuidado.descripcion, frecuencia: cuidado.frecuencia });
            if (!existingCuidado) {
                existingCuidado = new cuidadoModel(cuidado);
                await existingCuidado.save();
            }
            return existingCuidado._id;
        }));

        const nuevaPlanta = new plantaModel({
            name,
            tipo,
            cuidados: cuidadoIds
        });

        await nuevaPlanta.save();

        const populatedPlanta = await plantaModel.findById(nuevaPlanta._id).populate('cuidados');

        res.status(201).json({ message: "Planta creada exitosamente", data: populatedPlanta });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la planta", error: error.message });
    }
};

const getPlantasById = async (req, res) => {
    const { id } = req.params;
    try {
        const planta = await plantaModel.findById(id).populate('cuidados');
        res.status(200).json({ msg: "success", data: planta });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const getPlantas = async (req, res) => {
    const { name, tipo, cuidados, limit, sort } = req.query;
    try {
        let plantas;
        const query = {};
        if (name) {
            query.name = name;
        }
        if (tipo) {
            query.tipo = tipo;
        }
        if (cuidados) {
            query.cuidados = cuidados;
        }
        const options = {};

        if (limit) {
            options.limit = parseInt(limit);
        }

        if (sort) {
            options.sort = sort;
        }

        plantas = await plantaModel.find(query, null, options).populate('cuidados');

        res.status(200).json({ msg: "success", data: plantas });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const updatePlantas = async (req, res) => {
    const { id } = req.params;
    const { error } = plantasValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details.map(err => err.message).join(", ") });
    }
    const { name, tipo, cuidados } = req.body;
    try {
        const cuidadoIds = await Promise.all(cuidados.map(async (cuidado) => {
            let existingCuidado = await cuidadoModel.findOne({ tipo: cuidado.tipo, descripcion: cuidado.descripcion, frecuencia: cuidado.frecuencia });
            if (!existingCuidado) {
                existingCuidado = new cuidadoModel(cuidado);
                await existingCuidado.save();
            }
            return existingCuidado._id;
        }));

        const planta = await plantaModel.findByIdAndUpdate(id, { name, tipo, cuidados: cuidadoIds }, { new: true }).populate('cuidados');
        res.status(200).json({ msg: "success", data: planta });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const deletePlantasById = async (req, res) => {
    const { id } = req.params;
    try {
        const planta = await plantaModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "success", data: planta });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

export { createPlanta, getPlantasById, getPlantas, updatePlantas, deletePlantasById };