import { getProfile } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const [first_name, setFirstName] = useState(user && user?.first_name || "");
    const [last_name, setLastName] = useState(user && user?.last_name || "");
    const [email, setEmail] = useState(user && user?.email || "");
    const navigate = useNavigate()
    let token;

    useEffect(() => {
        token = JSON.parse(localStorage.getItem('user-token'));
        dispatch(getProfile(token));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        token = JSON.parse(localStorage.getItem('user-token'));
        const userData = {
            first_name,
            last_name,
            email
        }
        if (token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/update/profile`, userData, config);
                console.log(response.data)
                toast.success(response.data?.message);
                navigate('/profile');
            } catch (e) {
                if (e.response) {
                    toast.error(e.response?.data?.message)
                }
            }
        }
    }
    return (
        <div className="card w-96 mx-auto py-2 px-2  shadow-xl">
            <div className="card-body">
                <div className="text-center w-full mb-8 mx-auto">
                    <h2 className="text-center ml-2 font-semibold">
                        UPDATE YOUR ACCOUNT
                    </h2>
                </div>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <input
                            type="text"
                            defaultValue={user?.first_name || first_name}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder={user?.first_name || 'First name'}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            defaultValue={user?.last_name || last_name}
                            onChange={e => setLastName(e.target.value)}
                            placeholder={user?.last_name || 'Last  name'}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            type="text"
                            defaultValue={user?.email || email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={user?.email || 'Email'}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <button className='btn btn-accent w-full mt-4'>
                        SUbmit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile