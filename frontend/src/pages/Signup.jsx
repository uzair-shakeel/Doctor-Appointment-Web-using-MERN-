import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import signupImg from '../assets/images/signup.gif'
import avatar from './../assets/images/avatar-icon.png'
import convertToBase64 from '../utils/cloudinary'
import {toast} from 'react-toastify'

const Signup = () => {
  const [pic, setPic] = useState('')
  const navigate = useNavigate();  
  const handlePhoto = async(e) => {
    try {
      const file = e.target.files[0]
        const base64 = await convertToBase64(file);
        setPic(base64);
        
        setFormData(prevFormData => ({ ...prevFormData, photo: base64 }))
    } catch (error) {
        console.error("Error converting to Base64:");
    }
}
    // const [URL, setURL] = useState('')
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      photo: pic,
      gender:'',
      role:'patient'
    })
    
      const handleInput = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
        
      }



  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const {message} = await response.json();
  
      if (response.ok) {
        // console.log('User registered successfully:', message);
        toast.success(message)
        navigate('/login')
      } else{
        toast.error(message)
      }
  } catch(err){
    toast.error("Server not responding")
  }
}



  return (
    <section className='px-5 xl:px-0'>
      <div className='max-w-[970px] max-h-[850px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='hidden lg:block bg-Color rounded-l-lg'>
            <figure className='rounded-l-lg'>
              <img src={signupImg} alt="" />
            </figure>
          </div>

          <div className='rounded-l lg:pl-16 py-5'>
          <h3 className=' text-HeadingColor font-semibold text-[22px] pb-5 '>Create an <span className='text-Color'>Account</span></h3>
        <form action="" onSubmit={submitHandler}>
          <div className='my-4'>
            <input type="text" placeholder='Enter Your Full Name' name='name' value={formData.name} onChange={handleInput}
            required className='w-full px-4 py-3 focus:outline-none border-b border-solid focus:border-b-Color' />
          </div>
          <div className='my-4'>
            <input type="email" placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleInput}
            required className='w-full px-4 py-3 focus:outline-none border-b border-solid focus:border-b-Color' />
          </div>
          <div className='my-4'>
            <input type="password" placeholder='Enter Your Password' name='password' value={formData.password} onChange={handleInput}
            required className='w-full px-4 py-3 focus:outline-none border-b border-solid focus:border-b-Color' />
          </div>

          <div className='flex items-center justify-between mb-3'>
            <label htmlFor="" className='text-TextColor text-[15px] font-semibold leading-7 px-4'>
              Are you a 
              <select name="role" value={formData.role} onChange={handleInput} className='text-TextColor text-[15px] leading-7 px-4 py-3 focus:outline-none' >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>
            <label htmlFor="" className='text-TextColor font-bold text-[15px] leading-7 px-4'>
              Gender 
              <select name="gender" value={formData.gender} onChange={handleInput} className='text-TextColor  text-[15px] leading-7 px-4 py-3 focus:outline-none' >
                <option value="select">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className='mb-1 flex items-center gap-3'>
            {pic && <figure className='w-[45px] h-[45px] rounded-full border-2 border-solid border-Color  flex items-center justify-center '>
              <img src={avatar} alt="" className='w-full rounded-full' />
            </figure>}

            <div className='relative w-[120px] h-[40px]'>
              <input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
              type="file" name='photo' id='customFile' accept='.png, .jpg, .jpeg' onChange={handlePhoto} />
            
              <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center
              px-[.75rem] py-[.375rem] text-center text-[15px] leading-6 overflow-hidden cursor-pointer text-HeadingColor font-semibold rounded-lg truncate bg-blue-100' >Upload Photo</label>
            </div>
          </div>

          <div>
            <button className="btn w-full rounded-md">Register</button>
          </div>

          <p className='text-center paragraph'>lready have an account? <Link to='/login' className='font-semibold text-TextColor' >Login here</Link></p>
        </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
