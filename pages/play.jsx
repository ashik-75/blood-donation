import axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import Racket from '../components/Racket';

const play = ({ data }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 0,
                x: -200,
            }}
            animate={{
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                    duration: 1,
                },
            }}
            exit={{
                opacity: 0,
                y: -100,
                x: 0,
            }}
        >
            {data.length > 0 && <Racket data={data} />}
        </motion.div>
    );
};

export default play;

export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/playapi');

    return {
        props: {
            data: response?.data,
        },
    };
}
