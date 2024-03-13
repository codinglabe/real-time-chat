import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
const useSignUp = () => {
    const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false)
  const signup = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputsError({fullName, username, password, confirmPassword, gender})
    if(!success) return;
    setLoading(true);
    try {
        const request = await fetch("/api/auth/registration",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        })
        const response = await request.json();
        if(!response.success){
            toast.error(response.message);
        }
        if(response.error){
            throw new Error(response.error);
        }
        console.log(response)
        localStorage.setItem("_token", JSON.stringify(response.user));
        setAuthUser(response.user)
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
  }

  return {loading, signup}
}

export default useSignUp

function handleInputsError({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in the all fields")
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password not match");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;
}