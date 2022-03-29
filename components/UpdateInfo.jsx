/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import district from '../data/district';
import group from '../data/group';
import upazila from '../data/upazila';
import { donarLogin } from '../store/donar';
import DeleteAccount from './DeleteAccount';
import InputField from './InputField';
import SelectInput from './SelectInput';

const updateDonarInfo = ({ info, token }) => {
    return axios.put('/api/donar/updateInfo', info, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

function UpdateInfo({ donar }) {
    const [show, setShow] = useState(false);
    const [info, setInfo] = useState({});
    const [districtValue, setDistrictValue] = useState({});

    const token = useSelector((state) => state.donar.token);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate, isError, error, data, isSuccess } = useMutation(updateDonarInfo);

    const handleValue = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setInfo(donar);
    }, []);

    useEffect(() => {
        // console.log({ response: data?.data });
        if (isError) {
            toast.error(error.message);
        }

        if (isSuccess) {
            router.push('?info=profile');
            toast.success('Update Done!');
            // console.log({ response: data?.data });
            dispatch(donarLogin(data?.data));
            queryClient.invalidateQueries('allDonars');
        }
    }, [isSuccess]);

    const filteredUpazila = () => {
        return upazila.filter((dt) => dt.district_id === districtValue.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ info, token });
    };

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
        >
            <div className="w-[97%]  sm:w-[80%] md:w-[50%] mx-auto p-5 shadow-xl mt-5">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <InputField
                        data={{
                            handleValue,
                            name: 'name',
                            id: 'name',
                            placeholder: 'Enter Name',
                            type: 'text',
                            label: 'Name',
                            value: info?.name,
                        }}
                    />
                    <InputField
                        data={{
                            handleValue,
                            name: 'phone',
                            id: 'phone',
                            placeholder: 'Enter Phone Number',
                            type: 'text',
                            label: 'Phone',
                            value: info?.phone,
                        }}
                    />
                    <InputField
                        data={{
                            handleValue,
                            name: 'address',
                            id: 'address',
                            placeholder: 'Enter Address',
                            type: 'text',
                            label: 'Address',
                            value: info?.address,
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

                    <SelectInput
                        data={{ info, setInfo, payload: group, label: 'Blood Group', id: 'group' }}
                    />

                    <motion.button
                        whileTap={{
                            scale: 0.95,
                        }}
                        type="submit"
                        className="w-full active:scale-105 py-2 px-4 rounded bg-teal-700 text-white font-bold"
                    >
                        Update Info
                    </motion.button>
                </form>

                <AnimatePresence>
                    {!show && (
                        <motion.button
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
                            onClick={() => setShow(true)}
                            className="bg-rose-600 w-full mt-5 py-2 px-4 rounded text-white"
                            type="button"
                        >
                            Delete Account
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {show && <DeleteAccount setShow={setShow} id={donar?._id} />}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default UpdateInfo;
