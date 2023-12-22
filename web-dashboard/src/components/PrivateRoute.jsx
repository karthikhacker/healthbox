import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    return token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute