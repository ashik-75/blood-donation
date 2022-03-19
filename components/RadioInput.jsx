import React from 'react';

function RadioInput({ data: { type, id, name, label, handleValue } }) {
    return (
        <span>
            <input required type={type} id={id} name={name} value={id} onChange={handleValue} />
            <label className="ml-2" htmlFor={id}>
                {label}
            </label>
        </span>
    );
}

export default RadioInput;
