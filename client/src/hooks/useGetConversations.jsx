import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [convertations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const req = await fetch("/api/auth/convertations");
        const res = await req.json();
        if (req.error) {
          throw new Error(req.error);
        }
        setConversations(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { convertations, loading };
};

export default useGetConversations;
