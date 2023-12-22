import axios from "axios";

export const fetchGeoLocation = async (zipcode) => {
    try {
        const response = await axios.get(`https://geocode.maps.co/search?q=${zipcode}`)
        console.log(response.data)
        return response.data;
    } catch (error) {
        return error;
    }

}