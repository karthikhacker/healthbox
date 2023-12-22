import React from 'react'
import Logo from '../assets/healthbox-logo.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { token, error } = useSelector(state => state.auth);
    console.log(token, error);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const userData = {
            data,
            navigate
        }
        dispatch(loginUser(userData));
        reset();
    }
    return (
        <div className="card w-[400px] mx-auto py-2 px-2  shadow-xl mt-[120px]">
            <div className='w-32 mx-auto mt-2'>
                <img src={Logo} />
            </div>
            <div className="card-body">
                <div className="flex items-center text-center w-32 mb-8 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-center ml-2">
                        LAB LOGIN
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="Username"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.username && 'input-error'}`}
                            {...register('username', {
                                required: 'Username is required!'
                            })}
                        />
                        {errors.username && <span className='text-red-900 font-sans font-light'>{errors.username.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <input
                            type="password"
                            placeholder="Pasword"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.password && 'input-error'}`}
                            {...register('password', {
                                required: 'Password is required!'
                            })}
                        />
                        {errors.password && <span className='text-red-900 font-sans font-light'>{errors.password.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <button className="btn btn-accent btn-md btn-wide w-full text-white text-lg">
                            {loading ? <Loading /> : 'Login'}
                        </button>
                    </div>
                    <div>
                        <span>Dont have an account ?  <NavLink to="/signup" className="text-green-500">create account here</NavLink></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login