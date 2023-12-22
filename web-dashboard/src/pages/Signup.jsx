import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/healthbox-logo.jpg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { labSignupCall } from '../utils/api'
import Loading from '../components/Loading';

const Signup = () => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleZipcode = async (e) => {
        try {
            // console.log(e.target.value);
            const zipcode = e.target.value;
            const response = await axios.get(`https://geocode.maps.co/search?q=${zipcode}`);
            // console.log(response.data);
            if (response.data) {
                response?.data?.map(c => {
                    setLat(c.lat)
                    setLon(c.lon)
                })
            }
        } catch (error) {
            return error
        }

    }
    const onSubmit = (data) => {
        const { username, email, password, lab_name, lab_owner_name, lab_contact_number, address, lab_zipcode } = data;
        const labData = {
            username,
            email,
            password,
            lab_name,
            lab_owner_name,
            lab_contact_number,
            lab_address: address,
            lab_zipcode,
            lab_location_lat: lat,
            lab_location_lon: lon
        }
        setLoading(true);
        labSignupCall(labData, navigate)
        setLoading(false);
        reset()
    }
    console.log(loading);
    return (
        <div className="card w-[900px] mx-auto py-2 px-4  shadow-xl mt-[120px]">
            <div className='w-32 mx-auto mt-2 mb-4'>
                <img src={Logo} />
            </div>
            <h2 className='text-center'>CREATE ACCOUNT</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
                <div className='flex  justify-between'>
                    <div className='w-[450px] shadow-lg mr-2 px-4'>
                        <div className='mb-4'>
                            <input
                                type="text"
                                className={`input input-accent w-full input-sm ${errors.username && 'input-error'}`}

                                placeholder='Username'
                                {...register('username', {
                                    required: 'Username is required.'
                                })}
                            />
                            {errors.username && <span className='text-red-900 font-sans font-light'>{errors.username.message}</span>}

                        </div>
                        <div className='mb-4'>
                            <input
                                type="text"
                                className={`input input-accent w-full input-sm ${errors.email && 'input-error'}`}
                                placeholder='email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Invalid email address'
                                    }

                                })}
                            />
                            {errors.email && <span className='text-red-900 font-sans font-light'>{errors.email.message}</span>}
                        </div>
                        <div className='mb-4'>
                            <input
                                type="password"
                                className={`input input-accent w-full input-sm ${errors.password && 'input-error'}`}
                                placeholder='Password'
                                {...register('password', {
                                    required: 'Password is required!.'
                                })}
                            />
                            {errors.password && <span className='text-red-900 font-sans font-light'>{errors.password.message}</span>}
                        </div>
                        <div className='mb-4'>
                            <input
                                type="text"
                                className={`input input-accent w-full input-sm ${errors.lab_name && 'input-error'}`}
                                placeholder='Lab name'
                                {...register('lab_name', {
                                    required: 'Lab name is required'
                                })}
                            />
                            {errors.lab_name && <span className='text-red-900 font-sans font-light'>{errors.lab_name.message}</span>}
                        </div>
                        <div className='mb-4'>
                            <input
                                type="text"
                                className={`input input-accent w-full input-sm ${errors.lab_owner_name && 'input-error'}`}
                                placeholder='Lab owner name'
                                {...register('lab_owner_name', {
                                    required: 'Lab owner name is required!.'
                                })}
                            />
                            {errors.lab_owner_name && <span className='text-red-900 font-sans font-light'>{errors.lab_owner_name.message}</span>}
                        </div>
                    </div>
                    <div className="w-[450px] shadow-lg px-4">
                        <div className='mb-4'>
                            <input
                                type="text"
                                className={`input input-accent w-full input-sm ${errors.lab_contact_number && 'input-error'}`}
                                placeholder='Contact number'
                                {...register('lab_contact_number', {
                                    required: 'Contact number is required!.'
                                })}
                            />
                            {errors.lab_contact_number && <span className='text-red-900 font-sans font-light'>{errors.lab_contact_number.message}</span>}
                        </div>
                        <div className='mb-4'>
                            <textarea
                                className={` textarea w-full textarea-accent ${errors.address && 'textarea-error'}`}
                                placeholder='Lab address'
                                {...register('address', {
                                    required: 'Address is required.'
                                })}>
                            </textarea>
                            {errors.address && <span className='text-red-900 font-sans font-light'>{errors.address.message}</span>}
                        </div>
                        <div className='mb-4'>
                            <input
                                type="text"

                                className={`input input-accent w-full input-sm ${errors.lab_zipcode && 'input-error'}`}
                                placeholder='Zipcode'
                                {...register('lab_zipcode', {
                                    required: 'Zipcode is required!.'
                                })}
                                onChange={handleZipcode}
                            />
                            {errors.lab_zipcode && <span className='text-red-900 font-sans font-light'>{errors.lab_zipcode.message}</span>}
                        </div>
                    </div>
                </div>
                <div className='w-32 m-auto mb-4'>
                    <button className='btn btn-neutral btn-md mt-4 btn-block'>
                        {loading ? <Loading /> : 'SUBMIT'}
                    </button>
                </div>
            </form>
            <div className='w-full text-center'>
                <span>Already have an account ?  <NavLink to="/" className="text-green-500">Login here</NavLink></span>
            </div>
        </div>
    )
}

export default Signup