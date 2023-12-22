import React from 'react'

const RenderReports = ({ reports }) => {
    console.log(reports);
    const renderData = () => {
        reports !== null && reports.map(rep => (
            <tr key={resizeBy._id}>
                <th>{rep._id}</th>
            </tr>
        ))
    }
    return (
        <div className='card'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Reports</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RenderReports