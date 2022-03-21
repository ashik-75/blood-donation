import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { donarLogin } from '../store/donar';
import formatDate from '../utils/formatDate';

const updateDate = ({ date, token }) => {
    return axios.post('/api/donar/update', date, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

function UpdateDonationDate() {
    const [date, setDate] = useState('');
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.donar);
    const { mutate, isError, error, status, data } = useMutation(updateDate);

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = formatDate(date);

        mutate({ date: val, token });
    };

    useEffect(() => {
        if (status === 'success') {
            queryClient.invalidateQueries('allDonars');
            setDate('');
            dispatch(donarLogin({ donar: data?.data, token }));
        }

        if (isError) {
            toast.error(error?.response?.data?.message);
        }
    }, [status, isError, error]);
    return (
        <div className="my-1">
            <form className="space-y-2" onSubmit={handleSubmit}>
                <label htmlFor="date" className="text-slate-400 tracking-wide text-sm">
                    Update Date
                </label>
                <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={date}
                    onChange={(dt) => setDate(dt)}
                    placeholderText="DD-MM-YYYY"
                    className=" cursor-pointer tracking-widest text-slate-600 py-2 px-4 rounded w-full border border-slate-300"
                />
                <button
                    type="submit"
                    disabled={!date}
                    className="text-sm disabled:bg-slate-600 disabled:cursor-not-allowed py-2 px-2 tracking-wider font-bold rounded text-white bg-sky-700"
                >
                    Update Blood Donation Date
                </button>
            </form>
        </div>
    );
}

export default UpdateDonationDate;
