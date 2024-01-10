import React from 'react'
import UseFetchData from '../../hooks/UseFetchData'
import { BASE_URL } from '../../config'
import DoctorCard from '../../components/Doctors/DoctorsCard'

const Bookings = () => {
  const {data: appointments} = UseFetchData(`${BASE_URL}/user/appointments/my-appointments`);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 ga5'>
      {appointments.map(doctor => (
        <DoctorCard doctor={doctor} key={doctor._id} />
      ))}

      {appointments.length === 0 && (
        <h2 className='my-3 text-center'>You didn't have any appointments.</h2>
      )}
    </div>
  )
}

export default Bookings
