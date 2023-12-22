import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../features/authSlice';
import Loading from '../components/Loading';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../features/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, profileLoading } = useSelector(state => state.auth);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user-token'));
        //  console.log(token);
        if (token !== undefined) {
            dispatch(getProfile(token));
        } else {
            navigate('/')
        }
    }, [])
    if (profileLoading) {
        return (
            <div className='my-[250px]'>
                <Loading />
            </div>
        )
    }
    return (
        <div className="card card-compact w-96 mx-8 bg-base-100 shadow-xl">
            <figure><img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="User" /></figure>
            <div className="card-body">
                <h2 className="card-title">{user !== null && user?.first_name} {user !== null && user?.last_name}</h2>
                <p>{user !== null && user?.phone_number}</p>
                <p>{user !== null && user?.email === '' ? 'Email not addded' : user?.email}</p>
                <div className="card-actions justify-start mt-4">
                    <NavLink to="/update/profile">
                        <button className="btn btn-primary btn-sm">
                            update profile
                        </button>
                    </NavLink>

                </div>
            </div>
        </div>
    )
}

export default Profile