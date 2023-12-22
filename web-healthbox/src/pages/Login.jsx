import React, { useEffect } from 'react';
import Logo from '../assets/healthbox-logo.jpg'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { userAuth } from '../features/authSlice';
import Loading from '../components/Loading';

const Login = () => {
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const userData = {
            data,
            navigate
        }
        dispatch(userAuth(userData));
        reset();
    }

    return (
        <div className="card w-96 mx-auto py-2 px-2  shadow-xl">
            <div className='w-32 mx-auto mt-2'>
                <img src={Logo} />
            </div>
            <div className="card-body">
                <div className="flex items-center text-center w-20 mb-8 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-center ml-2">
                        LOGIN
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="Mobile number"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.phone_number && 'input-error'}`}
                            {...register('phone_number', {
                                required: 'Mobile number is required!.'
                            })}
                        />
                        {errors.phone_number && <span className='text-red-900 font-sans font-light'>{errors.phone_number.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <button className="btn btn-accent btn-md btn-wide w-full">
                            {loading ? <Loading /> : 'Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login