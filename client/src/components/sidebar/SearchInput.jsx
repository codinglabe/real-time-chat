import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import useConversation from '../../store/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [serach, setSearch] = useState("")
  const { convertations } = useGetConversations()
  const { setSelectedConversation } = useConversation()
  const handleSubmit = (e) => {
    e.preventDefault();
    if(serach.length < 3){
      toast.error("Search must be at least 3 characters")
      return;
    }
    const conversation = convertations?.find((c)=> c.fullName.toLowerCase().includes(serach.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation)
      setSearch("")
    }else toast.error("User not found")
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input type="text" name="" id="" className="input input-bordered w-full max-w-xs" onChange={(e)=>setSearch(e.target.value)} />
        <button type="submit" className="btn btn-circle bg-sky-500">
            <MagnifyingGlassIcon className="w-5 h-5 text-white"/>
        </button>
    </form>
  )
}

export default SearchInput