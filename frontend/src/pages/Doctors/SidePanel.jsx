import React from 'react'

const SidePanel = () => {
  return (
    <div className='shadow-2xl p-3 lg:p-5 rounded-md'>
      <div className="flex items-center justify-between">
        <p className="paragraph mt-0 font-semibold">
        Booking Price
        </p>
        <span className='text-[16px] leading-7 lg:text-[22px] text-HeadingColor font-bold'>Rs. 2500/-</span>
      </div>

        <div className="mt-[36px]">
            <p className="paragraph mt-0 font-semibold">
                Available Time Slots
            </p>
            <ul className='mt-3'>
                <li className="flex items-center justify-between mb-2">
                    <p className="text-[15px] leading-6 text-TextColor font-semibold">Monday</p>
                    <p className="text-[15px] leading-6 text-TextColor font-semibold">07:00 PM - 11:00 PM</p>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <p className="text-[15px] leading-6 text-TextColor font-semibold">Wednesday</p>
                    <p className="text-[15px] leading-6 text-TextColor font-semibold">07:00 PM - 11:00 PM</p>
                </li>
                <li className="flex items-center justify-between mb-2">
                    <p className="text-[15px] leading-6 text-TextColor font-semibold">Friday</p>
                    <p className="text-[15px] leading-6 text-TextColor font-semibold">07:00 PM - 11:00 PM</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SidePanel
