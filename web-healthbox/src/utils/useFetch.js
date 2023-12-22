import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let token = JSON.parse(localStorage.getItem('user-token'));
    const fetchReports = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const res = await axios.get(url, config);
            setLoading(false)
            setReports(res.data.data?.results);
        } catch (error) {
            if (error.response) {
                setLoading(false);
                setError(error.response?.data)
            }
        }

    }
    useEffect(() => {
        fetchReports()
    }, [])
    return {
        reports,
        loading,
        error
    }
}

export default useFetch