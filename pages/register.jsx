/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DateInput from '../components/DateInput';
import InputField from '../components/InputField';
import RadioInput from '../components/RadioInput';
import SelectInput from '../components/SelectInput';
import district from '../data/district';
import group from '../data/group';
import upazila from '../data/upazila';
import { donarLogin } from '../store/donar';
import formatDate from '../utils/formatDate';

const addDonar = (info) => {
    return axios.post('/api/registerdonar', info, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const validatePhone = (phone) => {
    const modifiedNumber = phone.replace(/[^0-9]/g, '');

    if (!(modifiedNumber.length === 11)) {
        return false;
    }
    return true;
};

const register = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [districtValue, setDistrictValue] = useState({});
    const { token } = useSelector((state) => state.donar);
    const [isHidePhone, setIsHidePhone] = useState(false);

    const [info, setInfo] = useState({
        name: '',
        district: '',
        upazila: '',
        phone: '',
        gender: '',
        address: '',
        lat: '',
        group: '',
        password: '',
        confirmPassword: '',
        hide: false,
    });

    const { data, status, mutate, isError, error } = useMutation(addDonar);

    const handleValue = (e) => {
        if (e.target.name === 'gender' && e.target.value === 'female') {
            setIsHidePhone(true);
        }
        if (e.target.name === 'gender' && e.target.value === 'male') {
            setIsHidePhone(false);
        }

        if (e.target.name === 'hide') {
            setInfo({ ...info, [e.target.name]: e.target.checked });
        } else if (e.target.value === 'male') {
            setInfo({ ...info, [e.target.name]: e.target.value, hide: false });
        } else {
            setInfo({ ...info, [e.target.name]: e.target.value });
        }
    };

    const filteredUpazila = () => {
        return upazila.filter((dt) => dt.district_id === districtValue.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (info.phone && !validatePhone(info.phone)) {
            toast.error('Invalid Phone Number');
        } else if (info.password !== info.confirmPassword) {
            toast.error('Password Not Match');
        } else {
            mutate({ ...info, lat: formatDate(info.lat) });
        }
    };

    useEffect(() => {
        if (token) {
            router.push('/');
        }
        if (status === 'success') {
            toast.success('Registration Successfull');
            dispatch(donarLogin(data?.data));
            router.push('/');
        }

        if (isError) {
            toast.error(error?.response?.data?.message);
        }
    }, [status, isError]);

    return (
        <div>
            <form className="w-[80%] md:w-[50%] py-10 mx-auto space-y-2" onSubmit={handleSubmit}>
                <InputField
                    data={{
                        handleValue,
                        name: 'name',
                        id: 'name',
                        placeholder: 'Enter Name',
                        type: 'text',
                        label: 'Name',
                    }}
                />
                <SelectInput
                    data={{
                        payload: district,
                        info,
                        setInfo,
                        label: 'District',
                        id: 'district',
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
                <InputField
                    data={{
                        handleValue,
                        name: 'address',
                        id: 'address',
                        placeholder: 'Address',
                        type: 'text',
                        label: 'Address',
                    }}
                />

                <InputField
                    data={{
                        handleValue,
                        name: 'phone',
                        id: 'phone',
                        placeholder: 'Valid phone number..',
                        type: 'text',
                        label: 'Phone Number',
                    }}
                />
                <div>
                    <div>Gender</div>
                    <div className="space-x-3">
                        <RadioInput
                            data={{
                                type: 'radio',
                                label: 'Male',
                                id: 'male',
                                name: 'gender',
                                handleValue,
                            }}
                        />
                        <RadioInput
                            data={{
                                type: 'radio',
                                label: 'Female',
                                id: 'female',
                                name: 'gender',
                                handleValue,
                            }}
                        />
                    </div>
                </div>
                {isHidePhone && (
                    <div>
                        <input
                            id="femaleCheck"
                            type="checkbox"
                            checked={info.hide}
                            name="hide"
                            onChange={handleValue}
                            className="mr-2 rounded checked:outline-none focus:ring-0 appearance-none form-checkbox focus:outline-none indeterminate:bg-red-300"
                        />
                        <label className="text-slate-600 tracking-wide " htmlFor="femaleCheck">
                            Hide Phone
                        </label>
                    </div>
                )}

                <DateInput
                    data={{
                        label: 'Date of Last Blood Donation',
                        info,
                        setInfo,
                        id: 'lat',
                    }}
                />

                <SelectInput
                    data={{ info, setInfo, payload: group, label: 'Blood Group', id: 'group' }}
                />

                <InputField
                    data={{
                        handleValue,
                        name: 'password',
                        id: 'password',
                        placeholder: 'Enter Password',
                        type: 'password',
                        label: 'Password',
                    }}
                />
                <InputField
                    data={{
                        handleValue,
                        name: 'confirmPassword',
                        id: 'confirmPassword',
                        placeholder: 'Confirm Password',
                        type: 'password',
                        label: 'Confirm Password',
                    }}
                />
                <button
                    className="w-full bg-purple-700 font-bold text-white rounded py-2 px-4"
                    type="submit"
                >
                    Registration
                </button>
            </form>
        </div>
    );
};

export default register;
