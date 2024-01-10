import express from 'express';
import {authenticateToken, restrict }from '../middleware/authenticateToken.js';
import { getAllReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router({ mergeParams: true });

// Route to get all reviews
router.get('/', getAllReviews);

// Route to create a new review
router.post('/', authenticateToken, restrict(['patient']), createReview);

export default router;
