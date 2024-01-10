import React from 'react'

const Error = ({errMsg}) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <h3 className='text-HeadingColor text-[20x] leading-[30px] font-semibold'>{errMsg}</h3>
    </div>
  )
}

export default Error
