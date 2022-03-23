import React from 'react';
import DatePicker from 'react-datepicker';

function DateInput({ data: { info, setInfo, label, id } }) {
    return (
        <div>
            <label className="block mb-2" htmlFor="dob">
                {label}
            </label>
            <DatePicker
                placeholderText="DD - MM - YYYY"
                dateFormat="dd-MM-yyyy"
                className="w-full rounded cursor-pointer"
                selected={info[id]}
                onChange={(date) => {
                    setInfo({ ...info, [id]: date });
                }}
                required
            />
        </div>
    );
}

export default DateInput;
