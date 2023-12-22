import axios from 'axios';
import { toast } from 'react-toastify';

export const postPatientCall = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/create/record`, data);
        console.log(response)
        return response.data
    } catch (error) {
        if (error.response) {
            console.log(error)
            return error.response.data
        }
    }
}

export const labSignupCall = async (data, navigate) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/lab/signup`, data);
        if (response.data) {
            toast.success(response.data?.message)
            navigate('/')
        }
    } catch (e) {
        if (e.response) {
            toast.error(e.response?.data?.message)
        }
    }
}