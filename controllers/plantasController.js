import plantaModel from "../models/plantasModel.js";

const createPlanta = async (req, res) => {
    const { name, tipo, ubicacion, fecha_registro } = req.body;
    try {
        const planta = new plantaModel({name, tipo, ubicacion, fecha_registro});

        const result = await planta.save();

        res.status(200).json({ msg: "success", data: result });
    } catch (error){
        res.status(500).json({ msg: "error", data: []});
        console.error(error);
    }
}

const getPlantasById = async (req, res) =>{

    const { id } = req.params;
    try {
        const plantas = await plantaModel.findById(id);
        res.status(200).json({ msg: "success", data: plantas })

    } catch (error) {
        res.status(500).json({ msg: "error", data: [] })
        console.error(error);
        
    }
}

const getPlantas = async (req, res) =>{
    try {
        const plantas = await plantaModel.find();
        res.status(200).json({ msg: "success", data: plantas })

    } catch (error) {
        res.status(500).json({ msg: "error", data: [] })
        console.error(error);
        
    }
}

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

export { createPlanta, getPlantasById, getPlantas, updatePlantas, deletePlantasById }