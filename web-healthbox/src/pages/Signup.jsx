import Logo from '../assets/healthbox-logo.jpg'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const { getLoading } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data);
        const userData = {
            data,
            navigate
        }
        dispatch(createUser(userData))
        reset();
    }
    return (
        <div className="card w-96 mx-auto py-2 px-2  shadow-xl">
            <div className='w-32 mx-auto mt-2'>
                <img src={Logo} />
            </div>
            <div className="card-body">
                <div className="text-center w-full mb-8 mx-auto">
                    <h2 className="text-center ml-2 font-semibold">
                        CREATE YOUR ACCOUNT
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="First name"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.first_name && 'input-error'}`}
                            {...register('first_name', {
                                required: 'First name is required!.',
                            })}
                        />
                        {errors.first_name && <span className='text-red-900 font-sans font-light'>{errors.first_name.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="Last name"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.last_name && 'input-error'}`}
                            {...register('last_name', {
                                required: 'Last name is required!.',
                            })}
                        />
                        {errors.last_name && <span className='text-red-900 font-sans font-light'>{errors.last_name.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="Mobile number"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.phone_number && 'input-error'}`}
                            {...register('phone_number', {
                                required: 'Mobile number is required!.',
                                pattern: {
                                    value: /^(0|91)?[6-9][0-9]{9}$/,
                                    message: 'Enter a valid phone number'
                                }

                            })}
                        />
                        {errors.phone_number && <span className='text-red-900 font-sans font-light'>{errors.phone_number.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <button className="btn btn-accent btn-md btn-wide w-full">
                            {getLoading ? <Loading /> : 'Continue'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup