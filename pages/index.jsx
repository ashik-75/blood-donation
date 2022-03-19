/* eslint-disable no-nested-ternary */

import { useMutation } from 'react-query';
import DataTable from '../components/DataTable';
import Search, { searchDonar } from '../components/Search';

const index = () => {
    const { mutate, isError, error, data, isLoading } = useMutation(searchDonar);

    return (
        <div>
            <Search mutate={mutate} />

            <div className="mt-10">
                <div className="p-5 text-center font-bold text-gray-500 tracking-wide text-2xl">
                    {isLoading ? (
                        <span>Loading....</span>
                    ) : isError ? (
                        <span>{error.response?.data?.message}</span>
                    ) : null}
                </div>

                {data?.data.length > 0 && <DataTable allData={data?.data} />}
            </div>
        </div>
    );
};

export default index;
