import usefetch from "../utils/usefetch"
import Loading from '../components/Loading';

const Records = () => {
    const { records, loading } = usefetch(`${import.meta.env.VITE_BASE_URL}/records`);
    console.log(records);
    if (loading) {
        return (
            <div className="w-32 mx-auto my-[200px]">
                <Loading />
            </div>
        )
    }

    const renderData = () => {
        return (
            <div className="overflow-x-auto">
                <table className="table table-zebra table-xs">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 && records.map(rec => (
                            <tr key={rec._id}>
                                <th>{rec._id}</th>
                                <th>{rec.first_name}</th>
                                <th>{rec.last_name}</th>
                                <th>{rec.phone_number}</th>
                                <th>
                                    <button className="btn btn-sm btn-accent">Edit</button>
                                </th>
                                <th>
                                    <button className="btn btn-sm  btn-error">Delete</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div className='my-4 text-center'>
            {records.length < 1 && (
                <div>
                    <h2>NO RECORDS FOUND.</h2>
                </div>
            )}
            {records.length > 0 && renderData()}

        </div >
    )
}

export default Records