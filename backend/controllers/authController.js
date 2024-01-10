import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';

const generateToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, process.env.YOUR_SECRET_KEY,{expiresIn :'15d'} )
}

export const register = async (req, res) => {
    const { name, email, password, photo, role, gender } = req.body;

    try {
        let userExists = null;

        if (role === 'patient') {
            userExists = await User.findOne({ email });
        } else if (role === 'doctor') {
            userExists = await Doctor.findOne({ email });
        }

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User Already Exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;

        if (role === 'patient') {
            newUser = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        } else if (role === 'doctor') {
            newUser = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }

        await newUser.save();
        res.status(201).send({ success: true, message: 'User registered successfully'});

    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ success: false, message: 'Server Error' });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        }

        if (doctor) {
            user = doctor;
        }

        if (!user) {
            return res.status(400).json({ success: false, message: 'User Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        const token = generateToken(user);

        
        // Set cookie in the response
        res.cookie('token', token, {
            httpOnly: true,
            // Add other cookie options if needed
        });


        // Destructure user properties, excluding sensitive ones
        const { password: _, role, appointments, ...rest } = user._doc;

        res.send({ success: true, message: 'Login successful', token, data: { ...rest }, role });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
