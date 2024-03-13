import React from 'react'
import SearchInput from './SearchInput'
import Convertations from './Convertations'
import LogOutButton from './LogOutButton'

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput/>
        <div className="divider px-3"></div>
        <Convertations/>
        <LogOutButton/>
    </div>
  )
}

export default Sidebar