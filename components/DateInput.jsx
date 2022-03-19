import React from 'react';
import DatePicker from 'react-datepicker';

function DateInput({ data: { info, setInfo, label, id } }) {
    return (
        <div>
            <label className="block mb-2" htmlFor="dob">
                {label}
            </label>
            <DatePicker
                className="w-full rounded"
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
