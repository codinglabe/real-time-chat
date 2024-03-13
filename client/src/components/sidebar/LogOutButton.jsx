import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import useLogout from '../../hooks/useLogout'

const LogOutButton = () => {
  const {logout, loading} = useLogout();
  return (
    <div className="mt-auto">
        <ArrowLeftStartOnRectangleIcon onClick={logout} className=" w-6 h-6 text-white cursor-pointer mt-3"/>
    </div>
  )
}

export default LogOutButton