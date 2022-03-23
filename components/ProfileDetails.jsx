import { motion } from 'framer-motion';
import React from 'react';
import UpdateDonationDate from './UpdateDonationDate';

function ProfileDetails({ donar }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 1,
                },
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 1,
                },
            }}
            className="w-[97%] space-y-3 sm:w-[80%] capitalize md:w-[50%] mx-auto p-5 shadow-xl mt-10"
        >
            <div>
                <div className="text-sm text-slate-400">Name</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">{donar.name}</div>
            </div>
            <div>
                <div className="text-sm text-slate-400 mb-1">Blood Group</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">
                    <span className="px-1 uppercase py-1 rounded text-white bg-pink-700">
                        {donar?.group}
                    </span>
                </div>
            </div>
            <div>
                <div className="text-sm text-slate-400">Phone Number</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">{donar.phone}</div>
            </div>

            <div>
                <div className="text-sm text-slate-400">Address</div>
                <div className="text-normal text-slate-700 tracking-wide space-x-2">
                    <span>District - {donar?.district}</span>

                    <span>Upazila - {donar?.upazila}</span>

                    <span>address - {donar?.address}</span>
                </div>
            </div>

            <div>
                <div className="text-sm text-slate-400">Last time of blood donation</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">{donar?.lat}</div>
            </div>

            <UpdateDonationDate />
        </motion.div>
    );
}

export default ProfileDetails;
