import express from 'express';
import { getAllUsers, getUsersById, createUser, loginUser, updateUser, deleteUser, auth } from '../controllers/userController.js';

const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);


router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUsersById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;