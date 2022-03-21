import moment from 'moment';
import React from 'react';

function Racket() {
    const date = moment('2022-02-21').format('YYYY-DD-MM');
    return (
        <div>
            <div>hey baby you can play racket</div>
            <div>momemt check</div>
            <div>{date}</div>
        </div>
    );
}

export default Racket;
