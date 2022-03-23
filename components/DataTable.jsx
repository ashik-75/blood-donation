/* eslint-disable no-underscore-dangle */
import { motion } from 'framer-motion';
import React from 'react';

function DataTable({ allData }) {
    const totalAnimation = {
        parent: {
            initial: {
                // opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                },
            },
        },
        child: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
            },
        },
    };
    return (
        <div>
            <div className="p-5 overflow-auto hidden md:block">
                <table className="w-full rounded shadow-lg">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className=" p-3 text-left text-sm -tracking-wide font-semibold">
                                Name
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                District
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Upazila
                            </th>
                            <th className="p-3  text-left text-sm -tracking-wide font-semibold">
                                Address
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Phone
                            </th>
                            <th className="p-3 text-left text-sm -tracking-wide font-semibold">
                                Group
                            </th>
                            <th className="w-32 p-3 text-left text-sm -tracking-wide font-semibold">
                                Last Time Blood Donation
                            </th>
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={totalAnimation.parent}
                        animate="animate"
                        initial="initial"
                        className="divide-y-2 divide-gray-100 capitalize"
                    >
                        {allData.length > 0 &&
                            allData.map((dt, ind) => (
                                <motion.tr
                                    variants={totalAnimation.child}
                                    key={Math.random()}
                                    className={ind % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.name}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.district}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.upazila}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.address?.length > 25
                                            ? `${dt.address?.slice(0, 25)}...`
                                            : dt?.address}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.hide ? (
                                            <span className="p-1 rounded text-white bg-pink-700">
                                                Phone Hide
                                            </span>
                                        ) : (
                                            dt.phone
                                        )}
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        <span className="py-1 px-2 bg-rose-600 rounded uppercase font-bold text-white">
                                            {dt?.group}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap tracking-wide text-sm text-gray-700 text-left">
                                        {dt?.lat}
                                    </td>
                                </motion.tr>
                            ))}
                    </motion.tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 p-5 md:hidden gap-5 ">
                {allData.map((dt) => (
                    <div key={dt?._id} className="p-5 shadow-lg mt-10 capitalize">
                        <div className="my-3">
                            <div className="text-sm text-slate-400">Name</div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt?.name}
                            </div>
                        </div>

                        <div className="my-3">
                            <div className="text-sm text-slate-400 mb-1">Blood Group</div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                <span className="px-1 uppercase py-1 rounded text-white bg-pink-700">
                                    {dt?.group}
                                </span>
                            </div>
                        </div>
                        <div className="my-3">
                            <div className="text-sm text-slate-400 mb-1">Phone Number</div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt?.hide ? (
                                    <span className="p-1 rounded text-white bg-pink-700">
                                        Phone Hide
                                    </span>
                                ) : (
                                    dt?.phone
                                )}
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
                            <div className="text-sm text-slate-400">
                                Last time of blood donation
                            </div>
                            <div className="text-lg text-slate-700 tracking-wide font-bold">
                                {dt?.lat}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataTable;
