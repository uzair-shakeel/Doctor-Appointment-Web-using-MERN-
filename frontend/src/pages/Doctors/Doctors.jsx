import React from 'react'
import {doctors} from './../../assets/data/doctors'
import DoctorsCard from './../../components/Doctors/DoctorsCard'
import Testimonial from './../../components/Testimonials/Testimonial'

const Doctors = () => {
  return (
    <>
    <section className='bg-[#fff9ea]'>
      <div className="container text-center">
        <h2 className="heading">
          Find a Doctor
        </h2>
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input type="search" className='py-4 pl-4 bg-transparent w-full focus:outline-none  placeholder:text-TextColor' placeholder='Search Doctor' />
          <button className="btn mt-0 rounded-[0px] rounded-r-md">Search</button>
        </div>
      </div>
    </section>

    <section>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] lg:grid-cols-4 mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorsCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>

    <section>
      <div className="container">
      <div className="mx-auto xl:w-[470px]">
          <h2 className='heading text-center'>What Our Patients Say</h2>
          <p className="paragraph text-center">World-Class care for everyone. Our health system offers unmatched,
          expert health care.</p>
        </div>
        <Testimonial />
      </div>
    </section>
    </>
  )
}

export default Doctors
