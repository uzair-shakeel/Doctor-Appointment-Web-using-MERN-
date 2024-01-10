import React, {useContext, useState} from 'react'
import {AuthContext} from '../../context/authContext'
import profile from '../../assets/images/profile.png'
import Bookings from './Bookings'
import Profile from './Profile'
import userGetProfile from '../../hooks/UseFetchData'
import { token } from '../../config'
import { BASE_URL } from '../../config'
import Error from '../../error/Error'
import {toast} from 'react-toastify'

const MyAccount = () => {
  const {user, dispatch} = useContext(AuthContext)
  const [tab, setTab] = useState('bookings')  
  const {error, data:userData} = userGetProfile(`${BASE_URL}/user/profile/me`)
  console.log(userData)
  
  const deleteAccount = async()=> {
    try {
      const response = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const {message} = await response.json();
  
      if (response.ok) {
        dispatch({ type: "LOGOUT"})
        toast.success(message)
        
      } else{
        toast.error(message)
      }
  } catch(err){
    toast.error("Server not responding")
    
  }

  }
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT"})
  }
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>

        {error && <Error errMsg={error} />}
      {!error && <div className='grid md:grid-cols-3 gap-10'>
        <div className='py-[50px] px-[30px] rounded-md'>
          <div className='flex items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-Color'>
              <img src={user.photo ||profile} alt="" className='w-full h-full rounded-full' />
            </figure>
          </div>

          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-HeadingColor font-bold'>{user.name}</h3>
            <p className="text-TextColor text-[15px] leading-6 font-medium">{user.email}</p>
            <p className="text-TextColor text-[15px] leading-6 font-medium">Blood Group: {user.bloodType}</p>
          </div>

          <div className='mt-[50px] md:mt-[70px]'>
            <button onClick={handleLogout} className='w-full my-3 bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
            <button onClick={deleteAccount} className='w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
          </div>
        </div>

        <div className='md:col-span-2 md:px-[30px] '>
          <div>
            <button onClick={() => setTab('bookings')} className={`${tab==='bookings' && 'bg-Color text-white font-bold'} p-2 mr-5 px-5 rounded-md text-HeadingColor font-semibold text-[16px] leading-7 border border-solid border-Color`}>My Bookings</button>
            <button onClick={() => setTab('settings')} className={`${tab==='settings' && 'bg-Color text-white font-bold'} p-2 mr-5 px-5 rounded-md text-HeadingColor font-semibold text-[16px] leading-7 border border-solid border-Color`}>Profile Settings</button>
          </div>
          {tab==='bookings' && <Bookings />}
          {tab==='settings' && <Profile user={userData}/>}
        
        </div>
      </div>}
    </div>
    </section>
  )
}

export default MyAccount
