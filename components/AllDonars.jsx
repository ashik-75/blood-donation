import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const allDonars = () => {
    return axios.get('/api/alldonars');
};
function AllDonars() {
    const { mutate, data } = useMutation(allDonars);
    const handleAllDonars = () => {
        mutate();
    };
    return (
        <div>
            <button onClick={handleAllDonars} type="button">
                See All Donars
            </button>

            {JSON.stringify(data?.data)}
        </div>
    );
}

export default AllDonars;
