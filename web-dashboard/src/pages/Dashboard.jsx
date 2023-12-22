import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navigation from "../components/Navigation"


const Dashboard = () => {
    return (
        <div>
            <Navigation />
            <div className='flex'>
                <div className="h-screen">
                    <Sidebar />
                </div>
                <div className="bg-gray-100 w-full">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Dashboard