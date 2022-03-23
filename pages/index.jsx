/* eslint-disable no-nested-ternary */

import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import DataTable from '../components/DataTable';
import Search, { searchDonar } from '../components/Search';

const index = () => {
    const { mutate, isError, error, data, isLoading } = useMutation(searchDonar);

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
            }}
        >
            <Search mutate={mutate} />

            <div>
                <div className="p-5 text-center font-bold text-gray-500 tracking-wide text-2xl">
                    {isLoading ? (
                        <span>Loading....</span>
                    ) : isError ? (
                        <span>{error.response?.data?.message}</span>
                    ) : null}
                </div>

                {data?.data.length > 0 && <DataTable allData={data?.data} />}
            </div>
        </motion.div>
    );
};

export default index;
