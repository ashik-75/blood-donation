/* eslint-disable import/extensions */
import React from 'react';
import Select from 'react-select';
// eslint-disable-next-line import/no-unresolved
// import '../styles/dropdown.css';

function SelectInput({ data: { payload, setInfo, info, label, id, setDistrictValue } }) {
    const style = {
        control: (base) => ({
            ...base,
            border: '1px solid #3d3c3a',
            // This line disable the blue border
            boxShadow: 'none',
        }),
    };
    return (
        <div>
            <label
                className="block mb-2 after:content-['*'] after:ml-1 after:text-rose-800"
                htmlFor="bloodGroup"
            >
                {label}
            </label>
            <div className="relative">
                <Select
                    className="relative  rounded"
                    id={id}
                    instanceId={id}
                    options={payload}
                    onChange={(e) => {
                        setInfo({ ...info, [id]: e.value });
                        if (setDistrictValue) {
                            setDistrictValue(e);
                        }
                    }}
                    styles={style}
                />
                <input
                    className="absolute top-0 left-0 w-[100%] h-[100%] -z-50 opacity-0"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={info[id]}
                    onChange={(e) => setInfo({ ...info, [id]: e.target.value })}
                    required
                />
            </div>
        </div>
    );
}

export default SelectInput;
