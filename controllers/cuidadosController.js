import cuidadosModel from "../models/cuidadosModel.js";
import { cuidadoValidation } from "../validation/validation.js";

const createCuidado = async (req, res) => {
    const { error } = cuidadoValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details.map(err => err.message).join(", ") });
    }
    try {
        const { tipo, descripcion, frecuencia } = req.body;
        const nuevoCuidado = new cuidadosModel({ tipo, descripcion, frecuencia });
        await nuevoCuidado.save();
        res.status(201).json({ message: "Cuidado creado exitosamente", data: nuevoCuidado });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el cuidado", error: error.message });
    }
};

const getCuidados = async (req, res) => {
    try {
        const cuidados = await cuidadosModel.find();
        res.status(200).json({ msg: "success", data: cuidados });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const getCuidadosById = async (req, res) => {
    const { id } = req.params;
    try {
        const cuidado = await cuidadosModel.findById(id);
        res.status(200).json({ msg: "success", data: cuidado });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const updateCuidados = async (req, res) => {
    const { id } = req.params;
    const { error } = cuidadoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details.map(err => err.message).join(", ") });
    }
    const { tipo, descripcion, frecuencia } = req.body;
    try {
        const cuidado = await cuidadosModel.findByIdAndUpdate(id, { tipo, descripcion, frecuencia }, { new: true });
        res.status(200).json({ msg: "success", data: cuidado });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const deleteCuidadosById = async (req, res) => {
    const { id } = req.params;
    try {
        const cuidado = await cuidadosModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "success", data: cuidado });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

export { createCuidado, getCuidados, getCuidadosById, updateCuidados, deleteCuidadosById };

