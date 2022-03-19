/* eslint-disable import/extensions */
import React from 'react';
import Select from 'react-select';
// eslint-disable-next-line import/no-unresolved
// import '../styles/dropdown.css';

function SelectInput({ data: { payload, setInfo, info, label, id, setDistrictValue } }) {
    return (
        <div>
            <label className="block mb-2" htmlFor="bloodGroup">
                {label}
            </label>
            <div className="relative">
                <Select
                    className="relative border-[1px] border-slate-500 rounded"
                    id={id}
                    instanceId={id}
                    options={payload}
                    onChange={(e) => {
                        setInfo({ ...info, [id]: e.value });
                        if (setDistrictValue) {
                            setDistrictValue(e);
                        }
                    }}
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
