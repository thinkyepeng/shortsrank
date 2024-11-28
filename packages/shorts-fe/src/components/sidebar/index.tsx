import { useSelector } from 'react-redux'
import './sidebar.css'
import { RootState } from '@/stores'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.profile)
  return (
    <div   className="sidebar-1">
      <div  className="sidebar-2">
        <img
          alt=""
          src={user.avatar}
          className="sidebar-3 w-[38px] h-[38px] rounded"
        />
        <ul  className="sidebar-4">
          <li  className="sidebar-5">{user.nickname}</li>
          <li  className="sidebar-6">UID:{user.username}</li>
        </ul>
      </div>
      <div  className="sidebar-7">
        <span  className="sidebar-8">Account Balance</span>
        <div  className="sidebar-9">
          <i  className="sidebar-10"></i><span  className="sidebar-11">{user.balance}</span><span  className="sidebar-12">coins</span>
        </div>
        <Link to='/payment' className="sidebar-13">Top Up</Link>
      </div>
      <div  className="sidebar-14">
        <svg
          
          height="21"
          viewBox="0 -960 960 960"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
          className="sidebar-15"
        >
          <path
            
            d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
            fill="white"
            className="sidebar-16"
          ></path>
        </svg>
        <Link to="/user-center" className="sidebar-17">History</Link>
      </div>
    </div>
  )
}