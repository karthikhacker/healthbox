import React from 'react'
import Logo from '../assets/healthbox-logo.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/authSlice'

const Navigation = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/");
    }
    return (
        <div className="navbar shadow-lg bg-base-100 px-4 py-4">
            <div className='flex-1 justify-between'>
                <div className='w-[70px]'>
                    <NavLink to="/dashboard/home">
                        <img src={Logo} className='w-full' />
                    </NavLink>
                </div>
                <ul className='flex items-center'>
                    <li className=' mr-8 uppercase'>
                        <NavLink to="/dashboard/lab/profile" className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                            </svg>
                            {user?.username}
                        </NavLink>
                    </li>
                    <li className='cursor-pointer' onClick={handleLogout}>LOGOUT</li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation