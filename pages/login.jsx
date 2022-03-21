import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { donarLogin } from '../store/donar';

const loginReq = (info) => {
    return axios.post('/api/login', info, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const login = () => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState({ phone: '', password: '' });
    const { mutate, data, isError, error, status } = useMutation(loginReq);

    const { token } = useSelector((state) => state.donar);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // e.target.reset();
        mutate(info);
    };

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isError) {
            toast.error(error?.response?.data?.message);
        }

        if (status === 'success') {
            dispatch(donarLogin(data?.data));
            if (token) {
                toast.success('Login Successfully Completed!');

                router.push('/');
            }
        }
    }, [isError, status, token]);

    return (
        <div>
            <form className="w-[80%] md:w-[50%] py-10 mx-auto space-y-2" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        className="w-full rounded px-4 py-2"
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="valid phone number ..."
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full rounded px-4 py-2"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter valid password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="w-full active:scale-105 bg-pink-700 font-bold text-white rounded py-2 px-4"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default login;
