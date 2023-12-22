import Loading from "../components/Loading";
import usefetch from "../utils/usefetch"
import GoogleMapReact from 'google-map-react';



const LabProfile = () => {
    const {
        username,
        email,
        lab_name,
        lab_owner_name,
        lab_contact_number,
        lab_address,
        lab_location_lat,
        lab_location_lon, loading } = usefetch(`${import.meta.env.VITE_BASE_URL}/lab/profile`);
    if (loading) return <Loading />
    let center = [0, 0]
    return (
        <div >
            <div className="card w-96 bg-base-100 ml-4 mt-4 shadow-xl">
                <figure><img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Lab name - {lab_name}</h2>
                    <p className="text-gray-600">Owner name - {lab_owner_name}</p>
                    <p className="text-gray-600">Address - {lab_address}</p>
                    <p className="text-gray-600">Contact number - {lab_contact_number}</p>
                    <p className="text-gray-600">Email - {email}</p>
                </div>
            </div>
            <div className="w-full h-96">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDxiy9jtzEXMvBZiGxkIFcQyZ_xC2hyoTs' }}
                    defaultCenter={center}
                    defaultZoom={14}
                >

                </GoogleMapReact>
            </div>
        </div>

    )
}

export default LabProfile