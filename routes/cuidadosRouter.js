import { Router } from "express";
import { createCuidado, getCuidadosById, getCuidados, updateCuidados, deleteCuidadosById } from "../controllers/cuidadosController.js";

const router = Router();

router.get('/', getCuidados);
router.get('/:id', getCuidadosById);
router.post('/', createCuidado);    
router.put('/:id', updateCuidados);
router.delete('/:id', deleteCuidadosById);

export default router;
