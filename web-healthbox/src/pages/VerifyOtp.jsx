import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userVerify } from '../features/authSlice';
import Loading from '../components/Loading';

const VerifyOtp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id, isLoading } = useSelector(state => state.auth);
    console.log(id);
    const onSubmit = (data) => {
        console.log(data);
        const userData = {
            otp: data.otp,
            userId: id,
            navigate
        }
        dispatch(userVerify(userData))
        reset
    }

    return (
        <div className="card w-96 mx-auto py-2 px-2  shadow-xl">
            <div className="card-body">
                <div className="flex items-center text-center w-32 mb-8 mx-auto">
                    <h2 className="text-center ml-2 font-bold">
                        Enter Otp
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <input
                            type="text"
                            placeholder="Enter Otp"
                            className={`input input-accent w-full max-w-xs mb-2 ${errors.phone_number && 'input-error'}`}
                            {...register('otp', {
                                required: 'otp is required!.'
                            })}
                        />
                        {errors.otp && <span className='text-red-900 font-sans font-light'>{errors.otp.message}</span>}
                    </div>
                    <div className='mb-4'>
                        <button className="btn btn-accent btn-md btn-wide  w-full">
                            {isLoading ? <Loading /> : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default VerifyOtp