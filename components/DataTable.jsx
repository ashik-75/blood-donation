import React from 'react';

function DataTable({ allData }) {
    return (
        <div>
            <div className="p-5 overflow-auto hidden md:block">
                <table className="w-full rounded shadow-lg">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Name
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                District
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Upazila
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Address
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Phone
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Group
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                lat
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-100">
                        {allData.length > 0 &&
                            allData.map((dt, ind) => (
                                <tr
                                    key={Math.random()}
                                    className={ind % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt.name}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt.district}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt.upazila}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt.address}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt.phone}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        <span className="py-1 px-2 bg-rose-600 rounded uppercase font-bold text-white">
                                            {dt.group}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.lat?.split('T')[0]}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 p-5 md:hidden gap-5 ">
                {allData.map((dt) => (
                    <div key={dt._id} className="p-5 shadow-lg mt-10">
                        <div className="my-3">
                            <div className="text-sm text-slate-400">Name</div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt.name}
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="text-sm text-slate-400">Phone Number</div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt.phone}
                            </div>
                        </div>

                        <div className="my-3">
                            <div className="text-sm text-slate-400">Address</div>
                            <div className="text-normal text-slate-700 tracking-wide space-x-2">
                                <span>District - {dt?.district}</span>,
                                <span>Upazila - {dt?.upazila}</span>,
                                <span>address - {dt?.address}</span>
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="text-sm text-slate-400">Date Of Birth</div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt?.dob?.split('T')[0]}
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="text-sm text-slate-400">
                                Last time of blood donation
                            </div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt.lat && dt?.lat.split('T')[0]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataTable;
