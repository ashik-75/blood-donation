import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import district from '../data/district';
import group from '../data/group';
import upazila from '../data/upazila';
import SelectInput from './SelectInput';

export const searchDonar = (info) => {
    return axios.post('/api/donars', info, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function Search({ mutate }) {
    const [currentDistrict, setDistrictValue] = useState(null);
    const [info, setInfo] = useState({ group: '', district: '', upazila: '' });
    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(info);
    };

    const filteredUpazila = () => {
        return upazila.filter((dt) => dt.district_id === currentDistrict?.id);
    };

    return (
        <div className="flex justify-center flex-col items-center">
            <div className="text-center text-2xl font-bold uppercase tracking-wider text-slate-500 mt-10">
                Search Blood
            </div>
            <div className="text-center mb-5">
                <img className="w-32" src="/blod.png" alt="" />
            </div>

            <form className="w-[80%] md:w-[40%] mx-auto space-y-2" onSubmit={handleSubmit}>
                <SelectInput
                    data={{
                        payload: district,
                        info,
                        setInfo,
                        id: 'district',
                        label: 'District',
                        setDistrictValue,
                    }}
                />
                <SelectInput
                    data={{
                        payload: filteredUpazila(),
                        info,
                        setInfo,
                        label: 'Upazila',
                        id: 'upazila',
                    }}
                />

                <SelectInput
                    data={{ info, setInfo, payload: group, label: 'Blood Group', id: 'group' }}
                />

                <motion.button
                    whileTap={{
                        scale: 0.95,
                    }}
                    className="bg-rose-600   tracking-wider uppercase font-bold text-white rounded py-2 px-4 w-full"
                    type="submit"
                >
                    Search
                </motion.button>
            </form>
        </div>
    );
}

export default Search;
