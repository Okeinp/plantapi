import { Router } from "express";
import { createPlanta, getPlantasById, getPlantas, updatePlantas, deletePlantasById } from "../controllers/plantasController.js";

const router = Router();

router.get('/', getPlantas);
router.get('/:id', getPlantasById);
router.post('/', createPlanta);
router.put('/:id', updatePlantas);
router.delete('/:id', deletePlantasById);

export default router;