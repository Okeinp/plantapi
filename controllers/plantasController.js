import plantaModel from "../models/plantasModel.js";
import cuidadoModel from "../models/cuidadosModel.js";

const createPlanta = async (req, res) => {
    try {
        const { name, tipo, cuidados } = req.body;

        const cuidadoIds = await Promise.all(cuidados.map(async (cuidado) => {
            let existingCuidado = await cuidadoModel.findOne({tipo: cuidado.tipo, descripcion: cuidado.descripcion, frecuencia: cuidado.frecuencia });
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

        res.status(201).json({ message: "Planta creada exitosamente", data: nuevaPlanta });
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
    const { name, limit, sort } = req.query;
    try {
        let plantas;
        const query = name ? { name: name } : {};
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
const updatePlantas = async (req, res) =>{
    try {
        const plantas = await plantaModel.findByIdAndUpdate();
        res.status(200).json({ msg: "success", data: plantas })

    } catch (error) {
        res.status(500).json({ msg: "error", data: [] })
        console.error(error);
        
    }
}

const deletePlantasById = async (req, res) =>{
    const { id } = req.params;
    try {
        const plantas = await plantaModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "success", data: plantas })

    } catch (error) {
        res.status(500).json({ msg: "error", data: [] })
        console.error(error);
        
    }
}

export { createPlanta, getPlantasById, getPlantas, updatePlantas, deletePlantasById,}