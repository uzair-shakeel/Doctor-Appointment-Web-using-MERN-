import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const authenticateToken = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers.authorization; // Assuming token is in the format "Bearer <token>"

    // Check if token is present and formatted correctly
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        // Extract the token without the "Bearer " prefix
        const actualToken = token.split(' ')[1];

        // Verify the token using your secret key
        const decoded = jwt.verify(actualToken, process.env.YOUR_SECRET_KEY); // Replace 'YOUR_SECRET_KEY' with your actual secret key

        // Attach the decoded payload to the request object for use in subsequent middleware or routes
        req.userId = decoded.userId;
        req.role = decoded.role;

        const userId = req.userId
        console.log({message: userId})

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token Expired' });
        }
        console.error(error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const restrict = (roles) => async (req, res, next) => {
    try {
        const userId = req.userId;
        
        // Retrieve the user from either the User or Doctor model
        let user = await User.findById(userId);
        if (!user) {
            user = await Doctor.findById(userId);
        }

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user's role is authorized
        if (!roles.includes(user.role)) {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }

        // Proceed to the next middleware or route handler
        next();
    } 
    catch (error) {
        console.error('Restrict middleware error:');
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
