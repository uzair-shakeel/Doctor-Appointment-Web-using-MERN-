import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';


// Get all users (both patients and doctors)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, data: { users } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get a single user by ID
export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id)
        .then(res.status(200).json({ success: true, message: 'User deleted successfully' }));
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, photo, gender, bloodType, role } = req.body;
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.photo = photo || user.photo;
        user.gender = gender || user.gender;
        user.role = role || user.role;
        user.bloodType = bloodType || user.bloodType

        await user.save();
        res.status(200).json({ success: true, message: "User Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export const getUserProfile = async(req, res) => {
  const userId = req.userId;
  
  try {
    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({success: false, message: "User not found"})
    }
    const {password, ...rest} = user._doc
    
    res.status(200).json({success:true, message: "Getting Profile Data", data:{ ...rest}})
} catch (error) {
    return res.status(500).json({success: false, message: "Something Went Wrong"})
    
  }
} 

export const getMyAppointments = async(req, res) => {
    try {
    const bookings = await Booking.find({user:req.userId})
    
    const doctorIds = bookings.map(el=>el.doctor.id)
    
    const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

    res.status(200).json({success:true, message: 'Getting Appointments', data:doctors})
} catch (error) {
    res.status(500).json({success:false, message: 'Something went wrong'})
    
    }
}