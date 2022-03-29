import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { donarLogout } from '../store/donar';

const deleteDonar = ({ id, token }) => {
    return axios.delete(`/api/donar/delete/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

function DeleteAccount({ id, setShow }) {
    const { mutate, isError, error, isSuccess, data } = useMutation(deleteDonar);
    const token = useSelector((state) => state.donar.token);
    const dispatch = useDispatch();
    const handleDelete = () => {
        mutate({ id, token });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.data?.message);
            dispatch(donarLogout());
        }
        if (isError) {
            toast.error(error?.response?.data?.message);
        }
    }, [isError, isSuccess]);
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
            className="fixed flex justify-center items-center w-[100vw] h-[100vh] bg-slate-700/20 z-20 top-0  left-0 bottom-0"
        >
            <div className="w-[90%] md:w-[40%] space-y-2 relative h-[50%] bg-white rounded p-5 flex flex-col items-center justify-center">
                <button
                    onClick={() => setShow(false)}
                    type="button"
                    className="text-gray-400 absolute right-4 top-3 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="popup-modal"
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div>
                    <button type="button">
                        <svg
                            className="mx-auto w-14 h-14 text-gray-400 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>

                <div className="text-xl md:text-2xl text-slate-500 text-center font-bold tracking-wide">
                    Are you sure, you want to delete account?
                </div>
                <div className="space-x-3">
                    <button
                        onClick={() => {
                            handleDelete();
                            setShow(false);
                        }}
                        type="button"
                        className="py-2 px-4 rounded bg-red-600 hover:bg-red-800  text-white"
                    >
                        Yes, i'm Sure
                    </button>
                    <button
                        onClick={() => setShow(false)}
                        type="button"
                        className="py-2 px-4 rounded border  "
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default DeleteAccount;
