import express from 'express';
import {authenticateToken, restrict }from '../middleware/authenticateToken.js';
import { getAllUsers, getSingleUser, deleteUser, updateUser, getUserProfile, getMyAppointments } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', authenticateToken, restrict(['admin']), getAllUsers);
router.get('/users/:id', authenticateToken, restrict(['patient']), getSingleUser);
router.get('/profile/me', authenticateToken, restrict(['patient']), getUserProfile);
router.get('/appointments/my-appointments', authenticateToken, restrict(['patient']), getMyAppointments);
router.delete('/users/:id', authenticateToken, restrict(['patient']), deleteUser);
router.put('/users/:id', authenticateToken, restrict(['patient']), updateUser);

export default router;