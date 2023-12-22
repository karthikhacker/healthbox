import axios from 'axios';
import React, { useState, useEffect } from 'react'

const usefetch = (url) => {
    const [records, setRecords] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [lab_name, setLabName] = useState('');
    const [lab_owner_name, setLabOwnerName] = useState('');
    const [lab_contact_number, setLabContactNumber] = useState('');
    const [lab_address, setLabAddress] = useState('');
    const [lab_zipcode, setLabZipcode] = useState('');
    const [lab_location_lat, setLabLocationLat] = useState('');
    const [lab_location_lon, setLabLocationLon] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                let token;
                token = JSON.parse(localStorage.getItem('token'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get(url, config);
                setLoading(false);
                console.log(response.data);
                setRecords(response.data?.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setLabName(response.data.lab_name);
                setLabOwnerName(response.data.lab_owner_name);
                setLabContactNumber(response.data.lab_contact_number);
                setLabAddress(response.data.lab_address);
                setLabZipcode(response.data.lab_zipcode);
                setLabLocationLat(response.data.lab_location_lat);
                setLabLocationLon(response.data.lab_location_lon);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [url])
    return {
        records,
        username,
        email,
        lab_name,
        lab_owner_name,
        lab_contact_number,
        lab_address,
        lab_location_lat,
        lab_location_lon,
        loading
    }
}

export default usefetch