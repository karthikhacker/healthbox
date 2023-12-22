import useFetch from "../utils/useFetch"
import Loading from '../components/Loading';

const Reports = () => {
    const { reports, loading, error } = useFetch(`${import.meta.env.VITE_BASE_URL}/report`);
    console.log(reports)

    if (loading) {
        return (
            <div className="my-[200px]">
                <Loading />
            </div>
        )
    }
    const showMessage = () => {
        return (
            <div className="mt-[200px]">
                {reports.length < 1 && (
                    <div className="w-32 mx-auto">
                        <img className="mask mask-heart" src="https://daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.jpg" />
                        <h2 className="mt-4 font-bold text-center">No reports</h2>
                    </div>
                )}
            </div>
        )
    }
    return (
        <div>
            {reports.length > 0 ? (
                <div className="w-[500px] mx-auto ">
                    <ul className="w-500 bg-gray-100 py-4 px-4 shadow-lg rounded-md">
                        {reports.length > 0 && reports.map(report => (
                            <li key={report.fileName} className="flex items-center justify-between bg-green-300 mb-2 py-4 px-4 text-sm">
                                <a className="text-white">
                                    {report.fileName}
                                </a>
                                <a href={report?.fileLocation}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : showMessage()
            }

        </div>

    )
}

export default Reports