import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    try {
        const req = await fetch("/api/auth/logout",{
            method: "POST",
            headers:{"Content-Type": "application/json"}
        })
        const res = await req.json();
        if(res.error){
            throw new Error(res.error)
        }
        localStorage.removeItem("_token");
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  };
  return {logout, loading}
};

export default useLogout;
