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

function DeleteAccount({ id }) {
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
        <motion.button
            whileTap={{
                scale: 0.95,
            }}
            type="button"
            className="py-2 px-4 rounded bg-rose-800 text-white font-bold w-full my-5"
            onClick={handleDelete}
        >
            Delete Account Permanently!
        </motion.button>
    );
}

export default DeleteAccount;
