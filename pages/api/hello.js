import upazila from '../../data/upazila';

const hello = (req, res) => {
    const data = upazila.sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
        return 0;
    });

    res.json(data);
};

export default hello;
