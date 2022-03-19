import React from 'react';

function InputField({ data: { type, name, id, placeholder, handleValue, label } }) {
    return (
        <div>
            <label
                className="block mb-2 after:content-['*'] after:ml-1 after:text-rose-800"
                htmlFor="name"
            >
                {label}
            </label>
            <input
                className="w-full rounded px-4 py-2 "
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={handleValue}
                required
            />
        </div>
    );
}

export default InputField;
