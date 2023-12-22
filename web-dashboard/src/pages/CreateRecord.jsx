import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from 'axios';
import Loading from "../components/Loading";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CreateRecord = () => {
    const [files, setFiles] = useState(['files']);
    const [imageLoading, setImageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleChange = async (e) => {
        let token = JSON.parse(localStorage.getItem('token'));
        let formData = new FormData();
        for (const key of Object.keys(e.target.files)) {
            formData.append('files', e.target.files[key]);
        }
        try {
            setImageLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/report/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res.data);
            setFiles([...res.data]);
            setImageLoading(false);
        } catch (e) {
            toast.error(e?.response?.data?.message)
            setImageLoading(false)
        }
    }

    const onSubmit = async (data) => {
        const { first_name, last_name, phone_number } = data;
        let token = JSON.parse(localStorage.getItem('token'));

        const patientRecordData = {
            first_name,
            last_name,
            phone_number,
            results: files.length > 0 && files
        }
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/create/record`, patientRecordData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            toast.success(res.data?.message);
            setLoading(false)
            navigate('/dashboard/records')
        } catch (e) {
            toast.error(e?.response?.data?.message);
            setLoading(false);
        }
        reset();
    }
    console.log(files);
    return (
        <div className='px-8 py-8 m-0'>
            <h2 className='text-center text-gray-400'>CREATE PATIENT RECORD</h2>
            <div className=' w-full mt-10'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" w-[950px] m-auto  flex  justify-between">
                        <div className="shadow-lg bg-white p-4 grow mr-2">
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className={`px-2 py-2 border border-gray-400 outline-0  w-full   ${errors.first_name && 'input-error'}`}
                                    {...register('first_name', {
                                        required: 'First name is required'
                                    })}
                                />
                                {errors.first_name && <span className='text-red-900 font-sans font-light'>{errors.first_name.message}</span>}
                            </div>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    className={`py-2 px-2 w-full  outline-0 border border-gray-400 ${errors.last_name && 'input-error'}`}
                                    {...register('last_name', {
                                        required: 'Last name is required'
                                    })}
                                />
                                {errors.last_name && <span className='text-red-900 font-sans font-light'>{errors.last_name.message}</span>}
                            </div>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Mobile number"
                                    className={`py-2 px-2 w-full  outline-0 border border-gray-400 ${errors.phone_number && 'input-error'}`}
                                    {...register('phone_number', {
                                        required: 'Mobile number is required!.',
                                        pattern: {
                                            value: /^[6789]\d{9}$/,
                                            message: 'Enter a valid phone number'
                                        }

                                    })}
                                />
                                {errors.phone_number && <span className='text-red-900 font-sans font-light'>{errors.phone_number.message}</span>}
                            </div>
                        </div>
                        <div className="shadow-lg bg-white p-4 w-[400px]">
                            <input
                                type="file"
                                onChange={handleChange}
                                className=" file-input file-input-bordered file-input-primary w-full"
                                multiple
                                accept="application/pdf"
                            />
                            {errors.reportsFile && <span className='text-red-900 font-sans font-light'>{errors.reportsFile.message}</span>}
                            <div className="mt-10">
                                {imageLoading && <Loading />}
                            </div>
                        </div>
                    </div>
                    <div className="w-52 m-auto mt-8 ">
                        <button
                            className="btn btn-neutral btn-wide"
                        >
                            {loading ? <Loading /> : 'SUBMIT'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRecord