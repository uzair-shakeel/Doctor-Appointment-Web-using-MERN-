import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ success: true, message: 'Successful', data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createReview = async (req, res) => {
    try {
        // Extract data from the request
        if(!req.body.doctor) req.body.doctor = req.params.doctorId
        if(!req.body.user) req.body.user = req.userId
        // Validate request body
        
        // Create a new review instance
        const newReview = new Review(req.body);

        try {
            const savedReview = await newReview.save();
            await Doctor.findByIdAndUpdate(req.body.doctor, {
                $push: { reviews: savedReview._id }
            }).then(res.status(201).json({ success: true, message: 'Review submitted successfully', data: savedReview }))
            .catch(err => console.log(err))
            
        } catch (error) {
            
        }
        // Save the new review to the database

        // Update the corresponding doctor document with the new review

        // Send a success response
        
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
