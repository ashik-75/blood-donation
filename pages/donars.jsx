/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import DataTable from '../components/DataTable';

const allDonars = () => {
    return axios.get('/api/alldonars');
};

function Loading() {
    const variants = {
        parent: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.5,
                },
            },
        },

        child: {
            initial: {
                opacity: 0,
            },
            animate: {
                opacity: 1,
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                },
            },
        },
    };
    return (
        <motion.div
            variants={variants.parent}
            animate="animate"
            initial="initial"
            className="space-x-4 flex justify-center items-center h-[50vh]"
        >
            <motion.span variants={variants.child} className="w-4 h-4 rounded-full bg-slate-700" />
            <motion.span variants={variants.child} className="w-4 h-4 rounded-full bg-slate-700" />
            <motion.span variants={variants.child} className="w-4 h-4 rounded-full bg-slate-700" />
        </motion.div>
    );
}
function donars() {
    const { data, isError, error, isLoading } = useQuery('allDonars', allDonars);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div className="p-10 text-center text-lg tracking-wider text-slate-600">
                    {error?.response?.data?.message}
                </div>
            ) : data?.data?.length > 0 ? (
                <DataTable allData={data?.data} />
            ) : (
                <div className="p-10 text-center text-lg tracking-wider text-slate-600">
                    Not Found, Please Check again later!
                </div>
            )}
        </div>
    );
}

export default donars;
