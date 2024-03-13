import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
    const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const login = async ({username, password}) => {
    const success = handleInputsError({username, password})
    if(!success) return;
    setLoading(true);
    try {
        const req = await fetch("/api/auth/login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username:username, password:password}),
        })
        const res = await req.json();
        if(res.error){
            throw new Error(res.error)
        }
        if(res.success){
            localStorage.setItem("_token", JSON.stringify(res.user))
            setAuthUser(res.user)
        }
    } catch (error) {
        toast.error(error.message)
    }finally {
        setLoading(false);
    }
  }
  return { login, loading}
}

export default useLogin

function handleInputsError({username, password}){
    if(!username || !password ){
        toast.error("Please fill in the all fields")
        return false;
    }
    
    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}