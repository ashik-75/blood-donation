import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import district from '../data/district';
import group from '../data/group';
import upazila from '../data/upazila';

export const searchDonar = (info) => {
    return axios.post('/api/donars', info, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

function Search({ mutate }) {
    const [currentDistrict, setCurrentDistrict] = useState(null);
    const [info, setInfo] = useState({ group: '', district: '', upazila: '' });
    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(info);
    };

    const filteredUpazila = () => {
        return upazila.filter((dt) => dt.district_id === currentDistrict?.id);
    };

    return (
        <div className="min-h-[50vh] flex justify-center flex-col items-center">
            <div className="text-center text-2xl font-bold uppercase tracking-wider text-slate-500 my-5">
                Search Blood{' '}
            </div>

            <form className="w-[80%] md:w-[50%] mx-auto space-y-2" onSubmit={handleSubmit}>
                <div className="relative">
                    <Select
                        id="group"
                        placeholder="Enter District"
                        instanceId="group"
                        options={district}
                        onChange={(e) => {
                            setInfo({ ...info, district: e.value });
                            setCurrentDistrict(e);
                        }}
                    />
                    <input
                        type="text"
                        className="w-full opacity-0 -z-50 h-full absolute top-0 left-0"
                        required
                        value={info.district}
                        onChange={(e) => setInfo({ ...info, district: e.value })}
                    />
                </div>

                <div className="relative">
                    <Select
                        id="group"
                        placeholder="Enter District"
                        instanceId="group"
                        options={filteredUpazila()}
                        onChange={(e) => setInfo({ ...info, upazila: e.value })}
                    />
                    <input
                        type="text"
                        className="w-full opacity-0 -z-50 h-full absolute top-0 left-0"
                        required
                        value={info.upazila}
                        onChange={(e) => setInfo({ ...info, upazila: e.value })}
                    />
                </div>

                <div className="relative">
                    <Select
                        id="group"
                        instanceId="group"
                        className=""
                        options={group}
                        placeholder="Enter Blood Group"
                        onChange={(e) => setInfo({ ...info, group: e.value })}
                    />
                    <input
                        type="text"
                        className="w-full opacity-0 -z-50 h-full absolute top-0 left-0"
                        required
                        value={info.group}
                        onChange={(e) => setInfo({ ...info, group: e.value })}
                    />
                </div>

                <button
                    className="bg-cyan-700 text-lg tracking-wider uppercase font-bold text-white rounded py-2 px-4 w-full"
                    type="submit"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;
