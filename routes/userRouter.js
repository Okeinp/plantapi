import express from 'express';
import { getAllUsers, getUsersById, createUser, loginUser, updateUser, deleteUser, auth } from '../controllers/userController.js';

const router = express.Router();

// Rutas públicas
router.post('/register', createUser);
router.post('/login', loginUser);

// Rutas protegidas
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUsersById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

router.get('/auth/check', auth, (req, res) => {
    res.status(200).json({ message: "Autenticado" });
});

export default router;