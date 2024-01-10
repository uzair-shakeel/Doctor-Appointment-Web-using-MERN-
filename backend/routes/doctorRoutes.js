import express from 'express';
import {authenticateToken, restrict }from '../middleware/authenticateToken.js';
import reviewRoutes from './reviewRoutes.js';
import { getAllDoctors, getSingleDoctor, deleteDoctor, updateDoctor, getDoctorProfile} from '../controllers/doctorController.js';

const router = express.Router();

router.use('/doctors/:doctorId/reviews', reviewRoutes);
// Route to get all doctors
router.get('/doctors',  authenticateToken, restrict(['doctor']), getAllDoctors);

// Route to get a single doctor by ID
router.get('/doctors/:id', getSingleDoctor);
router.get('/profile/me', getDoctorProfile);

// Route to delete a doctor by ID
router.delete('/doctors/:id', authenticateToken, restrict(['doctor']), deleteDoctor);

// Route to update a doctor by ID
router.put('/doctors/:id', authenticateToken, restrict(['doctor']), updateDoctor);

export default router;
