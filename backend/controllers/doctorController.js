import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const {query} = req.query;
        let doctors

        if(query){
            doctors = await Doctor.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: 'i'}},
                    { specialization: { $regex: query, $options: 'i'}},
                ]
            }).select('-password')
        } else{
            doctors = await Doctor.find({isApproved: 'approved'}).select("-password");
        }
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get a single doctor by ID
export const getSingleDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id).populate('reviews').select("-password");
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Delete a doctor by ID
export const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByIdAndDelete(id)
        .then(res.status(200).json({ success: true, message: 'Doctor deleted successfully' }));
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        ;
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Update a doctor by ID
export const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, email, photo, gender, specialization } = req.body;
    try {
        let doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        doctor.name = name || doctor.name;
        doctor.email = email || doctor.email;
        doctor.photo = photo || doctor.photo;
        doctor.gender = gender || doctor.gender;
        doctor.specialization = specialization || doctor.specialization;

        await doctor.save();
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



export const getDoctorProfile = async(req, res) => {
    const doctorId = req.userId;
    
    try {
      const doctor = await Doctor.findById(doctorId)
  
      if(!user){
          return res.status(404).json({success: false, message: "Doctor not found"})
      }
      const {password, ...rest} = doctor._doc
      const appointments = await Booking.find({ doctor: doctorId})
      
      res.status(200).json({success:true, message: "Getting Profile Data", data:{ ...rest, appointments}})
  } catch (error) {
      return res.status(500).json({success: false, message: "Something Went Wrong"})
      
    }
  } 