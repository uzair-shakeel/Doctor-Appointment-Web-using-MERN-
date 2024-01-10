import React, { useEffect, useState } from 'react'
import {token} from '../config'
import {toast} from 'react-toastify'

const UseFetchData = (url) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await fetch(url, {
                    headers:{Authorization: `Bearer ${token}`
                }})
                const result = await res.json()

                if(!res.ok){
                    throw new error(result.message)
                }
                setData(result.data)
                // toast.success(result.message)
            } catch (error) {
                return toast.error(result.message)
                setError(error.message)
            }
        }
        fetchData()
    }, [url])
  return {
    data,
    error
  }
}

export default UseFetchData
