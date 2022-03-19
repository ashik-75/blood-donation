import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

function Profiledetails({ donar }) {
    return (
        <div className="w-[90%] sm:w-[75%] md:w-[50%] mx-auto p-5 shadow-lg mt-10">
            <div className="my-3">
                <div className="text-sm text-slate-400">Name</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">{donar.name}</div>
            </div>
            <div className="my-3">
                <div className="text-sm text-slate-400">Phone Number</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">{donar.phone}</div>
            </div>

            <div className="my-3">
                <div className="text-sm text-slate-400">Address</div>
                <div className="text-normal text-slate-700 tracking-wide space-x-2">
                    <span>District - {donar?.district}</span>,
                    <span>Upazila - {donar?.upazila}</span>,<span>address - {donar?.address}</span>
                </div>
            </div>

            <div className="my-3">
                <div className="text-sm text-slate-400">Last time of blood donation</div>
                <div className="text-lg text-slate-700 tracking-wide font-bold">
                    {donar?.lat?.split('T')[0]}
                </div>
            </div>
        </div>
    );
}

const profile = () => {
    const { donar, token } = useSelector((state) => state.donar);
    return (
        <div className="p-5">
            <div>{token && <Profiledetails donar={donar} />}</div>
            <div className="font-bold text-slate-500 text-center mt-10 text-xl">
                {!token && (
                    <div>
                        You Need to Logged In
                        <Link href="/login">
                            <span className="ml-2 underline cursor-pointer">Login</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default profile;
