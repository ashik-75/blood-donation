// import moment from 'moment';
import React from 'react';

function Single({ input }) {
    return <div className="bg-sky-600 p-5">{input.label}</div>;
}

function Racket({ data }) {
    return (
        <div className="grid grid-cols-3 gap-5">
            {data.map((dt) => (
                <Single input={dt} />
            ))}
        </div>
    );
}

export default Racket;
